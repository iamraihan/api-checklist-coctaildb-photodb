// global code
let error = document.getElementById('error')
const drinksContainer = document.getElementById('drinks-container')
const detailsContainer = document.getElementById('details-conntainer')
// spinner 
const toggleSpinner = (toggle) => {
    document.getElementById('toggle').style.display = toggle
}
// error handle function 
const errorHandle = (err) => {
    error.style.display = 'block'
    error.innerText = err
    drinksContainer.innerHTML = ''
    detailsContainer.innerHTML = ''
}
// event listener function 
const getCoctail = () => {
    const searchInput = document.getElementById('search-input')
    let input = searchInput.value
    toggleSpinner('block')
    if (input === '') {
        toggleSpinner('none')
        errorHandle('Must Input a valid name!!')
        return
    }
    // api fetch for input 
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.drinks === null) {
                errorHandle('Please input a valid name!!')
            } else {
                displayCoctail(data.drinks)
            }
            toggleSpinner('none')
        })
    searchInput.value = ''
}
// display search result 
const displayCoctail = (drinks) => {
    drinksContainer.innerHTML = ''
    drinks.forEach(drink => {
        error.style.display = 'none'
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        <img onclick="getDetails(${drink.idDrink})" src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text">${drink.strInstructions.slice(0, 100)}</p>
        </div>
        `
        drinksContainer.appendChild(div)
        toggleSpinner('none')
    })
}
// fetch api for details view 
const getDetails = (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.drinks[0]))
    toggleSpinner('block')
}
// display details view 
const displayDetails = (detail) => {
    // if (detail === !-1) { // this code is not working 
    //     toggleSpinner('block') 
    // } else {
    //     toggleSpinner('none')
    // }
    drinksContainer.innerHTML = ''
    detailsContainer.innerHTML = `
    <img src="${detail.strDrinkThumb}" class="card-img-top w-50 " alt="...">
            <div class="card-body">
              <h5 class="card-title">${detail.strDrink}</h5>
              <p class="card-text">${detail.strInstructions.slice(0, 100)}</p>
            </div>
    `
    toggleSpinner('none')
}