import { Popup } from 'semantic-ui-react'
import React from 'react'

const PopUp = ({ content, children }) => {
  return <Popup inverted content={content} trigger={children} />
}

export default PopUp
