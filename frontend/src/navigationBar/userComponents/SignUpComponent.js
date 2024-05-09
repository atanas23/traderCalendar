import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { emailValidatorRegex, userNameValidatorRegex } from "../../constants";

const SignUpComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const errMsg = await response.json().then((data) => data);

      if (response.status === 201) {
        alert(errMsg.message);
        navigate("/");
        return;
      }
      if (response.status === 400) {
        throw new Error(errMsg.message);
      }
      if (response.status === 500) {
        throw new Error(errMsg.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        mt: "10rem",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <FormControl>
        <TextField
          required
          id="user-name-field"
          variant="standard"
          label="username"
          sx={{ margin: 2, width: "25vw" }}
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: userNameValidatorRegex,
              message: "Please enter a valid username",
            },
          })}
        />
        {errors.userName && (
          <FormHelperText error sx={{ m: 0, pt: 0, border: 0 }}>
            {errors.userName.message}
          </FormHelperText>
        )}

        <TextField
          required
          id="email-field"
          variant="standard"
          label="email"
          sx={{ m: 2, width: "25vw" }}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: emailValidatorRegex,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <FormHelperText error sx={{ m: 0, pt: 0, border: 0 }}>
            {errors.email.message}
          </FormHelperText>
        )}

        <TextField
          required
          id="password-field"
          variant="standard"
          label="password"
          sx={{ margin: 2, width: "25vw" }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <FormHelperText error sx={{ m: 0, pt: 0, border: 0 }}>
            {errors.password.message}
          </FormHelperText>
        )}

        <Button
          type="submit"
          variant="outlined"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
        <Box justifyContent="flex-end">
          <Link
            href="/signin"
            underline="hover"
            sx={{ display: "block", textAlign: "end", mt: 1 }}
          >
            Already have an account? Sign in
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SignUpComponent;
