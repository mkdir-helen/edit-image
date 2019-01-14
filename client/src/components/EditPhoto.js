import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
} from '../tools/ReusableUtils';
import { getBase64ImageFromUrl } from '../tools/getBase64ImageFromUrl';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';


export default class EditPhoto extends Component {
    constructor(props) {
        super(props);
        // this.imagePreviewCanvasRef = React.createRef();
        this.imagePreviewCanvasRef = props.imagePreviewCanvasRef;
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
            radius: '0',
            angle: '0',
            opacity: '100',
            effect: '',
            x: '0',
            y: '0',
            fontFamily: "arial",
            fontSize: "80",
            text: "hello world",
            coRGB: "black",
            active: false
        }
    }

    componentDidMount = () => {
        fetch(`/active`)
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.setState({
                    active: result
                })
            })
    }


    handleDownloadClickCloud = (e) => {
        e.preventDefault();
        const CloudRef = this.cloudinaryImageRef.current;
        const imgSrc = this.props.imgSrc;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        const currentCloudURL = CloudRef.state.url + '.' + fileExtension;
        getBase64ImageFromUrl(currentCloudURL).then(result => {
            this.setState({
                CloudBase64: result
            }, () => {
                this.downloadImage(fileExtension);
                console.log('image downloaded');
                this.deleteImage();
                console.log('image deleted');
            }
            )

        })

    }

    downloadImage = (fileExtension) => {
        const myFilename = this.props.recentname + '(crop)' + fileExtension;
        downloadBase64File(this.state.CloudBase64, myFilename);
    }
    deleteImage() {
        if (this.state.active === false) {
            fetch(`/delete`, {
                method: `POST`,
                body: JSON.stringify({
                    publicID: this.props.public_id,
                    url: this.props.recenturl
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(r => r.json())
                .then(result => {
                    console.log(result);
                    this.props.history.push('/login');
                })
        }
    }

    handleSave = (e) => {
        const CloudRef = this.cloudinaryImageRef.current;
        const imgSrc = this.props.imgSrc;
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
        const currentCloudURL = CloudRef.state.url + '.' + fileExtension;
        getBase64ImageFromUrl(currentCloudURL).then(result => {
            this.setState({
                CloudBase64: result
            }, () => {
                // console.log(this.state.CloudBase64);
                const myFilename = this.props.recentname + '(crop)' + fileExtension;
                const myNewCroppedFile = base64StringtoFile(this.state.CloudBase64, myFilename);
                let arr = this.props.recenturl.split('/');
                let foldername = arr[arr.length - 2];
                const formdata = new FormData();
                formdata.append('title', myFilename);
                formdata.append('url', this.props.recenturl);
                formdata.append('public_id', this.props.public_id);
                formdata.append('folder', foldername);
                formdata.append('image', myNewCroppedFile);
                fetch(`/upload`, {
                    method: 'POST',
                    body: formdata,
                })
                    .then(r => r.json())
                    .then(result => {
                        console.log(result);
                        fetch(`/delete`, {
                            method: `POST`,
                            body: JSON.stringify({
                                publicID: this.getPublicId(result[result.length - 2].url),
                                url: result[result.length - 2].url
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(r => r.json())
                            .then(result => {
                                console.log(result);
                            })
                    })
                    .then(
                        this.props.history.push('/gallery')
                    )

            })
        })
            .catch(err => console.error(err));
    }

    getPublicId = (url) => {
        let arr = url.split('/');
        let foldername = arr[arr.length - 2];
        let filename = arr[arr.length - 1];

        let public_id_ext = foldername + '/' + filename;
        let public_id = public_id_ext.substring(0, public_id_ext.length - 4);
        return public_id;
    }
    //PHOTO EDIT
    handleEffectChange = (e) => {
        this.setState({ effect: e.target.value });
    }
    handleAngleChange = (e) => {
        this.setState({ angle: e.target.value });
    }
    handleRadiusChange = (e) => {
        this.setState({ radius: e.target.value });
    }
    handleOpacityChange = (e) => {
        this.setState({ opacity: e.target.value });
    }
    //TEXT EDIT
    handleXChange = (e) => {
        this.setState({ x: e.target.value });
    }
    handleYChange = (e) => {
        this.setState({ y: e.target.value });
    }
    handleFontFamilyChange = (e) => {
        this.setState({ fontFamily: e.target.value });
    }
    handleFontSizeChange = (e) => {
        this.setState({ fontSize: e.target.value });
    }
    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    }
    handleTextColorChange = (e) => {
        this.setState({ coRGB: e.target.value });
    }

    render() {
        let isnotEmpty;
        if (this.state.effect !== '') {
            isnotEmpty = this.state.effect;
        } else {
            isnotEmpty = null;
        }
        const isLoggedIn = this.state.active;
        const thereIsText = this.state.text !== "";
        return (
            <div>
                <h1>Edit Photo</h1>
                <div className="cloudeditor">
                    <div className="cloudPreview">
                        <Image cloudName={process.env.REACT_APP_CLOUD_NAME}
                            publicId={this.props.public_id}
                            ref={this.cloudinaryImageRef}
                            className='cloudPreviewImg'
                        >
                            <Transformation crop="fit" effect={isnotEmpty} radius={this.state.radius} opacity={this.state.opacity} />
                            {thereIsText &&
                                <Transformation overlay={`text:${this.state.fontFamily}_${this.state.fontSize}:${this.state.text}`}
                                    x={this.state.x} y={this.state.y} color={this.state.coRGB} />
                            }
                            <Transformation angle={this.state.angle} />
                        </Image>
                    </div>
                    <div className="editWrapper">
                        <div className="editSection">
                            <div className="editImage">
                                <h3>Photo Edits</h3>
                                <div className="opacity">
                                    <label htmlFor="opacity">Opacity: </label>
                                    <input type="number" name="opacity" id="" min="0" max="100" value={this.state.opacity} onChange={this.handleOpacityChange} />
                                </div>
                                <div className="angle">
                                    <label htmlFor="angle">Rotation: </label>
                                    <input type="number" name="angle" id="" min="-360" max="360" value={this.state.angle} onChange={this.handleAngleChange} />
                                </div>
                                <div className="radius">
                                    <label htmlFor="radius">Corner Radius: </label>
                                    <input type="number" name="radius" id="" min="0" max="100" value={this.state.radius} onChange={this.handleRadiusChange} />

                                </div>
                                <div className="pictureEffect">
                                    <label htmlFor="picture_effect">Photo Effect: </label>
                                    <select name="picture_effect" onChange={this.handleEffectChange}>
                                        <option value="">None</option>
                                        <option value="sepia">Sepia</option>
                                        <option value="negate">Invert</option>
                                        <option value="grayscale">Grayscale</option>
                                        <option value="blackwhite">Blackwhite</option>
                                        <option value="cartoonify">Cartoonify</option>
                                    </select>
                                </div>
                            </div>
                            <div className="editText">
                                <h3>Overlay Text Edits</h3>
                                <div className="textCoordinates">
                                    <div className="xylabel">
                                        <label >Text Position</label><br />
                                    </div>
                                    <div className="X">
                                        <label htmlFor="x">X: </label>
                                        <input type="number" name="x" value={this.state.x} onChange={this.handleXChange} />
                                    </div>
                                    <div className="Y">
                                        <label htmlFor="y">Y: </label>
                                        <input type="number" name="y" value={this.state.y} onChange={this.handleYChange} />
                                    </div>
                                </div>
                                <div className="fontFamily">
                                    <label htmlFor="fontFamily">Font-Family: </label>
                                    <select name="fontFamily" onChange={this.handleFontFamilyChange} value={this.state.fontFamily}>
                                        <option value="allan">Allan</option>
                                        <option value="arial">Arial</option>
                                        <option value="bookman">Bookman</option>
                                        <option value="courier">Courier</option>
                                        <option value="dekko">Dekko</option>
                                        <option value="gruppo">Gruppo</option>
                                        <option value="helvetica">Helvetica</option>
                                        <option value="impact">Impact</option>
                                        <option value="kalam">Kalam</option>
                                        <option value="merienda">Merienda</option>
                                        <option value="neucha">Neucha</option>
                                        <option value="palatino">Palatino</option>
                                        <option value="roboto">Roboto</option>
                                        <option value="times">Times</option>
                                        <option value="verdana">Verdana</option>
                                    </select>
                                </div>
                                <div className="Text">
                                    <label htmlFor="Text">Text: </label>
                                    <input type="text" name="Text" value={this.state.text} onChange={this.handleTextChange} />
                                </div>
                                <div className="fontSize">
                                    <label htmlFor="fontSize">Font-Size: </label>
                                    <input type="number" min="4" name="fontSize" value={this.state.fontSize} onChange={this.handleFontSizeChange} />
                                </div>
                                <div className="coRGB">
                                    <label htmlFor="coRGB">Text Color: </label>
                                    {/* <input type="text" name="coRGB" onChange={this.handleTextColorChange} /> */}
                                    <select name="coRGB" onChange={this.handleTextColorChange} value={this.state.coRGB}>
                                        <option value="black" >Black</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="pink">Pink</option>
                                        <option value="purple">Purple</option>
                                        <option value="brown">Brown</option>
                                        <option value="yellow">Yellow</option>
                                        <option value="orange">Orange</option>
                                        <option value="white">White</option>
                                        <option value="grey">Grey</option>
                                        <option value="silver">Silver</option>
                                        <option value="gold">Gold</option>
                                        <option value="cyan">Cyan</option>
                                        <option value="lime">Lime</option>
                                        <option value="magenta">Magenta</option>
                                        <option value="olive">Olive</option>
                                    </select>
                                </div>
                            </div>

                            <button onClick={this.handleDownloadClickCloud} >Download</button>
                            {isLoggedIn &&
                                <button onClick={this.handleSave}>Save</button>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
