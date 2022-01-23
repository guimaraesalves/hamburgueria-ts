import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, TextField, Paper, Typography } from "@material-ui/core";
import {
  Person,
  VisibilityOutlined,
  VisibilityOffOutlined,
  EmailOutlined,
} from "@material-ui/icons";

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { IUserDataSignUp } from "../../types/types";

const SignUp = () => {
  const history = useHistory();
  const { SignUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório*"),
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Informe um Email válido"),
    password: yup
      .string()
      .required("Senha obrigatório")
      .min(6, "Mínimo 6 caracteres"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Confirmação de senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserDataSignUp>({ resolver: yupResolver(formSchema) });

  const onSubmit = (data: IUserDataSignUp) => {
    SignUp(data, history);
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <div>
        <Typography variant="h5">CADASTRO</Typography>
        <Typography variant="subtitle2">
          <Link to="/">Retornar para o Login</Link>
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            type="text"
            size="small"
            label="Nome"
            margin="normal"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{
              endAdornment: <Person />,
            }}
          />
        </div>
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
          <TextField
            type={!showPassword ? "password" : "text"}
            size="small"
            label="Confirmar Senha"
            margin="normal"
            variant="outlined"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
            color="default"
            variant="contained"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default SignUp;
