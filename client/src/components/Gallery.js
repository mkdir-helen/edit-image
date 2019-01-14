import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: []
    }
  }

  componentDidMount() {
    this.getPhotos();
    setInterval(this.getPhotos, 2000);
  }
  getPhotos = () => {
    if (this.props.active) {
      fetch(`/gallery`)
        .then(r => r.json())
        .then(resultArray => {
          console.log(resultArray);
          this.setState({
            gallery: resultArray
          })
        })
        .catch(err => {
          console.log(err);
        })

    }
  }


  handleGetPhoto = (e) => {

  }

  render() {
    return (
      <div>
        <h1>Your gallery</h1>
        <div className="gallery">
          {this.state.gallery.map(data => {
            return (
              <div className="image" key={data.id} onClick={this.handleGetPhoto}>
                <Link to={`/photo/${data.id}`}>
                  <img src={data.url} />
                </Link>
              </div>

            )
          })}
        </div>
      </div>
    )
  }
}
