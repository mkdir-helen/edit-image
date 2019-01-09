import React, { Component } from 'react'

export default class Photo extends Component {
  render() {
    return (
      <div>
        <img src="" alt=""/>
        <div className="buttons">
            <button>Edit</button>
            <button>Download</button>
            <button>Delete</button>
        </div>
      </div>
    )
  }
}
