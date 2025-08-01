export let cart = JSON.parse(localStorage.getItem("cart")) ||
  
   [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId :'1'   
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryOptionId : '3'
      }
    ];




export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      matchingItem = cartitem;

    }

  })

  if (matchingItem) {
    matchingItem.quantity += 1;
  }
  else {

    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId : '1'
    });
  }
  saveToStorage();
  console.log(cart);
}
export function removeFromCart(productId) {
  const indexToRemove = cart.findIndex(item => item.productId === productId);
  if (indexToRemove !== -1) {
    cart.splice(indexToRemove, 1); 
    saveToStorage();
  }
}

export function updateDeliveryOption(productId , deliveryOptionId){
  
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
       matchingItem = cartItem;
      }
    })
    matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
