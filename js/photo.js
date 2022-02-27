const getData = () => {
  const url = `https://jsonplaceholder.typicode.com/photos`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data));
};
getData();
const displayData = (photos) => {
  let photoSlice = photos.slice(0, 50);
  const photosContaner = document.getElementById("photos");
  photoSlice.forEach((photo) => {
    console.log(photo.thumbnailUrl);
  });
};
