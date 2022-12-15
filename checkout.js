let orderItemsEl = document.querySelector('[data-order-container]')


    let cart = [] 
    let grandTotal = 0
    let currentId = null
    let isOrderValid = true
    cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)

    renderCart(cart) 

    
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
                    <input id="${array[i].id}" type="number" class="quantity-input" value="${array[i].quantity}" min="1" max="20" data-quantity-input>
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
            <button class="order-confirm-btn" data-order-confirm> Confirm Order </button>
            <a href="index.html">Back to menu</a>
            </section >` 
        }


        
        let orderConfirmBtn = document.querySelector('[data-order-confirm]')
        let quantityInputEl = document.querySelectorAll('[data-quantity-input]')


      
         

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

			quantityInputEl.forEach(item => {
				item.addEventListener('change', event => {
                        let newQuantity = event.target.value
                        let idToChange = event.target.id
                        if(event.target.value < 1 || event.target.value > 20){
                            item.classList.add('error')
                            orderConfirmBtn.classList.add('button-disabled')
                            isOrderValid = false
                        } else {
                            isOrderValid = true
                            item.classList.remove('error')
                            orderConfirmBtn.classList.remove('button-disabled')
                            let newCart = cart.find(cart => cart.id == idToChange)
                            newCart.quantity = newQuantity
                            grandTotal = 0
                            save()
                            renderCart(cart)
                        }	
			    })
		    })

            


            let confirmOrderBtn = document.querySelector('[data-order-confirm]')
            confirmOrderBtn.addEventListener('click', () =>{
                if(isOrderValid){
                    window.location.href = "order-complete.html"
                } else{
                    orderConfirmBtn.classList.add('button-disabled')
                    console.log('erro')
                }

            })
        }


        function save(){
            localStorage.setItem('cart', JSON.stringify(cart))        
        }

       

      
            
        
            
        
        



        

/*
TODO:
layout mobile

*/