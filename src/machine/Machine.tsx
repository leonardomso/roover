import { createMachine, assign } from 'xstate';

import {
  MachineContext,
  MachineEvent,
  MachineLoadEvent,
  MachineErrorEvent,
  MachineRateEvent,
  MachineVolumeEvent,
} from '../types';

const Machine = createMachine<MachineContext, MachineEvent>(
  {
    id: 'roover',
    initial: 'initial',
    context: {
      volume: 1.0,
      rate: 1.0,
      duration: 0,
      mute: false,
      loop: false,
      error: null,
    },
    states: {
      initial: {
        id: 'initial',
        on: {
          LOAD: {
            target: 'loading',
            actions: 'onLoad',
          },
          ERROR: 'error',
        },
      },
      loading: {
        on: {
          READY: 'ready',
          ERROR: {
            target: 'error',
            actions: 'onError',
          },
        },
      },
      ready: {
        id: 'ready',
        initial: 'idle',
        states: {
          idle: {
            on: {
              PLAY: 'playing',
              PAUSE: 'paused',
            },
          },
          playing: {
            on: {
              PAUSE: 'paused',
            },
          },
          paused: {
            on: {
              PLAY: 'playing',
            },
          },
        },
        on: {
          LOAD: {
            target: 'loading',
            actions: 'onLoad',
          },
          END: 'end',
          ERROR: 'error',
          VOLUME: {
            target: '',
            actions: 'onVolume',
          },
          RATE: {
            target: '',
            actions: 'onRate',
          },
          MUTE: {
            target: '',
            actions: 'onMute',
          },
          LOOP: {
            target: '',
            actions: 'onLoop',
          },
        },
      },
      end: {
        id: 'end',
        on: {
          LOAD: {
            target: 'loading',
            actions: 'onLoad',
          },
          PLAY: 'ready.playing',
        },
      },
      error: {
        id: 'error',
        on: {
          LOAD: {
            target: 'loading',
            actions: 'onLoad',
          },
        },
      },
    },
  },
  {
    actions: {
      onLoad: assign<MachineContext, MachineEvent>({
        volume: (_, event) => (event as MachineLoadEvent).volume,
        rate: (_, event) => (event as MachineLoadEvent).rate,
        duration: (_, event) => (event as MachineLoadEvent).duration,
        mute: (_, event) => (event as MachineLoadEvent).mute,
        loop: (_, event) => (event as MachineLoadEvent).loop,
      }),
      onVolume: assign<MachineContext, MachineEvent>({
        volume: (_, event) => (event as MachineVolumeEvent).volume,
      }),
      onRate: assign<MachineContext, MachineEvent>({
        rate: (_, event) => (event as MachineRateEvent).rate,
      }),
      onMute: assign<MachineContext, MachineEvent>({
        mute: (context, _) => !context.mute,
      }),
      onLoop: assign<MachineContext, MachineEvent>({
        loop: (context, _) => !context.loop,
      }),
      onError: assign<MachineContext, MachineEvent>({
        error: (_, event) => (event as MachineErrorEvent).error,
      }),
    },
  }
);

export default Machine;
