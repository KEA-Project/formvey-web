import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

export default App;
