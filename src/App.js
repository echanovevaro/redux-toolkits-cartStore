import { useSelector, useDispatch } from "react-redux"

import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import { useEffect } from "react"

import Notification from "./components/UI/Notification"
import { fetchCartData, sendCardData } from "./store/cart-actions"

let initial = true
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)
  console.log("notification", notification)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (initial) {
      initial = false
      return
    }
    if (cart.change) {
      dispatch(sendCardData(cart))
    }
  }, [cart, dispatch])
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App
