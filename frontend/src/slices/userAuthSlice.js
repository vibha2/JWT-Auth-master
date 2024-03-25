import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    userInfo : localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
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
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
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
export const { setCredentials, logout } = userAuthSlice.actions;

//export entire slice, this needs to wired up to the store
export default userAuthSlice.reducer;


