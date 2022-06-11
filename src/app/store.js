//setup penggunaan redux
import { configureStore } from '@reduxjs/toolkit';

//penggunaan redux membuat state data dari service menjadi global state

import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';


export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer
    },
});