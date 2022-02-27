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
    div.innerHTML = `
              <img onclick="getDetails(${photo.id})" src="${photo.thumbnailUrl}" class="card-img-top" alt="...">
              <div class="card-body">
    `;
    photosContaner.appendChild(div);
  });
};

const getDetails = (id) => {
  const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data));
  //   console.log(id);
};

const showDetails = (info) => {
  console.log(info);
  const detailsContainer = document.getElementById("details");
  detailsContainer.innerHTML = `
  <div class="card w-50 text-center mx-auto">
  <img src="${info.thumbnailUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${info.title}</h5>
    
  </div>
</div>
  `;
  document.getElementById("photos").innerHTML = "";
};
