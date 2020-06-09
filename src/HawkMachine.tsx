import { Machine, assign } from 'xstate';

import {
  HawkMachineContext,
  HawkMachineStateSchema,
  HawkMachineEvent,
  HawkErrorEvent,
  HawkDurationEvent,
} from './types';

const Hawk = Machine<
  HawkMachineContext,
  HawkMachineStateSchema,
  HawkMachineEvent
>(
  {
    id: 'HawkMachine',
    initial: 'loading',
    context: {
      howl: null,
      muted: false,
      position: 0,
      duration: 0,
      error: null,
    },
    states: {
      loading: {
        on: {
          READY: {
            target: 'ready',
            actions: ['onReady'],
          },
          ERROR: {
            target: 'error',
            actions: 'onError',
          },
        },
      },
      ready: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              PLAY: 'playing',
              MUTE: {
                target: '',
                actions: 'onMute',
              },
            },
          },
          playing: {
            on: {
              PAUSE: 'paused',
              STOP: 'stopped',
              MUTE: {
                target: '',
                actions: 'onMute',
              },
              END: 'ended',
              ERROR: {
                target: 'error',
                actions: 'onError',
              },
            },
          },
          paused: {
            on: {
              PLAY: 'playing',
              STOP: 'stopped',
              MUTE: {
                target: '',
                actions: 'onMute',
              },
              END: 'ended',
            },
          },
          stopped: {
            on: {
              PLAY: 'playing',
              MUTE: {
                target: '',
                actions: 'onMute',
              },
            },
          },
          ended: {
            on: {
              RETRY: 'playing',
            },
          },
          error: {
            type: 'final',
          },
        },
      },
      error: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      onError: assign<HawkMachineContext, any>({
        error: (_, event) => (event as HawkErrorEvent).error,
      }),
      onMute: assign<HawkMachineContext, HawkMachineEvent>({
        muted: context => !context.muted,
      }),
      onReady: assign<HawkMachineContext, any>({
        howl: (_, event) => (event as HawkDurationEvent).howl,
        duration: (_, event) => (event as HawkDurationEvent).duration,
        position: (_, event) => (event as HawkDurationEvent).position,
      }),
    },
  }
);

export default Hawk;
