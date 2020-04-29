import styled from 'styled-components'

const Input = styled.input`
  color: black;
  outline-width: 0px;
  background: ${(props) => (props.bg ? props.theme.color[props.bg] : 'white')};

  /* Padding */
  padding-top: ${(props) =>
    props.py ? `${props.theme.space[props.py]}` : '0'};
  padding-bottom: ${(props) =>
    props.py ? `${props.theme.space[props.py]}` : '0'};
  padding-left: ${(props) =>
    props.px ? ` ${props.theme.space[props.px]}` : '0'};
  padding-right: ${(props) =>
    props.px ? `${props.theme.space[props.px]}` : '0'};

  /* Margin */
  margin-top: ${(props) => (props.my ? `${props.theme.size[props.my]}` : '0')};
  margin-bottom: ${(props) =>
    props.my ? `${props.theme.size[props.my]}` : '0'};
  margin-left: ${(props) => (props.mx ? `${props.theme.size[props.mx]}` : '0')};
  margin-right: ${(props) =>
    props.mx ? `${props.theme.size[props.mx]}` : '0'};

  font-size: ${(props) => (props.lg ? '24px' : '16px')};

  ::placeholder {
    color: #c1c1c1;
  }
  :focus {
    outline-width: 0;
  }
`

export default Input
