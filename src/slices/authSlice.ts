import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'account',
    initialState: {
        current: {
            currentUser:{
                AccessToken:null,
                RefreshToken: null,
                username:null,
            },
            isFetching: false,
            error:false,
        },
    },
    reducers: {
        loginStart:(state) =>{
            state.current.isFetching = true
        },
        loginSuccess:(state, action) =>{
            state.current.currentUser.AccessToken = action.payload.AccessToken
            state.current.currentUser.RefreshToken = action.payload.RefreshToken
            state.current.currentUser.username = action.payload.username
            state.current.isFetching = false
        },
        loginError:(state, action) =>{
            state.current.error = true
            state.current.isFetching = false
        },
        logoutStart:(state) =>{
            state.current.isFetching = true
        },
        logoutSuccess:(state, action) =>{
            state.current.error = false
            state.current.currentUser.AccessToken = null
            state.current.currentUser.RefreshToken = null
            state.current.currentUser.username = null
            state.current.isFetching = false
        },
        refreshTokenSuccess:(state, action) =>{
            state.current.currentUser.AccessToken = action.payload
        }
    },
})
export const {
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    refreshTokenSuccess
} = authSlice.actions
export default authSlice.reducer;
