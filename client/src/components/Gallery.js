import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getPhotos();
    setInterval(this.getPhotos, 1000);
    setTimeout(() => this.setState({ loading: false }), 1500);
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


  render() {
    const isEmpty = this.state.gallery.length === 0;
    const isLoading = this.state.loading;
    return (
      <div>
        <h1>Your gallery</h1>
        <div className="gallery">
          {(isEmpty && !isLoading) && (
            <h5>You have no images saved yet.</h5>
          )
          }
          {(isLoading && isEmpty) && (
            <h5>Loading...</h5>
          )}
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
