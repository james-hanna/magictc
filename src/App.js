import Navbar from "./components/Navbar";
import TitleBar from "./components/TitleBar";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./contexts/AuthContexts";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Editprofile from "./components/Editprofile";
import Signup from "./components/Signup";
import LoginPage from "./components/LoginPage";
import Forgotpassword from "./components/Forgotpassword";

function App() {
  return (
    <AuthProvider>
      <div>
        <TitleBar />
        <div className="flex">
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/editprofile"
              element={
                <PrivateRoute>
                  <Editprofile />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
