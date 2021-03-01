import React from 'react'
import './NotFound.css';

function NotFound() {
  return (
    <div className="notFound__root">
      <h1> Error 404! Sorry page {window.location.pathname} not found! </h1>
      <br />
      <br />
      <h1> (╯°□°）╯︵ ┻━┻ </h1>
    </div>
  )
}

export default NotFound
