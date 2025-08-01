import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.getPrice()}
            </div>
          </div>

          <div class="product-price">
          $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container js-quantityContainer">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id  ="${product.id}" >
            Add to Cart
          </button>
        </div>`;
})

document.querySelector(".products-section").innerHTML = productsHTML;

function updateCartQuantity() {
  let totalCartQuantity = 0;

  cart.forEach((cartitem) => {
    totalCartQuantity += cartitem.quantity;
    console.log(` total cart quantity ${totalCartQuantity}`);

  })
  document.querySelector(".js-cart-quantity").innerHTML = totalCartQuantity;

}

document.querySelectorAll(".js-add-to-cart")
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productContainer = button.closest('.product-container');
      const quantity = Number(productContainer.querySelector('select').value);



      addToCart(productId, quantity);
      updateCartQuantity();
    });

  });


