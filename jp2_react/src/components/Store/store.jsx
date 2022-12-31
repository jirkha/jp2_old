import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from '@redux-devtools/extension';

import materialSlice from "./Features/Material/materialSlice";
import materialTypeSlice from "./Features/Material/materialTypeSlice";
import storageSlice from "./Features/Material/storageSlice";
import removalSlice from "./Features/Material/removalSlice";

import productTypeSlice from "./Features/Products/productTypeSlice";
import productSlice from "./Features/Products/productSlice";
import saleTypeSlice from "./Features/Products/saleTypeSlice";
import saleSlice from "./Features/Products/saleSlice";
import transactionSlice from "./Features/Products/transactionSlice";


export const store = configureStore({
    reducer: {
        material: materialSlice.reducer,
        materialType: materialTypeSlice.reducer,
        storage: storageSlice.reducer,
        removal: removalSlice.reducer,

        productType: productTypeSlice.reducer,
        product: productSlice.reducer,
        saleType: saleTypeSlice.reducer,
        sale: saleSlice.reducer,
        transaction: transactionSlice.reducer,
    },
})