function Cart(localStorageKey){
    
    const cart = {
        cartItems: undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ||
                [
                    {
                        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        quantity: 1,
                        deliveryOptionId: '1'
                    },
                    {
                        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        quantity: 2,
                        deliveryOptionId: '3'
                    }
                ];
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        addToCart(productId) {
            let matchingItem;
            this.cartItems.forEach((cartitem) => {
                if (productId === cartitem.productId) {
                    matchingItem = cartitem;
                }
    
            })
    
            if (matchingItem) {
                matchingItem.quantity += 1;
            }
            else {
    
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
            this.saveToStorage();   
        },
        
        removeFromCart(productId) {
          const indexToRemove = this.cartItems.findIndex(item => item.productId === productId);
          if (indexToRemove !== -1) {
            this.cartItems.splice(indexToRemove, 1); 
            this.saveToStorage();
          }
        },
        updateDeliveryOption(productId , deliveryOptionId){
          
          let matchingItem;
          this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
               matchingItem = cartItem;
              }
            })
            matchingItem.deliveryOptionId = deliveryOptionId;
          this.saveToStorage();
        }
    };
    return cart;
}

const cart =  Cart('cart-oop');
const BuisnessCart  =  Cart('Buisness-cart');
cart.loadFromStorage();
BuisnessCart.loadFromStorage();
BuisnessCart.addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9');
console.log(cart);
console.log(BuisnessCart);
