import { createContext } from 'react';

import { HawkTypeContext } from './types';

const HawkContext = createContext<HawkTypeContext | undefined>(
  undefined as any
);

export default HawkContext;
