import styled from 'styled-components';

const Hr = styled.hr`
    color: ${props => props.color ? props.color : 'lightgray'};
    height: 1px solid;
    width: 100%;
`;
export default Hr;