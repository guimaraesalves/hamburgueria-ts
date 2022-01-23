import {
    AppBar,
    Badge,
    Box,
    IconButton,
    MenuItem,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  
  import { ShoppingCart, ExitToApp } from "@material-ui/icons";
  import { useHistory } from "react-router-dom";
  import { useAuth } from "../../contexts/Auth";
  import { useCart } from "../../contexts/Cart";
  
  const Menu = () => {
    const history = useHistory();
    const { Logout } = useAuth();
    const { cart } = useCart();
  
    const length = cart.length;
  
    const sendTo = (path: any) => {
      history.push(path);
    };
  
    return (
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Burguer Kenzie</Typography>
          </Box>
  
          <Box style={{ display: "flex" }}>
            <MenuItem onClick={() => sendTo("/home")}>Home</MenuItem>
  
            <IconButton color="inherit" onClick={() => sendTo("/cart")}>
              <Badge badgeContent={length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
  
            <IconButton color="inherit" onClick={() => Logout(history)}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Menu;
  