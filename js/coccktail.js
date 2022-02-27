let error = document.getElementById('error')
const drinksContainer = document.getElementById('drinks-container')
const detailsContainer = document.getElementById('details-conntainer')

const errorHandle = (err) => {
    error.style.display = 'block'
    error.innerText = err
    drinksContainer.innerHTML = ''
    detailsContainer.innerHTML = ''
}
// event listener function 
const getCoctail = () => {
    // let error = document.getElementById('error')
    const searchInput = document.getElementById('search-input')
    let input = searchInput.value
    // console.log(input);
    if (input === '') {
        // error.style.display = 'block'
        // error.innerText = 'Must Input a valid name!!'
        // drinksContainer.innerHTML = ''
        // detailsContainer.innerHTML = ''
        errorHandle('Must Input a valid name!!')
        return
    }


    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.drinks === null) {
                // error.style.display = 'block'
                // error.innerText = 'Please input a valid name!!'
                // drinksContainer.innerHTML = ''
                // detailsContainer.innerHTML = ''
                errorHandle('Please input a valid name!!')

            } else {
                displayCoctail(data.drinks)
            }
        })
    searchInput.value = ''
}


const displayCoctail = (drinks) => {
    // const drinksContainer = document.getElementById('drinks-container')
    drinksContainer.innerHTML = ''
    drinks.forEach(drink => {
        // console.log(drink);
        if (drink.length == -1) {
            alert('type string')
        }
        else {

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
        }
    })
}

const getDetails = (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.drinks[0]))
}
const displayDetails = (detail) => {
    drinksContainer.innerHTML = ''
    console.log(detail)
    detailsContainer.innerHTML = `
    <img src="${detail.strDrinkThumb}" class="card-img-top w-50 " alt="...">
            <div class="card-body">
              <h5 class="card-title">${detail.strDrink}</h5>
              <p class="card-text">${detail.strInstructions.slice(0, 100)}</p>
            </div>
    `

}