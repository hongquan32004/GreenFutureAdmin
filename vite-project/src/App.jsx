import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Alerts from "./page/alerts";
import React, { useEffect } from "react";
import "./App.css";
import MainLayout from "./components/layout-main";
import Dashboard from "./page/dashboard";
import Login from "./page/login";
import FormLayouts from "./page/form/form";
import DefaultTable from "./page/general-tables/tables";
import DataTables from "./page/data-tables/data";
import LineChartComponent from "./page/charts/charts";
import RegisterPage from "./page/rigester/rigester";
import NotFoundPage from "./page/error404/error404";
import AccordionComponent from "./page/accordion";
import BadgesComponent from "./page/gadges";
// Import CSS Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Import JS Bootstrap (cần cho các component tương tác)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Car from "./page/car";
import ListCar from "./page/list-car";
import RentalOrder from "./page/rental-orders";
import Insurance from "./page/insurance";
import Promotions from "./page/promotion";
import ListCarAll from "./page/list-car-all";
import UpdateCarModel from "./page/update-car-model";
import AddInsurance from "./page/add-insurance";
import UpdateInsurance from "./page/update-insurance";
import AddCarModel from "./page/add-car-model";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const initialPath = location.pathname;
    if (!accessToken && initialPath !== "/login") {
      navigate("/login", { replace: true });
    } else if (accessToken && initialPath === "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pages-error-404.html" element={<NotFoundPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/index.html" element={<Dashboard />} />
          <Route path="/components-alerts.html" element={<Alerts />} />
          <Route path="/forms-layouts.html" element={<FormLayouts />} />
          <Route path="/tables-general.html" element={<DefaultTable />} />
          <Route path="/tables-data.html" element={<DataTables />} />
          <Route path="/charts-chartjs.html" element={<LineChartComponent />} />
          <Route path="/car" element={<Car />} />
          <Route path="/list-car/:id" element={<ListCar />} />
          <Route path="/rental-order" element={<RentalOrder />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/list-car-all" element={<ListCarAll />} />
          <Route path="/update-car-model/:id" element={<UpdateCarModel />} />
          <Route path="/add-insurance" element={<AddInsurance />} />
          <Route path="/update-insurance/:id" element={<UpdateInsurance />} />
          <Route path="/add-car-model" element={<AddCarModel />} />
          <Route
            path="/components-accordion.html"
            element={<AccordionComponent />}
          />
          <Route path="/components-badges.html" element={<BadgesComponent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
