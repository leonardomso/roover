import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Provider from './helpers/Provider';

import Simple from './demos/Simple';
import Seek from './demos/Seek';

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

export const SeekExample = () => {
  return <Seek />;
};

SeekExample.story = {
  name: 'Seek',
};