import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo : localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

    userAccountType: localStorage.getItem('userAccountType'),
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const userAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            //using state you can know the initialstate and using action you can send some data
            // const users = {
            //     id :  nanoid(),
            //     text: action.payload,
            // } 
            // state.userInfo.push(users);
            console.log("action payload => ", action.payload);
            state.userInfo = action.payload?.user ? action.payload.user: action.payload;
            console.log("userinfo => ", state.userInfo, state.userInfo?.accountType);

            state.userAccountType = state.userInfo?.accountType;
            console.log("userAccountType=> ",state.userAccountType);

            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            localStorage.setItem('userAccountType', JSON.stringify(state.userAccountType));
        },

        setToken(state, value) {
            state.token = value.payload;
        },
       
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        //This removeUsers is only for syntax and testing here
        // removeUsers: (state, action) => {
        //     state.userInfo = state.userInfo.filter( (user) => 
        //     user.id !== action.payload )
        // }
    }
})

//export reducers functions -> when we using dispatch we can get this individual reducers from the slice
export const { setCredentials,setToken, logout } = userAuthSlice.actions;

//export entire slice, this needs to wired up to the store
export default userAuthSlice.reducer;


