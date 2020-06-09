import { useContext } from 'react';

import HawkContext from './HawkContext';

const useHawkContext = () => {
  const context = useContext(HawkContext);
  if (context === undefined) {
    throw new Error('useHawk can only be used inside HawkProvider');
  }
  return context;
};

export default useHawkContext;
