import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: ${({ space }) => (space ? `${space * 4}px` : '0px')} !important;
  background: ${({ theme, bg }) => theme.color[bg]};
  text-align: center;
  justify-self: center;
`
export default Container
