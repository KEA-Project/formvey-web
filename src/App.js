import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EditProfile from "./pages/EditProfile";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import Main from "./pages/Main";
import "./App.css";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

export default App;
