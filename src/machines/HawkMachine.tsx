import { Machine, assign } from 'xstate';

import {
  HawkMachineContext,
  HawkMachineStateSchema,
  HawkMachineEvent,
} from './Hawk.types';

const Hawk = Machine<
  HawkMachineContext,
  HawkMachineStateSchema,
  HawkMachineEvent
>(
  {
    id: 'HawkMachine',
    initial: 'loading',
    context: {
      muted: false,
      position: null,
      duration: null,
      seek: () => undefined,
      error: null,
    },
    states: {
      loading: {
        on: {
          READY: 'ready',
          ERROR: {
            target: 'error',
            actions: 'onLoadError',
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
                actions: 'onPlayError',
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
      onLoadError: assign<HawkMachineContext, HawkMachineEvent>({
        error: event => event.error,
      }),
      onPlayError: assign<HawkMachineContext, HawkMachineEvent>({
        error: event => event.error,
      }),
      onMute: assign({
        muted: context => !context.muted,
      }),
    },
  }
);

export default Hawk;
