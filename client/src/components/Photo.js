import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { getBase64ImageFromUrl } from '../tools/getBase64ImageFromUrl';
import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
} from '../tools/ReusableUtils';

export default class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            fileName: '',
            fileURL: '',
            fileID: '',
            imgSrc: ''
        }
    }

    componentDidMount() {
        fetch(`/photo/${this.props.match.params.photoID}`)
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.setState({
                    file: result,
                    fileURL: result.url,
                    fileName: result.name,
                    fileID: result.id
                })
                getBase64ImageFromUrl(result.url)
                    .then(result => {
                        this.setState({
                            imgSrc: result
                        })
                    })
                    .catch(err => console.error(err));
            })
    }


    handleEdit = (e) => {

    }
    handleDownload = (e) => {
        e.preventDefault();
        const { imgSrc } = this.state;
        console.log(imgSrc)
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        console.log(fileExtension);
        const myFilename = this.state.fileName + fileExtension;
        console.log(myFilename);
        downloadBase64File(imgSrc, myFilename);
    }
    handleDelete = (id) => {
        fetch(`/photo/${this.props.match.params.photoID}`, {
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
                    <div>
                        <Link to={`/editspecial/${this.state.fileID}`}>
                            <button onClick={this.handleEdit}>Edit</button>
                        </Link>

                    </div>
                    <div>
                        <button onClick={this.handleDownload}>Download</button>

                    </div>
                    <div>
                        <button onClick={this.handleDelete}>Delete</button>

                    </div>
                </div>
                <div className="photoimage">
                    <img src={this.state.fileURL} />
                </div>
            </div>
        )
    }
}


