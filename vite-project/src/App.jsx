import { Routes, Route} from 'react-router-dom';
import Alerts from './page/alerts';
import React from 'react';
import './App.css';
import MainLayout from './components/layout-main';
import Dashboard from './page/dashboard';
import Login from './page/login';
import FormLayouts from './page/form/form';
import DefaultTable from './page/general-tables/tables';
import DataTables from './page/data-tables/data';
import LineChartComponent from './page/charts/charts';
import RegisterPage from './page/rigester/rigester';
import NotFoundPage from './page/error404/error404';
import AccordionComponent from './page/accordion';
import BadgesComponent from './page/gadges';
// Import CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Import JS Bootstrap (cần cho các component tương tác)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <div className="app">
      <Routes>        
        <Route path="/pages-login.html" element={<Login />} />
        <Route path="/pages-register.html" element={<RegisterPage/>} />
        <Route path="/pages-error-404.html" element={<NotFoundPage/>} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/index.html" element={<Dashboard />} />
          <Route path="/components-alerts.html" element={<Alerts />} />
          <Route path="/forms-layouts.html" element={<FormLayouts/>} />
          <Route path="/tables-general.html" element={<DefaultTable/>} />
          <Route path="/tables-data.html" element={<DataTables/>} />
          <Route path="/charts-chartjs.html" element={<LineChartComponent/>} />
          <Route path="/components-accordion.html" element={<AccordionComponent/>} />
          <Route path="/components-badges.html" element={<BadgesComponent/>} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;