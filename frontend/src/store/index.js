import { configureStore } from "@reduxjs/toolkit";
import users from './slices/users'
import auth from './slices/auth'
import product from './slices/product'

export default configureStore({
  reducer: {
    moduleUser: users,
    moduleAuth: auth,
    moduleProduct: product,
  }
})
