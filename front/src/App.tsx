import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageBooking from "./pages/PageBooking";
import PageEdit from "./pages/PageEdit";
import PageHome from "./pages/PageHome";
import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";

function App() {
  const user = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<PageHome />} />
            <Route path="/edit-account" element={<PageEdit />} />
            <Route path="/booking" element={<PageBooking />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
