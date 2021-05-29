import { useMutation } from '@apollo/client'
import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/Hooks'

import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql'

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  })

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })

      let newData = [...data.getPosts]
      newData = [result.data.createPost, ...newData]
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      })
      values.body = ''
    },
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder='Whats on your mind'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

export default PostForm