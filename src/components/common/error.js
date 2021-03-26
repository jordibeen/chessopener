import styled from 'styled-components';


function CommonError() {
  return (
    <Wrapper>
      <Message>
        There was an error fetching data.
      </Message>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Message = styled.div`
  color: ${props => props.theme.colors.white};
`;

export default CommonError;
