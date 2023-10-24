import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible
    },
    showNotifications(state, action) {
      state.notification = {
        status: action.payload.status,
        tittle: action.payload.tittle,
        message: action.payload.message,
      }
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
