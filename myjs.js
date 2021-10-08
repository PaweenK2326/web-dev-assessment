// CAROUSEL
let slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function moveSlides(n) {
    showSlides(slideIndex += n);
}
//  image controls
function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

// show modal
function showModal() {
    alert('!')
}

// show products
fetch('./products.json')
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => console.log(err));

const productList = document.getElementById('products-container');  
function showData(data){
    productList.innerHTML = '';
    data.product.forEach(product => {
        productList.innerHTML += `
            <div class="product-box">
                <img src="${product.image}" class="product-img" alt="${product.name}">
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-action">
                        <p class="product-price">$${product.price}</p>
                        <button class="button order-button" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" onclick="addToCart(this)">Order</button>
                    </div>                    
                </div>
            </div>
        `;
    });
}

// add to cart
let cart = [];
function addToCart(button) {
    let id = parseInt(button.dataset.id);
    let check = cart.findIndex(product => product.id === id);
    if(check !== -1){
        cart[check].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: button.dataset.name,
            price: button.dataset.price,
            quantity: 1
        });        
    }
    alert('Product\'s added to cart successfully!');
    showCart();
}

// show cart
function showCart() {
    const cartList = document.getElementById('cart-body');
    if(cart.length > 0){
        cartList.innerHTML = '';
        for (let i = 0; i < cart.length; i++) {
            cartList.innerHTML += `
                <div class="cart-info">
                    <h4>${i+1}</h4>
                    <h5 class="product-name cart-name">${cart[i].name}</h5>
                    <p>$${cart[i].price}</p>
                    <p>x${cart[i].quantity}</p>
                    <button class="button delete-button" onclick="deleteProduct(${cart[i].id})">X</button>                    
                </div>
            `;
        }
    } else {
        cartList.innerHTML = '';
        cartList.innerHTML += `<p>There is no item in cart, <span id="shop" onclick="shopNow()">shop now!</span></p>`;
    }
}

// delete from cart
function deleteProduct(id) {
    if(confirm('You want to delete this product?')){
        cart = cart.filter(product => product.id !== id);
        showCart();
    }
}

// toggle modal
const modal = document.getElementById('cart-modal');
function toggleModal() {
    modal.classList.toggle('modal-show');
}
window.addEventListener('mouseup',function(event){
    if(event.target.id === 'cart-modal'){
        modal.classList.toggle('modal-show');
    }
});

// shop now!! just for fun
function shopNow() {
    modal.classList.toggle('modal-show');
    productList.scrollIntoView({behavior: 'smooth'});
}

// go to top button
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}