import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItem = styled.li`
    color: ${props => props.color};
    padding: ${props => props.padding};
    border-bottom: 0.5px solid lightgray;
   :hover{
       background: green;
   }
`;

const Playlists = ({ playlists }) => {
    return ( 
        <div className='scroll-able'>
            {   
                playlists && 
                <ul>
                    {playlists.map(pl => <ListItem padding='20px' color='white' key={pl.id}>{pl.name}</ListItem>)}
                </ul>
            }
        </div>
    );
}
Playlists.prototype = {
    playlists: PropTypes.array
}

export default Playlists;