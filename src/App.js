import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CarSectionPage from "./pages/CarSectionPage";
import CustomerSectionPage from "./pages/CustomerSectionPage";
import RentalsPage from "./pages/RentalsPage";
import Layout from "./pages/Layout";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home/:username" element={<HomePage />}>
              <Route path="profile" element={<ProfilePage />}/>
              <Route path="dashboard" element={<DashboardPage />}/>
              <Route path="rentals" element={<RentalsPage />}/>
              <Route path="carSection" element={<CarSectionPage />}/>
              <Route path="customerSection" element={<CustomerSectionPage />}/>
            </Route>
          </Route>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;