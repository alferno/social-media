import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

import Head from '../Head'
import { useForm } from '../../utils/Hooks'
import { AuthContext } from '../../context/Auth'

const Register = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
  })

  function registerUser() {
    addUser()
  }

  return (
    <div className='form-container'>
      <Head title='Register' user='' />
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username...'
          type='text'
          name='username'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label='Password'
          placeholder='Password...'
          type='password'
          name='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password...'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label='Email'
          placeholder='Email...'
          name='email'
          type='email'
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Register
