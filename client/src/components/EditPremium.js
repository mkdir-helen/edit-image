import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
} from '../tools/ReusableUtils';
import { getBase64ImageFromUrl } from '../tools/getBase64ImageFromUrl';
import EditPhoto from './EditPhoto';


export default class Edit extends Component {
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
                width: 0,
                height: 0
            },
            imgSrc: '',
            goneEditMode: false
        }
    }

    componentDidMount() {
        fetch(`/editspecial/${this.props.match.params.photoID}`)
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.setState({
                    recentfile: result,
                    recenturl: result.url,
                    recentname: result.name,
                    public_id: this.getPublicId(result.url)
                })
                getBase64ImageFromUrl(result.url)
                    .then(result => {
                        this.setState({
                            imgSrc: result
                        })
                    })
                    .catch(err => console.error(err))
            })
    }



    handleImageLoaded = (image, pixelCrop) => {
        console.log(image);
    }

    handleOnCropChange = (crop) => {
        this.setState({ crop });
    }
    handleOnCropComplete = (crop, pixelCrop) => {
        // console.log(crop, pixelCrop);

        const canvasRef = this.imagePreviewCanvasRef.current;
        const { imgSrc } = this.state;
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
    }
    handleOnCropClick = (e) => {
        e.preventDefault();
        const canvasRef = this.imagePreviewCanvasRef.current;
        const { imgSrc } = this.state;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension);
        this.setState({
            imgSrc: imageData64
        })
    }

    handleFurtherEditClick = (e) => {
        e.preventDefault();
        this.setState({ goneEditMode: true });
        const canvasRef = this.imagePreviewCanvasRef.current;
        const { imgSrc } = this.state;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension);

        const myFilename = this.state.recentname + '(cropped)' + fileExtension;
        const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);

        let arr = this.state.recenturl.split('/');
        let foldername = arr[arr.length - 2];
        const formdata = new FormData();
        formdata.append('title', myFilename);
        formdata.append('url', this.state.recenturl);
        formdata.append('public_id', this.state.public_id);
        formdata.append('folder', foldername);
        formdata.append('image', myNewCroppedFile);
        fetch(`/upload`, {
            method: 'POST',
            body: formdata,
        })
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.setState({
                    allfiles: [result],
                    recentfile: [result[result.length - 1]],
                    recenturl: result[result.length - 1].url,
                    recentname: result[result.length - 1].name,
                    public_id: this.getPublicId(result[result.length - 1].url)
                })
            });

    }

    handleDownloadClick = (e) => {
        e.preventDefault();
        const canvasRef = this.imagePreviewCanvasRef.current;
        const { imgSrc } = this.state;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        console.log(fileExtension);
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension);
        console.log(imageData64);

        const myFilename = this.state.recentname + '(crop)' + fileExtension;

        //file to be uploaded
        //if we want to upload original image use imgSrc
        // const myNewCroppedFile = base64StringtoFile(imgSrc, myFilename);
        const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
        console.log(myNewCroppedFile);
        //download file
        //if we want to download original image use imgSrc
        // downloadBase64File(imgSrc, myFilename);
        downloadBase64File(imageData64, myFilename);
    }


    getPublicId = (url) => {
        let arr = url.split('/');
        let foldername = arr[arr.length - 2];
        let filename = arr[arr.length - 1];

        let public_id_ext = foldername + '/' + filename;
        let public_id = public_id_ext.substring(0, public_id_ext.length - 4);
        return public_id;
    }

    render() {
        const inEditMode = this.state.goneEditMode;
        return (
            <div className='editor'>
                {inEditMode ? (
                    <div className="editmode">
                        <EditPhoto
                            imagePreviewCanvasRef={this.imagePreviewCanvasRef}
                            recentname={this.state.recentname}
                            imgSrc={this.state.imgSrc}
                            public_id={this.state.public_id}
                            recenturl={this.state.recenturl}
                            history={this.props.history}
                        />
                    </div>
                ) : (
                        <div className="cropmode">
                            <h1>Crop it</h1>
                            <p>Click on the image to start cropping.</p>
                            <div className="cropimages">
                                <div className="cropmain">
                                    <ReactCrop
                                        src={this.state.imgSrc}
                                        crop={this.state.crop}
                                        onImageLoaded={this.handleImageLoaded}
                                        onComplete={this.handleOnCropComplete}
                                        onChange={this.handleOnCropChange} />
                                    <br />
                                    <button onClick={this.handleOnCropClick} >Crop</button>
                                </div>
                                <div className="preview">
                                    <p>Preview Canvas Crop</p>
                                    <canvas ref={this.imagePreviewCanvasRef} ></canvas>
                                    <br />
                                    <button onClick={this.handleDownloadClick} >Download</button>
                                    <button onClick={this.handleFurtherEditClick} >Edit Further</button>
                                </div>

                            </div>
                        </div>
                    )}


            </div>
        )
    }
}
