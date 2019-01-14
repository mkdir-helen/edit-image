import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
import uuid from "uuid";


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
      willEdit: false,
      loaded: false,
      loading: false
    }
  }



  onSubmit = (e) => {
    e.preventDefault();
    //  debugger;
    const uuidTitle = this.state.title + uuid.v4();
    console.log(uuidTitle);
    const formdata = new FormData();
    formdata.append('image', this.state.image);
    formdata.append('title', uuidTitle);
    fetch(`/upload`, {
      method: 'POST',
      body: formdata
    })
      .then(r => r.json())
      .then(result => {
        this.setState({
          allfiles: [result],
          recentfile: [result[result.length - 1]],
          recenturl: result[result.length - 1].url,
          recentname: result[result.length - 1].name,
          public_id: this.getPublicId(result[result.length - 1].url),
          loading: true,
          loaded: false
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
    this.setState({
      willEdit: true,
      loading: false,
      loaded: true
    });
  }


  getPublicId = (url) => {
    let arr = url.split('/');
    // console.log(arr);
    let foldername = arr[arr.length - 2];
    // console.log(foldername);
    let filename = arr[arr.length - 1];
    // console.log(filename);

    let public_id_ext = foldername + '/' + filename;
    // console.log(public_id_ext);
    let public_id = public_id_ext.substring(0, public_id_ext.length - 4);
    // console.log(public_id);
    return public_id;
  }

  render() {
    const loaded = this.state.loaded;
    const loading = this.state.loading;
    let loadMessage;
    if (!loaded && loading) {
      loadMessage = <div><br />Loading image...</div>;
    } else if (loaded && !loading) {
      loadMessage = <div></div>;
    }
    return (
      <div>
        <h1>Home sweet home</h1>
        <h3>Upload an image to start editing!</h3>
        <form action="/upload" method="post"
          encType="multipart/form-data" onSubmit={(e) => this.onSubmit(e)}
          className="uploadForm"
        >
          <div className="filetitle">
            <label htmlFor="title">Enter name of image: </label><br />
            <input type="text" name="title" id="title" onChange={(e) => this.getTitle(e)} />
          </div>
          <div className="uploader">
            <input type="file" name="image" id="image" onChange={(e) => this.getImage(e)} />
          </div>
          <button type="submit">Upload Image</button>
        </form>
        {loadMessage}
        <div className="homeimageWrap">
          {this.state.willEdit &&
            <button onClick={this.handleEdit} className="editbutton">Edit Image</button>
          }
          <img src={this.state.recenturl}
            className="homeimage"
            onLoad={this.handleEditButton}
          />
        </div>


      </div>
    )
  }
}
