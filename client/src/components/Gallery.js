import React, { Component } from 'react';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: []
        }
    }

    // componentDidMount(){
    //   fetch(`/gallery`)
    //     .then(r => r.json())
    //     .then(resultArray => {
    //       console.log(resultArray);
    //       this.setState({
    //         gallery: resultArray
    //       })
    //     })
    // }

   handleUploadImages = images => {
    const uploads = images.map(image => {
      
    });

    
  }

  render() {
    return (
      <div>
        <h1>This is the gallery</h1>
        
      </div>
    )
  }
}