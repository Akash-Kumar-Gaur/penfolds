import { useState } from "react";

function useCart() {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    let cartObj = {};
    if (cart[item]) {
      cartObj = {
        ...cart,
        [item]: cart[item] + 1,
      };
    } else {
      cartObj = {
        ...cart,
        [item]: 1,
      };
    }
    setCart(cartObj);
  };

  const removeFromCart = (item) => {
    let cartObj = {};
    if (cart[item]) {
      cartObj = {
        ...cart,
        [item]: cart[item] - 1,
      };
    } else {
      cartObj = {
        ...cart,
        [item]: 0,
      };
    }
    setCart(cartObj);
  };

  const isCartEmpty = !(
    Object.keys(cart).length &&
    Object.values(cart).reduce((cur, sum) => sum + cur)
  );

  return {
    removeFromCart,
    addToCart,
    cart,
    isCartEmpty,
  };
}

export default useCart;