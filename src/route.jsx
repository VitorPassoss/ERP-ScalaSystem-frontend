import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, Global } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import Login from "./pages/auth/Login";
import Stock from "./pages/stock/Stock";
import TableStock from "./components/TableStock";
import Product from "./pages/products/Product";
import ProtectedRoutes from "./Interceptor";


const theme = createTheme({
  palette: {
    primary: {
      main: "#6425FE",
    },
    secondary: {
      main: "#1de9b6",
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
});

const PathRouter = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            body: {
              margin: 0,
              padding: 0,
              backgroundColor:"#F7F6F9",
            },
          }}
        />
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={
              <ProtectedRoutes>
                  <Stock />
              </ProtectedRoutes>
            } />
            <Route exact path="/products" element={
              <ProtectedRoutes>
                  <Product />
              </ProtectedRoutes>

                  } />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default PathRouter;