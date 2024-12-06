
console.log("Oi")
const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("close-cart");


cartIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}

document.addEventListener("click", (e) => {
    if (!cart.contains(e.target) && !cartIcon.contains(e.target)) {
        cart.classList.remove("active");
    }
});


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    const removeCartProductButtons = document.getElementsByClassName("cart-remove")
    for (var i = 0; i < removeCartProductButtons.length; i++) {
      removeCartProductButtons[i].addEventListener("click", removeProduct)
    }
}

const quantityInputs = document.getElementsByClassName("number-input")
for (var i = 0; i < quantityInputs.length; i++) {
  quantityInputs[i].addEventListener("change", checkIfInputIsNull)
}