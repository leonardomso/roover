import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Provider from './helpers/Provider';

import Simple from './demos/Simple';
import Volume from './demos/Volume';
import Mute from './demos/Mute';
import Loop from './demos/Loop';
import Seek from './demos/Seek';
import Rate from './demos/Rate';
import Backward from './demos/Backward';
import Forward from './demos/Forward';

export default {
  title: 'useRehawk',
  decorators: [withKnobs, storyFn => <Provider>{storyFn()}</Provider>],
};

export const SimpleExample = () => {
  return <Simple />;
};

SimpleExample.story = {
  name: 'Simple',
};

export const VolumeExample = () => {
  return <Volume />;
};

VolumeExample.story = {
  name: 'Volume',
};

export const MuteExample = () => {
  return <Mute />;
};

MuteExample.story = {
  name: 'Mute',
};

export const LoopExample = () => {
  return <Loop />;
};

LoopExample.story = {
  name: 'Loop',
};

export const SeekExample = () => {
  return <Seek />;
};

SeekExample.story = {
  name: 'Seek',
};

export const RateExample = () => {
  return <Rate />;
};

RateExample.story = {
  name: 'Rate',
};

export const BackwardExample = () => {
  return <Backward />;
};

BackwardExample.story = {
  name: 'Backward',
};

export const ForwardExample = () => {
  return <Forward />;
};

ForwardExample.story = {
  name: 'Forward',
};