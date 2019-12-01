import styled from 'styled-components';
import getWidthString from '../utils/GetWidth';

const Grid = styled.div`

  /* Padding */
  padding-top: ${props => (props.py ? `${props.theme.space[props.py]}` : '0')};
  padding-bottom: ${props => props.py ? `${props.theme.space[props.py]}` : '0'};
  padding-left: ${props => props.px ? `${props.theme.space[props.px]}` : '0'};
  padding-right: ${props => props.px ? `${props.theme.space[props.px]}` : '0'};

  /* Margin */
  margin-top: ${props => (props.my ? `${props.theme.size[props.my]}` : '0')};
  margin-bottom: ${props => (props.my ? `${props.theme.size[props.my]}` : '0')};
  margin-left: ${props => (props.mx ? `${props.theme.size[props.mx]}` : '0')};
  margin-right: ${props => (props.mx ? `${props.theme.size[props.mx]}` : '0')};

  /* Display */
  display: grid;
  align-self: auto;
  grid-auto-flow: ${props => props.direction};
  align-items: ${props => props.alignItems ? props.alignItems : 'center'};
  grid-gap: ${({ space, theme }) => space ? `${theme.space[space]}` : '0'};

  /* Conditional */
  ${({ height }) => height && `height: ${height};`}
  ${({ bg, theme }) => bg && `background: ${theme.color.bg}`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ templateRow }) => templateRow && `grid-template-rows: ${templateRow};`}
  ${({ templateColumn }) => templateColumn && `grid-template-columns: ${templateColumn};`}

  /* Responsive Width */

  ${({ xs }) => xs && getWidthString(xs)}
  @media screen and(min-width: 768px) {
    ${ ({ sm }) => sm && getWidthString(sm)};
  }

  @media screen and(min-width: 992px) {
    ${ ({ md }) => md && getWidthString(md)};
  }

  @media screen and(min-width: 1200px) {
    ${ ({ lg }) => lg && getWidthString(lg)};
  }
`;
export default Grid;
