import React from 'react';
import './App.css';
import queryString from "query-string";
import axios from 'axios';

class App extends React.Component 
{
    state = 
    {
        serverData: {}
    }
    // componentDidMount()
    // {
    //     let parsed = queryString.parse(window.location.search);
    //     let access_token = parsed.code;
    //     if(access_token)
    //     {
    //         axios.post('http://localhost:9876/authorize')
    //         .then(result => result.json())
    //         .then(data => {
    //             console.log(data)
    //             // this.setState({serverData: data})
    //         });
    //     }
    // }

    login = () => {
        axios.get('http://localhost:8888/login')
    }

    render() {
        const { serverData } = this.state;
        return (
            <div className="App">
                {
                    serverData.name ? 
                        <h1>{serverData.name}</h1> 
                    :
                        <React.Fragment>
                            <h1>Welcome to iSpotify</h1>
                            <button onClick={this.login} className="btn btn-info">LOGIN</button>
                        </React.Fragment>
                    }
                
            </div>
        )
    }
} 
export default App;