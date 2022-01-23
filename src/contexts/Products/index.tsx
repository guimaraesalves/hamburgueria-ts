import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import api from "../../services";
  import { IProduct } from "../../types/types";
  
  interface ProductsProviderProps {
    children: ReactNode;
  }
  
  interface ProductsProviderData {
    products: IProduct[];
    getProducts: () => void;
  }
  
  const ProductsContext = createContext<ProductsProviderData>(
    {} as ProductsProviderData
  );
  
  export const ProductsProvider = ({ children }: ProductsProviderProps) => {
    const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);
  
    const getProducts = () => {
      api
        .get("products")
        .then((response) => {
          setProducts([...products, ...response.data]);
        })
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getProducts();
    }, []);
  
    return (
      <ProductsContext.Provider value={{ getProducts, products }}>
        {children}
      </ProductsContext.Provider>
    );
  };
  
  export const useProducts = () => useContext(ProductsContext);
  