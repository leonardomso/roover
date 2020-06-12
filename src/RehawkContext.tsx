import { createContext } from 'react';

import { RehawkStateContext } from './types';

const RehawkContext = createContext<RehawkStateContext | undefined>(
  undefined as any
);

export default RehawkContext;
