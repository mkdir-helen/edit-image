
const getPublicId = (url) => {
  let arr = url.split('/');
  let foldername = arr[arr.length - 2];
  let filename = arr[arr.length - 1];

  let public_id_ext = foldername + '/' + filename;
  let public_id = public_id_ext.substring(0, public_id_ext.length - 4);
  return public_id;
}

module.exports = getPublicId; 