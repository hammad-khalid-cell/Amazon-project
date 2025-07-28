import { removeFromCart, cart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM, D'))

export function renderOrderSummary(){

  let cartHTML = '';
  cart.forEach((cartItem) => {
  
    console.log(cartItem);
  
    const productId = cartItem.productId;
  
  
    const matchingItem = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
     
  
    const deliveryOption  = getDeliveryOption(deliveryOptionId);
    console.log(deliveryOption);
  
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  
    const dateString = deliveryDate.format('dddd, MMMM, D');
  
    cartHTML += ` <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                      <div class="delivery-date">
                        Delivery date: ${dateString}
                      </div>
          
                      <div class="cart-item-details-grid">
                        <img class="product-image"
                          src="${matchingItem.image}">
          
                        <div class="cart-item-details">
                          <div class="product-name">
                            ${matchingItem.name}
                          </div>
                          <div class="product-price">
                            $${formatCurrency(matchingItem.priceCents)}
                          </div>
                          <div class="product-quantity">
                            <span>
                              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                              Update
                            </span>
                            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingItem.id}">
                              Delete
                            </span>
                          </div>
                        </div>
          
                        <div class="delivery-options">    
                          <div class="delivery-options-title">
                            Choose a delivery option:
                          </div>
                          ${deliveryOptionsHTML(matchingItem, cartItem)}
                        </div>
                      </div>
                    </div>`
  
  
  });
  
  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM, D');
      const priceString = deliveryOption.priceCents
        === 0 ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} - `;
  
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
  
      html += `<div class="delivery-option js-delivery-option"
      data-delivery-option-id = "${deliveryOption.id}"
      data-product-id = "${matchingItem.id}">
                            <input type="radio" ${isChecked ? 'checked' : ''}
                              class="delivery-option-input"
                              name="delivery-option-${matchingItem.id}">
                            <div>
                              <div class="delivery-option-date">
                                ${dateString}
                              </div>
                              <div class="delivery-option-price">
                                ${priceString} shipping
                              </div>
                            </div>
                          </div>`
  
    });
    return html;
  }
  
  document.querySelector(".js-order-summary").innerHTML = cartHTML;
  document.querySelector(".return-to-home-link").textContent = `${cart.length} items`;
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{
      const {productId, deliveryOptionId}  = element.dataset;
      console.log(`this is the delivery option${deliveryOptionId}`);
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  })
  
  
  document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
      link.addEventListener("click", () => {
  
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        document.querySelector(".return-to-home-link").textContent = `${cart.length} items`;
  
      })
    })
}
