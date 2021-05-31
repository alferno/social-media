import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../PostCard'
import { AuthContext } from '../../context/Auth'
import PostForm from '../PostForm'
import { FETCH_POSTS_QUERY } from '../../utils/graphql'

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY)

  const { user } = useContext(AuthContext)
  const columns =
    window.innerWidth < 580 ? (window.innerWidth > 380 ? 2 : 1) : 3

  console.log(window.innerWidth, columns)
  return (
    <Grid columns={columns}>
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
  )
}

export default Home
