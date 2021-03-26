import Loader from "react-loader-spinner";
import styled, { useTheme } from 'styled-components';


function CommonLoader() {
  const theme = useTheme();

  return (
    <Wrapper>
      <Loader
        type="Bars"
        color={theme.colors.lightgrey}
        height={50}
        width={50}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export default CommonLoader;
