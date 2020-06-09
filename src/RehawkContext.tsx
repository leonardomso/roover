import { createContext } from 'react';

import { RehawkTypeContext } from './types';

const RehawkContext = createContext<RehawkTypeContext | undefined>(
  undefined as any
);

export default RehawkContext;
