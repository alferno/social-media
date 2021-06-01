import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../PostCard'
import { AuthContext } from '../../context/Auth'
import PostForm from '../PostForm'
import { FETCH_POSTS_QUERY } from '../../utils/graphql'

import Head from '../Head'

const Home = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY)

  const { user } = useContext(AuthContext)

  const handleWindowResize = useCallback((event) => {
    setWindowSize(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  return (
    <>
      <Head title='Home' user={user} />
      <Grid columns={windowSize < 580 ? (windowSize > 400 ? 2 : 1) : 3}>
        <Grid.Row className='page-title'>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>loading posts...</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  )
}

export default Home
