import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slider/counterSlice'; // Giả sử bạn có counterSlice
import userReducer from './slider/userSlice'; // Giả sử bạn có userSlice

// Combine các reducers của bạn
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});

export default rootReducer;