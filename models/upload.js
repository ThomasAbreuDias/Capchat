const uploadFile =  e => {
  const files = e.target.files;
  console.log('files', files);
  const form = new FormData();
  for (let i = 0; i < files.length; i++) {
    form.append('files', files[i], files[i].name)
  }
  try {
    let request =  fetch('/upload', {
      method: 'post',
      body: form,
    })
    const response =  request.json();
    console.log('Response', response);
  } catch (err) {
    alert('Error uploading the files');
    console.log('Error uploading the files', err);
  }
}