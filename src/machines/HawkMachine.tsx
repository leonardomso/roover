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
      howl: null,
      muted: false,
      position: null,
      duration: null,
      error: null,
    },
    states: {
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
      onError: assign<HawkMachineContext, HawkMachineEvent>({
        error: event => event.error,
      }),
      onMute: assign<HawkMachineContext, HawkMachineEvent>({
        muted: context => !context.muted,
      }),
      onReady: assign<HawkMachineContext, HawkMachineEvent>({
        howl: event => event.howl,
        duration: event => event.duration,
      }),
    },
  }
);

export default Hawk;
