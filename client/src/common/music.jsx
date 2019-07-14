import React from 'react'
import { millisToMinutesAndSeconds } from '../utils/convertTime';

const Music = (props) => {
    const { name, duration_ms, artists, album, preview_url } = props.music;
    console.log(props)
    return ( 
        <div className='bg-light mb-3 row'>
            <div className='col-1'>
                <img src={album.images[0].url} style={{ height:'50px', width: '50px' }} className='rounded-circle'/>
            </div>
            <div className='col-11'>
                <audio controls>
                    <source src={preview_url} type="audio/ogg"/>
                </audio>
                <h5>{name}</h5>
                {artists.map(artist => <small className='text-muted'>{artist.name} </small>)}
                <small className='text-right'>Duration: {millisToMinutesAndSeconds(duration_ms)}</small>
            </div>
        </div>
     );
}
 
export default Music;