import styled from 'styled-components';

const Button = styled.button`
  padding: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-family: della-respira;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 16px;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colors.componentBackgroundHighlight};
  }

  @media (${props => props.theme.breakpoints.mobile}) {
    touch-action: manipulation;

    :hover {
      background-color: ${props => props.theme.colors.black};
    }
  }
`;

export default Button;
