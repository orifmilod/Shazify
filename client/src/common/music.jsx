import React from 'react'
import styled from 'styled-components';


const Music = (props) => {
    const { name, duration_ms, artists, album, preview_url, id } = props.music;
    const encodedUriID = encodeURI(id);
    console.log(props.music)
    return ( 
        <iframe 
            title={id}
            src={`https://open.spotify.com/embed/track/${encodedUriID}`} 
            width='100%' height="100px" 
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media"
        />
    );
}
 
export default Music;

