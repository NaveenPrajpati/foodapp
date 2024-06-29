import { createSlice } from "@reduxjs/toolkit";

let initialState={
    isSearch:false,
    searchParam:'',
    openDrawer:false,
    menu:false

}

export const navbarSlice=createSlice({
name:'navSlice',
initialState,
reducers:{
    setIsSearch(state,action){
        state.isSearch=action.payload
    },
    setSearchParam(state,action){
        state.searchParam=action.payload
    },
    setdrawer(state,action){
        state.openDrawer=action.payload
    },
    
}

})
export const {setIsSearch,setSearchParam,setdrawer} =navbarSlice.actions
export default navbarSlice.reducer