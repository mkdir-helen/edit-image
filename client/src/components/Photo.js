import React, { Component } from 'react'

export default class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: []
        }
    }

    componentDidMount(){
        fetch(`/photo/${this.props.match.params.photoID}`)
          .then(r => r.json())
          .then(result => {
            console.log(result);
            this.setState({
              file: result,
              fileURL: result.url
            })
          })
    }
    // componentDidUpdate(){
    //     fetch(`/gallery/${this.props.match.params.photoID}`)
    //       .then(r => r.json())
    //       .then(result => {
    //         console.log(result);
    //         this.setState({
    //           file: result,
    //           fileURL: result.url
    //         })
    //       })
    //   }

    handleDelete = (id) => {
        fetch(`/photo/${this.props.match.params.photoID}`,{
            method: 'DELETE'
        })
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.props.history.push('/gallery');
            })
            .catch(err => {
                console.log(err);
            });
    }
  render() {
    return (
      <div className="photoWrapper">
        <div className="buttons">
            <button>Edit</button>
            <button>Download</button>
            <button onClick={this.handleDelete}>Delete</button>
        </div>
        <div className="photoimage">
            <img src={this.state.fileURL} />
        </div>  
      </div>
    )
  }
}
