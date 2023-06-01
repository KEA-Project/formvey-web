/**여러 컴포넌트에서 사용하는 함수들 (api 요청 등..) */
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LogOut() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/logout/${localStorage.getItem(
        "memberId"
      )}`,
      {},
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response);

    if (response.data.isSuccess) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("memberId");

      navigate("/");
    } else {
      alert(response.data.message);
    }
  };

  logoutHandler();
}

//설문 정보 가져오기 api
export function fetchSurveyInfo(surveyId) {
  const fetch = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/surveys/info/${surveyId}`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      return alert(response.data.message);
    }
  };

  return fetch();
}

//설문 응답 조회 api
export function fetchResponseInfo(responseId) {
  const fetch = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/responses/info/${responseId}`
    );

    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      return alert(response.data.message);
    }
  };

  return fetch();
}

//설문 응답자 리스트 조회
export function getSurveyResponseList(surveyId, currentPage) {
  const fetch = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/responses/Individual/${surveyId}?page=${currentPage}&size=10`
    );

    return response;
  };

  return fetch();
}

//현재 날짜 가져오기
export function getToday() {
  var date = new Date();

  return date.toISOString();
}

//이미지 파일 스토리지 업로드
export function uploadImageToStorage(formData) {
  const upload = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/images/upload`,
      formData
    );

    return response;
  };

  return upload();
}
