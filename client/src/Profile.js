import React from 'react'
import styled from 'styled-components';
import icon from './person-icon.png'
import Image from './common/Image.js';

const ListItem = styled.ul`
    font-size: 16px;
    margin-bottom: 10px;
    letter-spacing: 1.3;
`;


const Icon = styled.i`
    color: lightgray;
    margin: 0 10px 0 0;
    font-size: 26px;
    padding: 10px;
    background-color: black;
    border-radius: 50%;
    border: 2px solid;
`;
const Profile = (props) => {
    let { display_name, email, country, images } = props.userData;
    return ( 
        <div className='justify-content-center p-3'>
            <Image lg src={icon} alt='user-pic'/> {/*images[0].url !== undefined ? images[0].url :*/}
            <br/>
            <ul className='pt-5'>
                <ListItem> 
                    <Icon className='fas fa-user'/>  {display_name}
                </ListItem>
                <ListItem> 
                    <Icon className='fas fa-envelope'/> {email}
                </ListItem>
                <ListItem> 
                    <Icon className="fas fa-globe-americas"/> {country}
                </ListItem>
            </ul>
        </div>
     );
}
 
export default Profile;
