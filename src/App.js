import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

export default App;
