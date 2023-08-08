const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', () => {
  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const hasMatchingFileType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (hasMatchingFileType) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
});
