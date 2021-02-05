import React,{ createContext, useContext, useReducer } from "react";

//creating the  cart context...
let CartContext = createContext();

//initial state of cart
export const cartState = {
    cartItems:[]
}

//for cart adding and updating...
export const reducer=(state,action)=>{
    switch(action.type){
        case "add_cart":
        return {cartItems:[...action.data]}
        break;
        case "delete_cart":
        break;
        default:
            return state;
    }
}
//cart context provider 
export const ContextProvider=({cartState,reducer,children})=>{
  return (
    <CartContext.Provider value={useReducer(reducer,cartState)}>
    {children}
</CartContext.Provider>
  )
 
}
//accssing the cart context inside the components..
export const CartContextValue =()=> useContext(CartContext);