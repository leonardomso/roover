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
            },
          },
          playing: {
            on: {
              PAUSE: 'paused',
              STOP: 'stopped',
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
              END: 'ended',
            },
          },
          stopped: {
            on: {
              PLAY: 'playing',
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
      })
    },
  }
);

export default Hawk;
