import React from 'react';
import './App.css';
import queryString from 'query-string';
import Profile from './Profile.js';
import SearchPage from './SearchPage.js';
import Home from './Home.js';
import Playlists from './Playlists.js';
import Player from './common/player.js';

class App extends React.Component 
{
    state = {
        userData: { },
        playlists: []
    }

    getAccessToken = () => {
        let hash = queryString.parse(window.location.hash);
        return hash.access_token;
    }

    componentDidMount()
    {
        let access_token = this.getAccessToken();
        if(access_token)
        {
            this.getUserData();
            this.getUserPlaylist();
        }
    }

    getUserData = () => {
        let access_token = this.getAccessToken();
        fetch('https://api.spotify.com/v1/me', { 
            headers: { 'Authorization': `Bearer ${access_token}` }
        })
        .then(response => response.json())
        .then(userData => this.setState({ userData }))
        .catch(err => console.error(err)) 
    }

    getUserPlaylist = () => {
        let access_token = this.getAccessToken();
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: { 'Authorization': `Bearer ${access_token}` }
        })
        .then(response => response.json())
        .then(playlists => this.setState({ playlists: playlists.items }))
        .catch(err => console.error(err))
    } 

    render() {
        const { userData, playlists } = this.state;
        return (
            <div className="App">
            {   
                Object.keys(userData).length > 0 
                ? 
                    <div className='row'>
                        <div className='col-2 bg-success vh-100 text-left'>
                            <Profile userData={userData}/>
                            {/* <Playlists playlists={playlists}/> */}
                        </div>
                        <div className='col-10'>
                            <div className='col-4 bg-light scroll-able'>
                                <SearchPage handleSearch={this.handleSearch}/>
                            </div>
                            <Player />
                        </div>
                    </div>
                :
                    <Home/> 
            }
            </div>
        )
    }
} 
export default App;