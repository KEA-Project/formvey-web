import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

export default App;
