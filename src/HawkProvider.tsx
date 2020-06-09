import React from 'react';

import HawkContext from './HawkContext';

import { HawkProviderProps } from './types';

const HawkProvider: React.FC<HawkProviderProps> = ({ children, value }) => {
  return <HawkContext.Provider value={value}>{children}</HawkContext.Provider>;
};

export default HawkProvider;
