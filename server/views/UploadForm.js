function UploadForm(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <div> 
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title"> 
                </div>
                <div>
                    <label for="image">Image</label>
                    <input type="file" name="image" id="image">
                </div>
                <button type="submit">Upload Image</button>
            </form>
        </div>
    </body>
    </html>
    `;
}

module.exports = UploadForm;