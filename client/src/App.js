import React from 'react';
import './App.css';
import queryString from 'query-string';
import Profile from './components/Profile';
import Search from './components/Search';
import Login from './pages/Login';

class App extends React.Component {
  state = {
    userData: {},
  };

  getAccessToken = () => {
    const hash = queryString.parse(window.location.hash);
    return hash.access_token;
  };

  componentDidMount() {
    const access_token = this.getAccessToken();
    if (access_token) this.getUserData();
  }

  getUserData = e => {
    const hash = queryString.parse(window.location.hash);
    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${hash.access_token}` },
    })
      .then(data => data.json())
      .then(userData => this.setState({ userData }))
      .catch(err => console.error(err));
  };

  render() {
    const { userData } = this.state;
    
    return (
      <div className="App">
        {Object.keys(userData).length > 0 ? (
          <div className="row">
            <div className="col-3 bg-success vh-100 text-left">
              <Profile userData={userData} />
            </div>

            <div className="col-6 bg-light scroll-able">
              <Search />
            </div>
          </div>
        ) : (
          <Login getUserData={this.getUserData} />
        )}
      </div>
    );
  }
}
export default App;
