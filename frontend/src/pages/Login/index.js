import React, { useEffect } from "react";
import styled from "styled-components";
import GithubCorner from "react-github-corner";
import { withRouter } from 'react-router-dom';
import { Grid } from '../../styled';
import getAccessToken from "../../utils/getAccessToken";

const Header = styled.h1`
  margin: 0;
  color: white;
  font-size: 60px;

  @media only screen and (max-width: 600px) {
    font-size: 45px;
  }
`;

const Title = styled.p`
  font-size: 25px;
  margin: 0;
  color: white;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const LoginButton = styled.a`
  color: gray;
  border: none;
  color: #444444;
  margin: 10px auto;
  padding: 15px 50px;
  border-radius: 100px;
  display: inline-block;
  background: linear-gradient(to top, #78ffd6, #a8ff78);
  
  :hover {
    color: #444444;
    text-decoration: none;
  }
  :focus,:active {
    outline:0;
  }
`;

const Information = styled.p`
  color: white;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 10px;
  font-size:16px;
`;

const Container = styled(Grid)` 
  padding-top: 300px;
  grid-auto-flow: row;
  height: 100vh;
`;

function Home({ history }) {
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken)
      history.push('/home');
  }, [history]);


  const LOGIN_URI = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://shazify.herokuapp.com/login';


  return (
    <Container className='gradDynamic'>
      <div>
        <Header>Welcome to Shazify</Header>
        <Title>Search, Choose, Listen.</Title>
        <LoginButton href={LOGIN_URI}>
          LOGIN
        </LoginButton>
        <GithubCorner
          href="https://github.com/orifmilod/iSpotify"
          target="_blank"
          rel="noopener noreferrer"
          bannerColor="#000000"
          octoColor="#ffffff"
        />
      </div>
      <Information>
        made by {' '}
        <a
          target='_blank'
          rel="noopener noreferrer"
          href='https://iammilod.com'
        >
          orif milod
        </a>
        <br />
        You can only login using Spotify account. <i className="fab fa-spotify" />
      </Information>
    </Container>
  );
}

export default withRouter(Home);