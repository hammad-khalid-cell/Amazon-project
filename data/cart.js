export const cart  = [];   


export function addToCart(producdId){
  let matchingItem ;
 cart.forEach((cartitem)=>{
      if(producdId === cartitem.producdId){
        matchingItem = cartitem;
      }
      
    })

    if(matchingItem){
      matchingItem.quantity += 1;
    }
    else{

      cart.push({
        producdId : producdId,
        quantity :1 ,
      });
    }
    console.log(cart);
}