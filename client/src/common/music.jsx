import React from 'react'


const Music = (props) => {
    const { id } = props.music;
    const encodedUriID = encodeURI(id);
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

