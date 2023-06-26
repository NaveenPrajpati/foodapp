import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLogin:false,
    userData:{},
    
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
        }
    }
})

export const {setLogin,setUserData}=userSlice.actions
export default userSlice.reducer