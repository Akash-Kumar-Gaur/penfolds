import { useEffect, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";

function useCart() {
  const [cart, setCart] = useState({});
  const [orderToken, setOrderToken] = useState("");

  const db = getFirestore();
  useEffect(() => {
    const cartStored = window.localStorage.getItem("userCart") || "";
    if (cartStored.length) {
      setCart(JSON.parse(cartStored));
    }
  }, []);

  const addToCart = (item) => {
    setOrderToken("");
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

  const token = () => {
    const tok = Math.random(new Date().getTime()).toString(36).substr(2);
    setOrderToken(tok);
    return tok;
  };

  const placeOrder = async ({ successCallback = () => {} }) => {
    const newToken = token();
    await setDoc(doc(db, "orders", newToken), cart).then(() => {
      window.localStorage.removeItem("userCart");
      successCallback(newToken);
    });
  };

  return {
    removeFromCart,
    addToCart,
    cart,
    isCartEmpty,
    placeOrder,
  };
}

export default useCart;
