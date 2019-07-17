import React from "react";
import styled from "styled-components";

const Header = styled.h1`
  padding-top: 15%;
  color: white;
  font-size: 60px;
`;

const Title = styled.p`
  font-size: 25px;
  color: white;
  margin: 20px;
`;

const LoginButton = styled.a`
  color: #444444;
  border-radius: 25px;
  padding: 15px 50px;
  background: #a8ff78; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #78ffd6,
    #a8ff78
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #78ffd6,
    #a8ff78
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  :hover {
    color: #444444;
    text-decoration: none;
  }
`;

const Information = styled.p`
  color: white;
  position: fixed;
  bottom: 0;
  right: 10px;
`;

const Home = () => (
  <div className="vh-100 vw-100 gradDynamic text-center">
    <Header>Welcome to iSpotify</Header>
    <Title>Search, Choose, Listen.</Title>
    <LoginButton href="http://localhost:8888/login">LOGIN</LoginButton>
    <Information>
      You can only login using Spotify account.
      <i className="fab fa-spotify" />
    </Information>
  </div>
);

export default Home;
