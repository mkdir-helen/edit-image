# Edit Squirrel

[Live Demo](www.edit-squirrel.com)
## About
With so many mobile apps that allow image editing, I wanted a site where it's possible to edit images on a laptop without having to download or pay for applications. This website allows users to upload, edit, download, and save images. Users who are registered can save their images to edit as many times as they like.

## Built With
* [React](https://github.com/facebook/create-react-app)
* Express
* Node.js
* PostgreSQL
* [Cloudinary](https://cloudinary.com)
* [Multer](https://github.com/expressjs/multer)
* [React Image Crop](https://github.com/DominicTobias/react-image-crop)


## Challenges
The biggest challenge I encountered was trying to integrate Cloudinary with the React Image Crop. The React Image Crop has a preview image which is a canvas. With the help of some  [codes](https://www.codingforentrepreneurs.com/blog/a-few-javascript-methods-for-images-files/) I borrowed, I was able to convert canvas image to Base64, which could be also converted to downloadable files. Cloudinary needed image URLs for editing and transforming its images, so I couldn't use Base64 as an image source. I decided to upload images to Cloudinary to retrieve the image URL every time a user wanted to save the cropped image and edit them further. I have considered updating images in Cloudinary instead of uploading a new file each time, but uploading seemed the more time efficient option so I stuck to uploading and deleting previous images, which were created in the cropping process.   

## Future Additions
 * Be able to update images instead of creating newly edited images
 

## Acknowledgments
### Shoaib Bhimani - Setting up Cloudinary in Node
  * [Youtube link](https://www.youtube.com/watch?v=9R4A0-FjG-M&t=227s&list=LLuBSaJZeyAPVxIYzUrBUp1A&index=2)
  (The language is in Hindi but the video was easy to follow along and understand)
  * [GitHub Code](https://github.com/shoaibcode/express-handler/tree/upload-image-part1)
### CodingEntrepreneurs(Justin Mitchel) - Setting up react-image-crop in React
  * [Youtube link](https://www.youtube.com/watch?v=jyeRDo2tP_s&index=28&list=PLEsfXFp6DpzQbwYDx1zgcKJ4tzyWFaESK&t=545s)
  * [GitHub Code](https://github.com/codingforentrepreneurs/Try-Reactjs)
  * [Helper Code](https://www.codingforentrepreneurs.com/blog/a-few-javascript-methods-for-images-files/) -Converting Base64 to canvas and vice versa
### Jason Jarrett - Converting image URL to Base64
  * [Code link](https://staxmanade.com/2017/02/how-to-download-and-convert-an-image-to-base64-data-url/#disqus_thread)
### Gosha Arinich - Creating a mobile responsive layout with React
 * [Code link](https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/)
  
  
