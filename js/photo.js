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
    console.log(photo);
    const div = document.createElement("div");
    div.classList.add("col");
    // div.classList.add("card");
    div.innerHTML = `
              <img src="${photo.thumbnailUrl}" class="card-img-top" alt="...">
              <div class="card-body">
    `;
    photosContaner.appendChild(div);
  });
};
