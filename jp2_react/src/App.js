import React, { useState } from "react";
import {
  //HashRouter as Router,
  Routes,
  Route,
  //useParams
} from "react-router-dom";
//import Login from "./components/Global/Login/Login";
import LoginButton from "./components/Global/Login/LoginButton"
import LogoutButton from "./components/Global/Login/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Typography, IconButton, Link } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm"; //umožňuje přidat potvrzovací okna
import logo from "../src/assets/JP_logo_black.png"

import "./";
//import "./style.css";
// import Header from "./components/Header";
import ListMaterialPage from "./pages/ListMaterialPage";
import MaterialPage from "./pages/MaterialPage";
import StockPage from "./pages/StockPage";
import TestPage_old from "./pages/TestPage_old";
import { TestPage } from "./pages/TestPage";
import ListProductPage from "./pages/ListProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SalesStatisticPage from "./pages/SalesStatisticPage";

import NavbarJP from "./components/Navbar/Navbar";
import AddItemForm from "./components/Material/AddItemForm";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ListTransactionPage from "./pages/ListTransactionPage";
import SalePage from "./pages/SalePage";
import SaleDetailPage from "./pages/SaleDetailPage";

function App() {

  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

const { isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return (
      <div>
        {" "}
        <NavbarJP />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        <img src={logo} width="270" height="65" alt="Logo" />
        <Typography variant="h4" color="primary" sx={{ mt: 2, mb: 2 }}>
          Pro pokračování se prosím přihlašte
        </Typography>
        <LoginButton />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && (
        <ConfirmProvider>
          {/* <Router> */}
          {/* <main className="py-3"> */}
          <Container>
            <NavbarJP />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/material" element={<ListMaterialPage />}></Route>
              <Route path="/testpage" element={<TestPage />}></Route>
              <Route path="/testpage2" element={<TestPage_old />}></Route>
              <Route
                path="/material/:materialId"
                element={<MaterialPage />}
              ></Route>
              <Route path="/stock" element={<StockPage />}></Route>
              <Route path="/product" element={<ListProductPage />}></Route>
              <Route
                path="/product_detail/:productId"
                element={<ProductDetailPage />}
              ></Route>
              <Route
                path="/transaction"
                element={<ListTransactionPage />}
              ></Route>
              <Route
                path="/sales_statistic"
                element={<SalesStatisticPage />}
              ></Route>
              <Route path="/sale" element={<SalePage />}></Route>
              <Route
                path="/sale_detail/:saleId"
                element={<SaleDetailPage />}
              ></Route>
            </Routes>
          </Container>
          {/* </main> */}

          <Footer />
          {/* </Router> */}
        </ConfirmProvider>
      )}{" "}
    </>
  );
}

export default App;
