import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Header: FunctionComponent = () => {
  return (
    <Head>
      <TitleWrapper>
        <Title>Dynamic Table</Title>
      </TitleWrapper>
    </Head>
  );
};

export default Header;

const Head = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 42px;
  font-family: "Mukta", sans-serif;
  color: #72b6b2;
  font-weight: 500;
`;
