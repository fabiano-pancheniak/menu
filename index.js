const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'

let menuItems = [
{
    id: 1,
    name: 'Buttermilk Pancakes',
    image: 'images/item-1.jpeg',
    price: 15.99,
    about: loremIpsum,
    category: 'Breakfast'
},
{
    id: 2,
    name: 'Diner Double',
    image: 'images/item-2.jpeg',
    price: 13.99,
    about: loremIpsum,
    category: 'Lunch'
},
{   
    id: 3,
    name: 'Country Delight',
    image: 'images/item-4.jpeg',
    price: 20.99,
    about: loremIpsum,
    category: 'Breakfast'
},
{   
    id: 4,
    name: 'Egg Attack',
    image: 'images/item-5.jpeg',
    price: 22.99,
    about: loremIpsum,
    category: 'Lunch'
},
{   
    id: 5,
    name: 'Oreo Dream',
    image: 'images/item-6.jpeg',
    price: 18.99,
    about: loremIpsum,
    category: 'Shake'
},
{
    id: 6,
    name: 'Bacon Overflow',
    image: 'images/item-7.jpeg',
    price: 8.99,
    about: loremIpsum,
    category: 'Lunch'
},
{   
    id: 7,
    name: 'American Classic',
    image: 'images/item-8.jpeg',
    price: 12.99,
    about: loremIpsum,
    category: 'Lunch'
},
{
    id: 8,
    name: 'Steak Diner',
    image: 'images/item-10.jpeg',
    price: 39.99,
    about: loremIpsum,
    category: 'Dinner'
},

]


let cart = []
console.log(cart)

let menuItemsEl = document.querySelector('[data-items]')

initializeDOM()

render(menuItems)

let quantity = 1
let currentId = null


let lunch = menuItems.filter( menuItems => menuItems.category === 'Lunch')
let breakfast = menuItems.filter( menuItems => menuItems.category === 'Breakfast')
let dinner = menuItems.filter( menuItems => menuItems.category === 'Dinner')
let shakes = menuItems.filter( menuItems => menuItems.category === 'Shake')


filters()

//TODO: improve item name, quantity and pricing, make it work on checkout.html
orderConfirmBtn.addEventListener('click', (event) =>{
    let cartObject = {
        name: menuItems[currentId - 1].name,
        image: menuItems[currentId - 1].image,
        price: menuItems[currentId - 1].price,
        quantity: quantity
    }
    cart.push(cartObject)
    quantity = 1
    quantityEl.textContent = quantity
    if(cart.length > 0){
        cartQuantityEl.classList.remove('hidden')
    }
    cartQuantityEl.textContent = cart.length
    closeModal()
})

cartEl.addEventListener('click', () =>{
    localStorage.setItem('cart', JSON.stringify(cart))
    window.location.href = "checkout.html"
})



overlayEl.addEventListener("click", () => closeModal());

function closeModal() {
    quantityModalEl.classList.add("hidden");
    overlayEl.classList.add("hidden");
  }

function render(array){
    menuItemsEl.textContent = ''
    for(let i = 0; i < array.length; i++){
        menuItemsEl.innerHTML += `
                <div class="item-card" data-item-card>
                    <img src="${array[i].image}" alt="pancakes">
                    <div class="info">
                        <div class="title-price">
                            <span class="title">${array[i].name}</span>
                            <span class="price"> $ ${array[i].price} </span>
                        </div>
                        <p> ${array[i].about}</p>
                        <div class="order-btn">
                            <button data-order id=${array[i].id}>Add to cart</button>
                        </div>
                    </div>
                </div>
        
        `
    }

    let itemCardEl = document.querySelectorAll('[data-item-card]') 

    
    itemCardEl.forEach(item => {
        item.addEventListener('click', event => {
          if(event.target.tagName === "BUTTON"){
            quantityModalEl.classList.remove('hidden')
            overlayEl.classList.remove("hidden")
            currentId = event.target.id
          }
          
        })
      })
}

let add
let remove


checkQuantity()
increaseBtn.addEventListener('click', () => increase())
decreaseBtn.addEventListener('click', () => decrease())


//TODO: avoid repeating code by adding a parameter to the increase/decrease function
function increase(){
    checkQuantity()
    quantity = quantity + 1
    quantityEl.textContent = quantity
}

function decrease(){
    checkQuantity()
    quantity = quantity - 1
    quantityEl.textContent = quantity
    checkQuantity()
}

function checkQuantity(){
    if(quantity === 1){
        decreaseBtn.setAttribute('disabled', '')
    } else {
        decreaseBtn.removeAttribute('disabled', '')
    }
}


function initializeDOM(){
     allItemsBtn = document.querySelector('[data-all]')
     lunchBtn = document.querySelector('[data-lunch]')
     shakesBtn = document.querySelector('[data-shakes]')
     breakfastBtn = document.querySelector('[data-breakfast]')
     dinnerBtn = document.querySelector('[data-dinner]')
     quantityModalEl = document.querySelector('[data-quantity-modal]')
     quantityEl = document.querySelector('[data-quantity]')
     overlayEl = document.querySelector('[data-overlay]') 
     increaseBtn = document.querySelector('[data-increase]')
     decreaseBtn = document.querySelector('[data-decrease]')
     orderConfirmBtn = document.querySelector('[data-order-confirm]')
     cartQuantityEl = document.querySelector('[data-cart-quantity]')
     cartEl = document.querySelector('[data-cart]')
}


function filters(){
    allItemsBtn.addEventListener('click', () => render(menuItems))
    lunchBtn.addEventListener('click', () => render(lunch))
    breakfastBtn.addEventListener('click', () => render(breakfast))
    dinnerBtn.addEventListener('click', () => render(dinner))
    shakesBtn.addEventListener('click', () => render(shakes))
}



