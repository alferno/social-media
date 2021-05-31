import React from 'react'
import { Helmet } from 'react-helmet'

const Head = ({ title, user }) => {
  if (user) {
    const name = user.username.charAt(0).toUpperCase() + user.username.slice(1)
    return <Helmet title={`${name} | ${title}`}></Helmet>
  } else {
    return <Helmet title={`${title}`}></Helmet>
  }
}

export default Head
