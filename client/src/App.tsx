import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import Images from "./features/image/Images";
import Friends from "./pages/Friends";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/Settings";
import Watch from "./pages/Watch";
import "./styles/global.scss";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";
import ProfileLayout from "./ui/ProfileLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/profile/:username?" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="photos" element={<Images />} />
            </Route>
            <Route path="/settings" element={<ChangePassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f9fafb",
            color: "#374151",
          },
        }}
      />
    </DarkModeProvider>
  );
}

export default App;
