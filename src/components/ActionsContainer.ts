import styled from 'styled-components';

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0.5rem;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default ActionsContainer;
