let orderItemsEl = document.querySelector('[data-order-container]')


    let cart = [] 
    let grandTotal = 0
    let currentId = null
    cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)

    renderCart(cart)
    

   


/*
    itemCardEl.forEach(item => {
        item.addEventListener('click', event => {
            console.log(event.target.id)
        })
      })

*/

  




    
    function renderCart(array){
		orderItemsEl.innerHTML = ''

        for(let i = 0; i < array.length; i++){
        orderItemsEl.innerHTML += `
        <section class="order-items" data-item-card>
            <img src="${array[i].image}" alt="">
            <div class="item-info">
                <p class="item-name">${array[i].name}</p>
                <button class="remove-item" id="${array[i].id}" data-item-remove> X </button>
                <p class="item-quantity">Quantity: 
                    <input id="${array[i].id}" type="number" value="${array[i].quantity}" min="1" max="20" data-quantity-input>
                </p>
                <p class="item-total">Total: <span> $ ${(array[i].quantity * array[i].price).toFixed(2)} </span></p>
        </section>`
        grandTotal += cart[i].quantity * cart[i].price
        }

        if(cart.length === 0 ){
            orderItemsEl.innerHTML += `
            <p class="cart-empty">
                You cart is empty
                <br>
                Click <a href="index.html"> here</a> to start adding items
            </p>` 
        }   else {
            orderItemsEl.innerHTML += `
            <section class="order-checkout">
            <p class="grand-total">Total <span> $ ${grandTotal.toFixed(2)} </span></p>
            <button class="order-confirm-button" data-order-confirm> Confirm Order </button>
            </section >` 
        }


      
         

			let itemCardEl = document.querySelectorAll('[data-item-card]')
			itemCardEl.forEach(item => {
				item.addEventListener('click', event => {
						if(event.target.tagName === "BUTTON"){
							currentId = event.target.id
							grandTotal = 0
							cart = cart.filter(cart => cart.id != currentId)
                            save()
							orderItemsEl.innerHTML = ''
							renderCart(cart)
						}
									
			    })
		    })


            let quantityInputEl = document.querySelectorAll('[data-quantity-input]')
			quantityInputEl.forEach(item => {
				item.addEventListener('change', event => {
                        let newQuantity = event.target.value
                        let idToChange = event.target.id
                        let newCart = cart.find(cart => cart.id == idToChange)
                        newCart.quantity = newQuantity
                        grandTotal = 0
                        save()
                        renderCart(cart)
									
			    })
		    })


            let confirmOrderBtn = document.querySelector('[data-order-confirm]')
            confirmOrderBtn.addEventListener('click', () =>{
                window.location.href = "order-complete.html"
            })
        }


        function save(){
            localStorage.setItem('cart', JSON.stringify(cart))        
        }

      
            
        
            
        
        



        

/*

adicionar botao pra retornar mesmo com o carrinho cheio
mostrar quantidades do produto que ja estao no carrinho ao adicionar ( se existir )
validar pedido antes de habilitar o botao de finalizar

*/