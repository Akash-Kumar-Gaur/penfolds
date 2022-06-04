import { useEffect, useState } from "react";

function useCart() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cartStored = window.localStorage.getItem("userCart") || "";
    if (cartStored.length) {
      setCart(JSON.parse(cartStored));
    }
  });

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
    window.localStorage.setItem("userCart", JSON.stringify(cartObj));
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
    window.localStorage.setItem("userCart", JSON.stringify(cartObj));
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
