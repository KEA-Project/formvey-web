import React, { useRef, useEffect } from "react";
import Header from "../components/common/Header";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";
import Section3 from "../components/landing/Section3";
import Section4 from "../components/landing/Section4";
import Section5 from "../components/landing/Section5";
import Section6 from "../components/landing/Section6";

import { useInView } from "react-intersection-observer";
//import styled from "@emotion/styled";

function Landing() {
  return (
    <div>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  );
}

export default Landing;
