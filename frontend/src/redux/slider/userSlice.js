// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    player: {},
    user: {},
    accset_Token: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.user = action.payload;
            state.accset_Token = action.payload.accset_Token;
            state.isLoggedIn = true;
        },
        SavePlayer: (state, action) => {
            state.player = { ...state.player, ...action?.payload?.player };
            state.user = { ...state.user, ...action?.payload?.user };
        },
        refreshToken: (state, action) => {
            state.accset_Token = action.payload;
            state.isLoggedIn = true;
        },
        signOut: (state) => {
            state.user = {};
            state.player = {};
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(REHYDRATE, (state, action) => {
        //     if (action.payload && action.payload.user) {
        //         state.user = action.payload.user.user;
        //         state.isLoggedIn = action.payload.user.isLoggedIn;
        //     }
        // });
    },
});

export const { signIn, signOut, SavePlayer, refreshToken } = userSlice.actions;
export default userSlice.reducer;