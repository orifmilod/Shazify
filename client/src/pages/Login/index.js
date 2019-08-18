import React from "react";
import styled from "styled-components";
import Grid from "../../styled/Grid";
import GithubCorner from "react-github-corner";

const Header = styled.h1`
  padding-top: 200px;
  margin: 0;
  color: white;
  font-size: 60px;
`;

const Title = styled.p`
  font-size: 25px;
  margin: 0;
  color: white;
`;

const LoginButton = styled.a`
  color: #444444;
  margin: auto;
  border-radius: 100px;
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
  position: absolute;
  bottom: 0;
  right: 10px;
`;

const Home = props => {
  const { history } = props;
  if (localStorage.getItem("accessToken") !== null) history.push("/home");
  return (
    <Grid className="gradDynamic" direction="row" height="100vh">
      <Grid height="450px">
        <Header>Welcome to iSpotify</Header>
        <Title>Search, Choose, Listen.</Title>
        <LoginButton
          href="https://ispotify.herokuapp.com/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          LOGIN
        </LoginButton>
        <GithubCorner
          href="https://github.com/milad440550/iSpotify"
          target="_blank"
          rel="noopener noreferrer"
          bannerColor="#000000"
          octoColor="#ffffff"
        />
      </Grid>
      <Information>
        You can only login using Spotify account.
        <i className="fab fa-spotify" />
      </Information>
    </Grid>
  );
};

export default Home;
