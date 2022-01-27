import { Button } from "@material-ui/core";
import { useCart } from "../../contexts/Cart";
import { IProduct } from "../../types/types";
import ProductCard from "../ProductCard";

interface CartListProps {
  productsCart: IProduct[];
  isInTheCart?: boolean;
}

const CartList = ({ productsCart, isInTheCart = false }: CartListProps) => {
  const { cartTotal, cleanCart } = useCart();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1280px",
          margin: "20px",
        }}
      >
        {productsCart.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            isInTheCart={isInTheCart}
          />
        ))}
      </div>
      <div>
        <p>
          Preço Total:{" "}
          {cartTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <Button variant="contained" style={{color:"green"}} onClick={cleanCart}>
        Remover Todos
      </Button>
    </>
  );
};

export default CartList;
