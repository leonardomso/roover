import { createContext } from 'react';

import { RooverStateContext } from './types';

const RooverContext = createContext<RooverStateContext | undefined>(
  undefined as any
);

export default RooverContext;
