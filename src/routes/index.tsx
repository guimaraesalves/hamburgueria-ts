import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { Route, Switch} from "react-router-dom";
import { useAuth } from "../contexts/Auth";

interface RouteProps {
  isPrivate?: boolean;
}

const Routes = ({ isPrivate = false }: RouteProps) => {
  const { authToken } = useAuth();

  return (
    <Switch>
      {isPrivate === !!authToken ? (
        <>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </>
      ) : (
        <>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </>
      )}
    </Switch>
  );
};

export default Routes;
