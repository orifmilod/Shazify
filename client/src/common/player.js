import React from 'react'
import styled from 'styled-components';

const IFrame = styled.iframe`
    height: 100px;
    position: absolute;
    right: 0;
    width: 100%;
    bottom: 0;
`;

const Music = (props) => {
    // const { id } = props.music;
    // const encodedUriID = encodeURI(id);
    // console.log(encodedUriID);
    return ( 
        <IFrame 
            title={'asd'}
            src={`https://open.spotify.com/embed/track/5ry2OE6R2zPQFDO85XkgRb`}//${encodedUriID 
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media"
        />
    );
}
 
export default Music;

