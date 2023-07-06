import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

const initialState={
    cartItem:[],
    cartiItemQuantity:[],
    wishItem:[],
    checkoutPrice:{}
}


export const cartSlice=createSlice({
    name:'cartslice',
    initialState,
    reducers:{
        setCartItem(state,action){
            console.log(action.payload)
            state.cartItem.push(action.payload)
        },
        removeCartItem(state,action){
            const newArr=state.cartItem.filter((item)=>item.product.id!=action.payload)
            state.cartItem=newArr
        },
        setWishItem(state,action){
            state.wishItem.push(action.payload)
        },
        removeWishItem(state,action){
            const newArr=state.wishItem.filter((item)=>item.id!=action.payload)
            state.wishItem=newArr
        },
        setCheckOutPrice(state,action){
            state.checkoutPrice=action.payload
        }
    }
})

export const {setCartItem,removeCartItem,setWishItem,setCheckOutPrice,removeWishItem} =cartSlice.actions
export default cartSlice.reducer