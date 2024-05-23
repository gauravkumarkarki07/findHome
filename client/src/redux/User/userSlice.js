import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    success:null,
    error:null,
    session:null
}

const  userSlice=createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        loading:(state)=>{
            state.loading=true;
        },
        loginSuccess:(state,action)=>{
            state.loading=false;
            state.success=action.payload;
            state.error=null;
            state.session=action.payload;
        },
        loginFailure:(state,action)=>{
            state.loading=false;
            state.success=null;
            state.error=action.payload;
        },
        logoutSuccess:(state,action)=>{
            state.loading=false;
            state.success=action.payload;
            state.error=null;
            state.session=null;
        },
        logoutFailure:(state,action)=>{
            state.loading=false;
            state.success=null;
            state.error=action.payload;
        }
        
    }
})

export const{loading,loginSuccess,loginFailure,logoutSuccess,logoutFailure}=userSlice.actions;
export default userSlice.reducer;