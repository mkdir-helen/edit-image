import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', 
            image: null,
            allfiles: [],
            recentfile: [],
            recenturl: '',
            recentname: '',
            crop: {
              aspect: 1/1
            }
        }
    }

    // componentDidMount(){
    //   fetch(`/`)
    //     .then(r => r.json())
    //     .then(resultArray => {
    //       console.log(resultArray);
    //       this.setState({
    //         gallery: resultArray
    //       })
    //     })
    // }

   onSubmit = (e) => {
     e.preventDefault();
     const formdata= new FormData();
     formdata.append('image', this.state.image);
     formdata.append('title', this.state.title);
    fetch(`/upload`, {
      method: 'POST',
      body: formdata
    })
    .then(r => r.json())
    .then(result => {
      this.setState({
        allfiles: [result],
        recentfile: [result[result.length-1]],
        recenturl: result[result.length-1].url,
        recentname: result[result.length-1].name
      })
    });
  }

  getImage = (e) => {
    // console.log(e.target.files[0]);
    this.setState({
      image: e.target.files[0]
    })
  }

  getTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleImageLoaded = (image) => {
    console.log(image);
  }

  handleOnCropChange = (crop) => {
    console.log(crop);
    this.setState({crop});
    console.log(this.state);
  }
  handleOnCropComplete = (crop, pixelCrop) => {
    console.log(crop, pixelCrop);
  }

  render() {
    return (
      <div>
          <h1>Home sweet home</h1>  
          <form action="/upload" method="post" encType="multipart/form-data" onSubmit={(e) => this.onSubmit(e)}>
              <div> 
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" onChange={(e) => this.getTitle(e)} /> 
              </div>
              <div>
                  <label htmlFor="image">Image</label>
                  <input type="file" name="image" id="image" onChange={(e) => this.getImage(e)} />
              </div>
              <button type="submit">Upload Image</button>
          </form>
          <div>
            {/* <img src={this.state.recenturl} /> */}
          <ReactCrop 
          src={this.state.recenturl}
          crop={this.state.crop}
          onImageLoaded={this.handleImageLoaded}
          onComplete = {this.handleOnCropComplete} 
          onChange={this.handleOnCropChange} />
          </div>
      </div>
    )
  }
}
