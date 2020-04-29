import styled from 'styled-components'

const P = styled.p`
  align-self: ${(props) => (props.align ? props.align : 'center')};
  text-align: ${(props) => props.align};
  color: ${(props) => (props.secondary ? 'gray' : props.color)};
  font-size: ${(props) => (props.font ? props.theme.font[props.font] : '16px')};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};

  /* Padding */
  padding-top: ${(props) => (props.py ? `${props.py}px` : '0')};
  padding-bottom: ${(props) => (props.py ? `${props.py}px` : '0')};
  padding-left: ${(props) => (props.px ? `${props.px}px` : '0')};
  padding-right: ${(props) => (props.px ? `${props.px}px` : '0')};

  /* Margin */
  margin-top: ${(props) => (props.my ? `${props.my}px` : '0')};
  margin-bottom: ${(props) => (props.my ? `${props.my}px` : '0')};
  margin-left: ${(props) => (props.mx ? `${props.mx}px` : '0')};
  margin-right: ${(props) => (props.mx ? `${props.mx}px` : '0')};
`

export default P
