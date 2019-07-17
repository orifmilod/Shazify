import React from 'react';
import styled from 'styled-components';
import Image from './Image';
import Hr from './Hr';

const Play = styled.i`
    font-size: 30px;
    position: absolute;
    right: 0;
    padding: 10px 30px;
    :hover{
        color: lightgreen;
    }
`; 

const Track = ({ track, playMusic }) => {
    // let { name, artists, album, id } = track;
    const id = 123;
    // name = 'Godsd  is a As dasd ';

    // console.log(track)
    return ( 
        <div className='row text-left no-gutters'>
            <Image className='mr-3' src='https://images.genius.com/06a7a5d3eb26a6c259a46c2ff988020d.1000x1000x1.jpg' />
            <div>
                <h5>I am from here</h5>
                <small className='text-muted'>Ariana Grande</small>
               
            </div>
            <Play className="fas fa-play" onClick={() => playMusic(id)}/>
            <Hr/>
        </div>
     );
}
 
export default Track;