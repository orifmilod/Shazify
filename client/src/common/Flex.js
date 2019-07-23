import styled from "styled-components";
import getWidthString from "../utils/GetWidth";

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};

  ${({ xs }) => (xs ? getWidthString(xs) : "width: 100%")};
  @media screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }

  @media screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }

  @media screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;

export default Flex;
