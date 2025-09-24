let tempProduct= {

}
function addToCart(productName,productPrice,productImg){
    tempProduct= {
        name: productName,
        price: productPrice,
        image: productImg

    };
   document.querySelector("#box").classList.add('d-block');
    document.querySelector("#box").classList.remove('d-none');

    
}
function cancel(){
    document.querySelector("#box").classList.add('d-none');
    document.querySelector("#box").classList.remove('d-block');
}
function add(){
    let cartItem = JSON.parse(localStorage.getItem('cart')) ||[];
    let checkProduct = cartItem.find(cartProduct=>cartProduct.name === tempProduct.name);
    if(checkProduct){
        // alert('Product already in Local Storage')
        checkProduct.quantity += 1;

    } else{
        let Product = {
            id: cartItem.length + 1,
            name : tempProduct.name,
            price: tempProduct.price,
            quantity: 1,
            image : tempProduct.image
        }
        cartItem.push(Product);
       

    }
    localStorage.setItem('cart',JSON.stringify(cartItem));
    cancel();
     quantity()

} 
function loadData(){
    let cartItem = JSON.parse(localStorage.getItem('cart')) || [];
    // console.log(cartItem);
    let cartContainer = document.querySelector('.carts');
    let total = 0;
    cartContainer.innerHTML = '';
    if (cartItem.length ===0){
        cartContainer.innerHTML = '<h3 class="text-center text-danger"> Your Cart is Empty</h3>';
    }else{
        cartItem.forEach((product,index)=>{
            cartContainer.innerHTML +=`<div class="cart d-flex justify-content-between">
                    <img src="imgs/${product.image}" alt="" style="width: 100px; ">
                    <div class="info text-end">
                        <h4 class="m-0">${product.name}</h4>
                        <p class="m-0 fs-4">Price: $ ${product.price}</p>
                        <div class="btns">
                            <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                            <span>${product.quantity}</span>
                            <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
                        </div>
                    </div>
                </div> <hr>

            `;

            total += product.price * product.quantity;
            let price= document.querySelector('#total')
            price.textContent = total;

        })

        
    }
    
}
function changeQuantity(index,action){
    let cartItem = JSON.parse(localStorage.getItem('cart')) || [];
    if(action === 'decrease'){
        cartItem[index].quantity -= 1;

    }
    if(action === 'increase'){
        cartItem[index].quantity += 1;

    }
    if(cartItem[index].quantity ===0){
        cartItem.splice(index,1);
    }
    localStorage.setItem('cart',JSON.stringify(cartItem));
    loadData();
     quantity()


}
function clearAll(){
    localStorage.removeItem('cart');
     let price = document.querySelector('#total');
    price.textContent = 0;
    
    loadData();
     quantity()
}
function quantity(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartcount = 0;

    cart.forEach(product => {
        cartcount += product.quantity;
    });
    let quantity = document.getElementById('noti');
    quantity.textContent = cartcount;
    quantity.classList.add('bg-danger');
}
window.addEventListener('DOMContentLoaded',quantity);
