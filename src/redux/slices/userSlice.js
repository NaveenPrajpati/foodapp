import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLogin:false,
    userData:{},
    deliveryAddress:''
    
}

export const userSlice=createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setLogin(state,action){
            state.isLogin=action.payload
        },
        setUserData(state,action){
            state.userData=action.payload
        },
        setDeliveryAdd(state,action){
            state.deliveryAddress=action.payload
        }
    }
})

export const {setLogin,setUserData,setDeliveryAdd}=userSlice.actions
export default userSlice.reducer