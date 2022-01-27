import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import api from "../../services/index";
  import { IProduct } from "../../types/types";
  
  interface CartProviderProps {
    children: ReactNode;
  }
  
  interface CartProviderData {
    cartToken: string;
    cart: IProduct[];
    cartTotal: number;
    cleanCart: () => void;
    getProductsCart: () => void;
    addProduct: (product: IProduct) => void;
    deleteProduct: (id: number) => void;
    totalSale: (price: number) => void;
    updateTotalSale: (price: number) => void;
  }
  
  const CartContext = createContext<CartProviderData>({} as CartProviderData);
  
  export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<IProduct[]>([] as IProduct[]);
  
    const [cartToken] = useState(
      () => localStorage.getItem("@hambKenzie:token") || ""
    );
  
    const [cartTotal, setCartTotal] = useState(0);
  
    const getProductsCart = () => {
      api
        .get("cart", {
          headers: { Authorization: `Bearer ${cartToken}` },
        })
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getProductsCart();
    }, [cart]);
  
    const addProduct = (product: IProduct) => {
      api
        .post("cart", product, {
          headers: { Authorization: `Bearer ${cartToken}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    };
  
    const deleteProduct = (id: number) => {
      api
        .delete(`cart/${id}`, {
          headers: { Authorization: `Bearer ${cartToken}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    };
  
    const totalSale = (price: number) => {
      const totalPrice = cart.reduce((acc, currentValue) => {
        return acc + currentValue.price;
      }, price);
  
      setCartTotal(totalPrice);
    };
  
    const updateTotalSale = (price: number) => {
      setCartTotal(cartTotal + price);
    };
  
    const cleanCart = () => {
      cart.map((product) => {
        return api
          .delete(`cart/${product.id}`, {
            headers: { Authorization: `Bearer ${cartToken}` },
          })
          .then((_) => {
            setCartTotal(0);
          })
          .catch((error) => console.log(error));
      });
    };
  
    return (
      <CartContext.Provider
        value={{
          cartToken,
          cart,
          cartTotal,
          cleanCart,
          totalSale,
          addProduct,
          deleteProduct,
          getProductsCart,
          updateTotalSale,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => useContext(CartContext);
  