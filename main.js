
const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //remover itens do carrinho
  var reomveCartButtons = document.getElementsByClassName('cart-remove')
  console.log(reomveCartButtons)
  for (var i = 0; i < reomveCartButtons.length; i++){
    var button = reomveCartButtons [i]
    button.addEventListener('click', removeCartItem)
  }

  //mudanças na quantidade

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //add ao carrinho
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();

  //botão de compra
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
//botão de compra
function buyButtonClicked() {
  alert('Obrigada pela sua compra! Volte Sempre :)');
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}



//remover itens do carrinho
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

//mudanças na quantidade
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

//add ao carrinho
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('Você já adicionou esse item ao scarrinho!');
      return;
    }
  }
  var cartBoxContent = `
                        <img width="100px" src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>

                        <i class='bi bi-trash cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

}
//update total
function updatetotal() {  
  var cartContent = document.getElementsByClassName("cart-content")[0];  
  var cartBoxes = cartContent.getElementsByClassName("cart-box");  
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price* quantity;
  }

    //se o valor for com centavos
    total = Math.round(total * 100) / 100;
  
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  
}