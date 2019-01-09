import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: []
        }
    }

    componentDidMount(){
      fetch(`/gallery`)
        .then(r => r.json())
        .then(resultArray => {
          console.log(resultArray);
          this.setState({
            gallery: resultArray
          })
        })
    }

    // this.setState({
    //   allfiles: [result],
    //   recentfile: [result[result.length-1]],
    //   recenturl: result[result.length-1].url,
    //   recentname: result[result.length-1].name,
    //   public_id: this.getPublicId(result[result.length-1].url)
    // })

  //  handleUploadImages = images => {
  //   const uploads = images.map(image => {
      
  //   });

  handleImage = (e) => {
    
  }  
  
    render() {
      return (
        <div>
          <h1>This is the gallery</h1>
          <div className="gallery">
            {this.state.gallery.map(data => {
              return(
                <div className="image" key={data.id} onClick={this.handleImage}>
                  <Link to={`/gallery/${data.id}`}>
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
