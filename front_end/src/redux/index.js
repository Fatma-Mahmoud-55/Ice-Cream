import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlideReducer from "./productSlide";

export const store = configureStore({
    reducer: {
        user: userSlice,
        product: productSlideReducer

    },
});





