import styled from 'styled-components';

export const ProviderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, max-content);
  grid-row-gap: 20px;
  align-items: center;
  justify-content: flex-start;
`;