import React from 'react';
import { SpinnerContainer, LoadingSpinner } from './style';

function Spinner(): JSX.Element {
  return (
    <SpinnerContainer>
      <LoadingSpinner />
    </SpinnerContainer>
  );
}

export default Spinner;
