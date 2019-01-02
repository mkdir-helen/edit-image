import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class ImageUploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: []
        }
    }
   // This function does the uploading to cloudinary
   handleUploadImages = images => {
    // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
    const uploads = images.map(image => {
      // our formdata
      const formData = new FormData();
      formData.append("file", image);
      formData.append("tags", '{TAGS}'); // Add tags for the images - {Array}
      formData.append("upload_preset", "{YOUR_PRESET}"); // Replace the preset name with your own
      formData.append("api_key", "{YOUR_API_KEY}"); // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Replace cloudinary upload URL with yours
      return axios.post(
        "https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload",
        formData, 
        { headers: { "X-Requested-With": "XMLHttpRequest" }})
        .then(response => console.log(response.data))
    });

    // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
    axios.all(uploads).then(() => {
      // ... do anything after successful upload. You can setState() or save the data
      console.log('Images have all being uploaded')
    });
  }

  render() {
    return (
      <Dropzone
        onDrop={this.handleUploadImages}
        multiple
        accept="image/*"
      >
      Try dropping some files here, or click to select files to upload.
      </Dropzone>
    )
  }
}