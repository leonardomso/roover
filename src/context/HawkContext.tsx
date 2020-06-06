import React, { useContext } from 'react';

import useHawk from '../hooks/useHawk';

import { HawkAudioContext } from '../types';

const HawkContext = React.createContext<HawkAudioContext | undefined>(
  undefined
);

const HawkProvider = ({ children }: any) => {
  const {
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    muted,
    seek,
    duration,
    position,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
  } = useHawk();

  const value = [
    loading,
    ready,
    error,
    playing,
    paused,
    stopped,
    muted,
    seek,
    duration,
    position,
    onToggle,
    onPlay,
    onPause,
    onStop,
    onMute,
  ];

  return <HawkContext.Provider value={value}>{children}</HawkContext.Provider>;
};

const useHawkContext = () => {
  const context = useContext(HawkContext);
  if (context === undefined) {
    throw new Error('useHawk can only be used inside HawkProvider');
  }
  return context;
};

export { HawkProvider, useHawkContext };
