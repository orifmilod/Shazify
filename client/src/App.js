import React from 'react';
import './App.css';
import queryString from 'query-string';
import Music from './common/music';


class App extends React.Component 
{
    state = 
    {
        serverData: { },
        userData: { },
        playlist: [],
        searchInput: '',
        searchedFound: []
    }

    searchArtist = (e) => {
        e.preventDefault();
        let hash = queryString.parse(window.location.hash);
        fetch('https://api.spotify.com/v1/me', { 
            headers: { 'Authorization': `Bearer ${hash.access_token}` }
        })
        .then(data => data.json())
        .then(userData => this.setState({ userData }))
        .catch(err => console.error(err)) 

        //Get A music
        // fetch('https://api.spotify.com/v1/tracks/0AtP8EkGPn6SwxKDaUuXec', {
        //     headers: { 'Authorization': 'Bearer ' + hash.access_token }
        // })
        // .then(data => data.json())
        // .then(result => this.setState(prevState => prevState.playlist.push(result) ))
        // .catch(err => console.log(err))
    }

    searchMusic = (e) => {
        e.preventDefault();
        const limit = 10;
        const searchFilter = encodeURI(this.state.searchInput);
        let hash = queryString.parse(window.location.hash);
        
        fetch(`https://api.spotify.com/v1/search?q=${searchFilter}&type=track&market=PL&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${hash.access_token}`,
                'Accept': "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(data => data.json())
        .then(result => { console.log(result); this.setState({ searchedFound: result.tracks.items }) })
        .catch(err => console.error(err));
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { playlist, userData, searchedFound } = this.state;
        const { display_name, email, country, images } = userData;
        return (
            <div className="App">
            {   
                display_name ? 
                <div className='row'>
                    <div className='col-3 bg-success vh-100 text-left'>
                    { images.length > 0 && <img className='rounded-circle' style={{height:'150px', width:'150px'}} src={images[0].url} alt="user-pic"/>}
                    <h5>Name: {display_name}</h5> 
                    <h5>Email: {email}</h5> 
                    <h5>Country: {country}</h5> 
                    
                    <button onClick={this.showPlaylist}>Show Playlist</button>
                    </div>
                    <div className='col-3 bg-warning vh-100 text-left'>
                    {
                        playlist.length > 0 &&
                        playlist.map(music =>
                            <>  
                                <audio src={music.preview_url}/>
                                <audio controls>
                                    <source src={music.preview_url} type="audio/ogg"/>
                                </audio>
                                <h4>{music.name}</h4>
                                {music.artists.map(artist => <span>{artist.name},</span>)}
                            </>
                        )
                    }
                    </div>
                    <div className='col-3 bg-info'>
                        <input
                            className='input-group form-control'
                            placeholder='Search a track...'
                            name='searchInput'
                            onChange={this.handleChange}
                        />
                        <button className='btn btn-block btn-success' onClick={this.searchMusic}>Search</button>

                        <br/>
                        {
                            searchedFound &&
                            searchedFound.map(music => <Music music={music}/>)
                        }
                    </div>
               
                </div>
                :
                <React.Fragment>
                    <h1>Welcome to iSpotify</h1>
                    <a href='http://localhost:8888/login'>LOGIN</a>
                    <button onClick={this.searchArtist}>Get DATA</button>
                </React.Fragment>
            }
            </div>
        )
    }
} 
export default App;