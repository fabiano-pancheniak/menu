let orderItemsEl = document.querySelector('[data-order-container]')

let menuItems = [
    {
        id: 1,
        name: 'Buttermilk Pancakes',
        image: 'images/item-1.jpeg',
        price:  15.99,
        quantity: 1
    },
    {
        id: 2,
        name: 'Diner Double',
        image: 'images/item-2.jpeg',
        price: 13.99,
        quantity: 2
    },
    {   
        id: 3,
        name: 'Country Delight',
        image: 'images/item-4.jpeg',
        price: 20.99,
        quantity: 2
    }]

    let cart = [] 
    let grandTotal = 0
    cart = JSON.parse(localStorage.getItem('cart'))

    renderCart()

    function renderCart(){
        for(let i = 0; i < cart.length; i++){
            orderItemsEl.innerHTML += `
        <section class="order-items">
            <img src="${cart[i].image}" alt="">
            <div class="item-info">
                <p class="item-name">${cart[i].name}</p>
                <p class="item-quantity">Quantity: <span> ${cart[i].quantity} </span></p>
                <p class="item-total">Total: <span> $ ${cart[i].quantity * cart[i].price} </span></p>
        </section>`
        grandTotal += cart[i].quantity * cart[i].price
        }

        orderItemsEl.innerHTML += 
        `<section class="order-checkout">
            <p class="grand-total">Total <span> $ ${grandTotal.toFixed(2)} </span></p>
            <button class="confirm-order-btn"> Confirm Order </button>
            </section >
            `
    }



    /*
let cartLS = JSON.parse(localStorage.getItem('cart'))

let dataCartDump = document.querySelector('[data-cart-dump]')
dataCartDump.textContent += cartLS

console.log(cartLS)

/*
foi passado de pagina pra outra via local storage
provavelmente nem precisa de type='module'
refazer funcao initializeDOM()
remover cart.js
voltar a declaracao de let cart = [] em index.js
estilizar icone de carrinho e indicador de itens
estilizar botao order


*/