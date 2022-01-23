import Menu from "../../components/Menu";
import ProductsList from "../../components/ProductList";
import { useProducts } from "../../contexts/Products";

const Home = () => {
  const { products } = useProducts();

  return (
    <>
      <Menu />
      <ProductsList products={products} />
    </>
  );
};

export default Home;
