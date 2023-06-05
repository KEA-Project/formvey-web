import React, { useEffect } from "react";
import qs from "qs";
import axios from "axios";

function KakaoRedirectHandler() {
  let code = new URL(window.location.href).searchParams.get("code"); //인가코드

  //폼베이 서버 카카오 로그인 처리
  const kakaoLogin = async (accessToken) => {
    //console.log(accessToken);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL_MEMBER}/kakao/${accessToken}`
    );

    console.log(response.data);
    console.log(response.data.isSuccess);
  };

  //엑세스 토큰 발급 받기
  const getToken = async () => {
    //console.log(code);
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT,
      code: code,
    });

    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      payload
    );

    console.log(response.data.access_token);
    kakaoLogin(response.data.access_token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
}

export default KakaoRedirectHandler;
