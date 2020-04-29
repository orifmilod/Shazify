import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`
const LoadingIcon = styled.span`
  animation: ${rotate} 0.5s infinite linear;
  width: 50px;
  height: 50px;
  border: 2px solid rgb(255, 51, 51);
  border-top: 2px;
  border-left: 0px;
  border-right: 0px;
  border-radius: 50%;
  display: table;
  margin: auto;
`
export default LoadingIcon
