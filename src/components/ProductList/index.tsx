import { IProduct } from "../../types/types";
import ProductCard from "../ProductCard";

interface ProductsListProps {
  products: IProduct[];
  isInTheCart?: boolean;
}

const ProductsList = ({ products, isInTheCart = false }: ProductsListProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "1280px",
        margin: "20px",
      }}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} isInTheCart={isInTheCart} />
      ))}
    </div>
  );
};

export default ProductsList;
