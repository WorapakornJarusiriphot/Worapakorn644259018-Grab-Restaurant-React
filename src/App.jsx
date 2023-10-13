import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Restaurant from "./pages/Restaurant";
import Add from "./pages/Add";
import Search from "./pages/Search";
import Update from "./pages/Update";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import ProFile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminRoute from "./pages/AdminRoute";
import NotAllow from "./pages/NotAllow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Restaurant />} />
          <Route path="add"element={
              <AdminRoute>
                <Add />
              </AdminRoute>
            } />

          <Route path="search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<ProFile />} />
          <Route path="notallow" element={<NotAllow />} />
          <Route path="update/:restaurantId" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
