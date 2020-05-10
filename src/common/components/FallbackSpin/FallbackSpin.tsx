import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const FallbackDiv = styled.div`
  text-align: center;
  border-radius: 4px;
  padding: 30px 50px;
  margin: 20px 0;
`;

const FallbackSpin: React.FC<{}> = (): JSX.Element => (
  <FallbackDiv>
    <CircularProgress />
  </FallbackDiv>
);

export default FallbackSpin;
