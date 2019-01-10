import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.imagePreviewCanvasRef = React.createRef();
        this.cloudinaryImageRef = React.createRef();
        this.state = {
            title: '', 
            image: null,
            allfiles: [],
            recentfile: [],
            recenturl: '',
            recentname: '',
            public_id: '',
            CloudBase64: '',
            crop: {
              width: 30,
              height: 10
            },
            imgSrc: '',
            willEdit: false
        }
    }



   onSubmit = (e) => {
     e.preventDefault();
    //  debugger;
    
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
        recentname: result[result.length-1].name,
        public_id: this.getPublicId(result[result.length-1].url)
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

  handleEdit = (e) => {
    e.preventDefault();
    this.props.history.push('/edit');
  }
  handleEditButton = (e) => {
    this.setState({willEdit: true});
  }
  

  getPublicId = (url) => {
    let arr = url.split('/');
    // console.log(arr);
    let foldername = arr[arr.length-2];
    // console.log(foldername);
    let filename = arr[arr.length-1];
    // console.log(filename);

    let public_id_ext = foldername + '/' + filename;
    // console.log(public_id_ext);
    let public_id = public_id_ext.substring(0, public_id_ext.length-4);
    // console.log(public_id);
    return public_id;
  }
  
  render() {
   
    return (
      <div>
          <h1>Home sweet home</h1>  
          <h3>Upload an image to start editing!</h3>
          <form action="/upload" method="post" encType="multipart/form-data" onSubmit={(e) => this.onSubmit(e)}>
              <div> 
                  <label htmlFor="title">Name of Image</label>
                  <input type="text" name="title" id="title" onChange={(e) => this.getTitle(e)} /> 
              </div>
              <div>
                  <label htmlFor="image"></label>
                  <input type="file" name="image" id="image" onChange={(e) => this.getImage(e)} />
              </div>
              <button type="submit">Upload Image</button>
          </form>
          { this.state.willEdit &&
              <button onClick={this.handleEdit}>Edit Image</button>
          }
          <div >
            <img src={this.state.recenturl}
            className="homeimage"
            onLoad={this.handleEditButton}
            />
          </div>
          

      </div>
    )
  }
}
