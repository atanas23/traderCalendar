import { useState } from "react";
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

const SignInComponent = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const handleClickShowPassword = () => setData((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          variant="standard"
          sx={{ margin: 2, width: "25vw" }}
          id="user-name-field"
          {...register("userName")}
          label="username"
        />

        <TextField
          required
          variant="standard"
          sx={{ margin: 2, width: "25vw" }}
          type={data ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {data ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="password-field"
          {...register("password")}
          label="password"
        />
        {/* <p>{data}</p> */}
        <Button
          onClick={handleSubmit((data) => setData(JSON.stringify(data)))}
          variant="outlined"
        >
          Submit
        </Button>
        <Box justifyContent="flex-end">
          <Link
            href="signup"
            underline="hover"
            sx={{ display: "block", textAlign: "end", mt: 1 }}
          >
            Don't have an account? Sign up
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SignInComponent;
