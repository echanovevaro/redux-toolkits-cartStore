import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://project-785050841979524602-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      )
      if (!response.ok) {
        throw new Error("Could not fetch card data")
      }
      const data = await response.json()
      return data
    }
    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCartData({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      )
    } catch (err) {
      dispatch(
        uiActions.showNotifications({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      )
    }
  }
}

export const sendCardData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotifications({
        status: "pending...",
        title: "sending...",
        message: "sending cart data",
      })
    )
    const sendRequest = async () => {
      const response = await fetch(
        "https://project-785050841979524602-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      )
      if (!response.ok) {
        throw new Error("sending cart data failed")
      }
    }

    try {
      await sendRequest()
      dispatch(
        uiActions.showNotifications({
          status: "success",
          title: "Success!",
          message: "send card data successfully",
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotifications({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      )
    }
  }
}
