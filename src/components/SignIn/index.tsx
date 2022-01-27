import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, TextField, Paper, Typography } from "@material-ui/core";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  EmailOutlined,
} from "@material-ui/icons";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { IUserDataSignIn } from "../../types/types";

const SignIn = () => {
  const history = useHistory();
  const { SignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Informe um Email válido"),
    password: yup
      .string()
      .required("Senha obrigatório")
      .min(6, "Mínimo 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserDataSignIn>({ resolver: yupResolver(formSchema) });

  const onSubmit = (data: IUserDataSignIn) => {
    SignIn(data, history);
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h5">LOGIN</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            type="email"
            size="small"
            label="Email"
            margin="normal"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              endAdornment: <EmailOutlined />,
            }}
          />
        </div>
        <div>
          <TextField
            type={!showPassword ? "password" : "text"}
            size="small"
            label="Senha"
            margin="normal"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: showPassword ? (
                <VisibilityOffOutlined onClick={handleShowPassword} />
              ) : (
                <VisibilityOutlined onClick={handleShowPassword} />
              ),
            }}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
            
          >
            Entrar
          </Button>
        </div>
      </form>
      <div>
        <Typography
          variant="subtitle2"
          style={{ maxWidth: "327px", padding: "10px" }}
        >
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </Typography>
      </div>
      <div>
        <Button
          size="large"
          color="default"
          variant="contained"
          onClick={() => history.push("/register")}
        >
          Cadastrar
        </Button>
      </div>
    </Paper>
  );
};

export default SignIn;
