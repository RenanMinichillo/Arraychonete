const buttonHome = document.querySelector('#btn-home')
const buttonMenu = document.querySelector('#btn-menu')
const buttonFilter = document.querySelector('#btn-filter')
const listMenu = document.querySelector('#list-menu')
const mediaQuery = window.matchMedia('(max-width: 420px)');

const snackCheck = document.querySelector('#snack')
const dessertCheck = document.querySelector('#dessert')
const drinkCheck = document.querySelector('#drink')

const selected = [snackCheck, dessertCheck, drinkCheck]

function formatValue(value){
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

function hideContent() {
    const filter = document.querySelector('.filter')
    const homeLogo = document.querySelector('.home-logo')
    let content = ''
    listMenu.innerHTML = content

    homeLogo.classList.remove('hidden')
    filter.style.left = '-170px'
}

function showMenu(productsArray) {
    const homeLogo = document.querySelector('.home-logo')

    homeLogo.classList.add('hidden')

    let content = ''
    productsArray.forEach(item => {
        content +=
            `
        <li>
            <img class="item-image" src="${item.src}">
            <p class="item-name">${item.name}</p>
            <span class="item-price">${formatValue(item.price)}</span>
        </li>
        `
    })

    listMenu.innerHTML = content
}

function filterOptions(e) {
    const filter = document.querySelector('.filter')
    const homeLogo = document.querySelector('.home-logo')

    if (!filter.style.left) {
        filter.style.left = '-170px';
        listMenu.style.paddingLeft = '0px';
    }

    if (filter.style.left === '0px') {
        filter.style.left = '-170px';
        listMenu.style.paddingLeft = '0px';
        homeLogo.classList.add('hidden');
    } else {
        filter.style.left = '0px';
        listMenu.style.paddingLeft = '100px';
        listMenu.style.transition = 'padding .5s ease'
    }

    
    showMenu()
}

function filterSelected(select) {
    let options = []

    if (snackCheck.checked) {
        options = options.concat(menuOptions.filter(products => products.type === snack))
        showMenu(options)
    }

    if (dessertCheck.checked) {
        options = options.concat(menuOptions.filter(products => products.type === dessert))
        showMenu(options)
    }

    if (drinkCheck.checked) {
        options = options.concat(menuOptions.filter(products => products.type === drink))
        showMenu(options)
    }

    return options

}

selected.forEach(select => {
    select.addEventListener('change', () => filterSelected(select))
})
buttonHome.addEventListener('click', hideContent)
buttonMenu.addEventListener('click', () => showMenu(menuOptions))
buttonFilter.addEventListener('click', filterOptions)
