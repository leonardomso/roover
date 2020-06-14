import styled from 'styled-components';

export const ExampleContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, max-content);
  grid-row-gap: 20px;
`;

export const Title = styled.h1`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  letter-spacing: -0.03em;
  justify-self: flex-start;
`;

export const Description = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`;

export const InputsContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-rows: repeat(auto-fill, max-content);
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  align-items: center;
  justify-content: center;
  grid-row: 3 / 4;
  grid-column: 1 / 2;
`;

export const InputContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: minmax(50px, max-content) max-content;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.h1`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
`;

export const StatesContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, max-content));
  grid-template-rows: repeat(auto-fill, max-content);
  grid-gap: 10px;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
`; 

export const StateTitle = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #666666;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-self: flex-start;
  align-self: center;
`;

export const StatesLeftContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(5, max-content);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  align-items: center;
  justify-content: center;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`;

export const StatesRightContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, max-content);
  grid-row-gap: 10px;
  align-items: center;
  justify-content: center;
  grid-row: 2 / 3;
  grid-column: 2 / 3;;
`;

export const StateContainer = styled.div`
  width: fit-content;
  height: auto;
  display: grid;
  grid-template-columns: minmax(50px, max-content) max-content;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const StateProperty = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

export const StateValue = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;