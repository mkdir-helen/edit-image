import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', 
            image: null
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
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
      // body: JSON.stringify({
      //   title: this.state.title,

      // }),
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
    .then(r => r.json())
    .then(result => {
      console.log(result);
    });
  }

  handleFileRead = (fileReader) => {
    const content = fileReader.result;
    this.setState({
      image: content
    })
    console.log(content);
  }

  getImage = (e) => {
    // console.log(e.target);
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(e.target.files[0].name);
    // const fileReader = new FileReader();
    // fileReader.onloadend = () => {
    //   this.handleFileRead(fileReader);
    // };
    // fileReader.readAsText(e.target.files[0]);
    this.setState({
      image: e.target.files[0]
    })
  }

  getTitle = (e) => {
    this.setState({
      title: e.target.value
    })
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
      </div>
    )
  }
}
