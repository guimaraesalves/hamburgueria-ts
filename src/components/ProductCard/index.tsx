import { Button, ButtonGroup, Paper, Typography } from "@material-ui/core";
import { Remove, Add } from "@material-ui/icons";
import { useState } from "react";

import { useAuth } from "../../contexts/Auth";
import { useCart } from "../../contexts/Cart";
import { IProduct } from "../../types/types";

interface ProductCardProps {
  product: IProduct;
  isInTheCart?: boolean;
}

const ProductCard = ({ product, isInTheCart = false }: ProductCardProps) => {
  const { image, name, category, price, id } = product;
  const { addProduct, deleteProduct, totalSale, updateTotalSale } = useCart();
  const { userId } = useAuth();

  const [count, setCount] = useState(1);

  const handleAddProduct = () => {
    product["userId"] = Number(userId);
    addProduct(product);
    totalSale(price);
  };

  const handleDeleteProduct = () => {
    deleteProduct(id);
    totalSale(-price);
  };

  return (
    <Paper
      elevation={5}
      style={{ width: "300px", height: "370px", margin: "10px" }}
    >
      <img src={image} alt={name} width="200" height="200" />
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="subtitle1">{category}</Typography>
      <Typography variant="h6" color="primary">
        {price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Typography>
      {isInTheCart ? (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteProduct}
          >
            Remover do Carrinho
          </Button>

          <ButtonGroup>
            <Button
              aria-label="reduce"
              onClick={() => {
                setCount(Math.max(count - 1, 1));
                count > 1 && updateTotalSale(-price);
              }}
            >
              <Remove fontSize="small" />
            </Button>
            <span> {count} </span>
            <Button
              aria-label="increase"
              onClick={() => {
                setCount(count + 1);
                updateTotalSale(price);
                console.log(price);
              }}
            >
              <Add fontSize="small" />
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Adicionar no Carrinho
        </Button>
      )}
    </Paper>
  );
};

export default ProductCard;