import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Restaurant from "./pages/Restaurant";
import Add from "./pages/Add";
import Search from "./pages/Search";
import Update from "./pages/Update";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Restaurant />} />
          <Route path="/add" element={<Add />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/update/:restaurantId" element={<Update />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
