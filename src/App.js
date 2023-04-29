import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EditProfile from "./pages/EditProfile";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import Main from "./pages/Main";
import FormGPT from "./components/Build/FormGPT";
import Build from "./pages/Build";
import "./App.css";
import ImageUploader from "./components/Build/ImageUploader";
import KakaoRedirectHandler from "./components/login/KakaoRedirectHandler";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/main" element={<Main />} />
        <Route path="/formgpt" element={<FormGPT />} />
        <Route path="/build" element={<Build />} />
        <Route path="/uploader" element={<ImageUploader />} />
        <Route path="/kakao" element={<KakaoRedirectHandler />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

export default App;
