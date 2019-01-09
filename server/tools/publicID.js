
 const getPublicId = (url) => {
    let arr = url.split('/');
    // console.log(arr);
    let foldername = arr[arr.length-2];
    // console.log(foldername);
    let filename = arr[arr.length-1];
    // console.log(filename);

    let public_id_ext = foldername + '/' + filename;
    // console.log(public_id_ext);
    let public_id = public_id_ext.substring(0, public_id_ext.length-4);
    // console.log(public_id);
    return public_id;
  }

  module.exports = getPublicId; 