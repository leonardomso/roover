import { Machine } from 'xstate';

import { HawkContext, HawkStateSchema, HawkEvent } from './Hawk.types';

const Hawk = Machine<HawkContext, HawkStateSchema, HawkEvent>(
  {
    id: 'HawkMachine',
    initial: 'idle',
    states: {
      idle: {
        on: {
          LOAD: 'loading',
        },
      },
      loading: {
        invoke: {
          id: 'loadAudio',
          src: 'loadAudio',
          onDone: {
            target: 'ready',
          },
          onError: {
            target: 'error',
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
        },
      },
      error: {
        on: {
          RETRY: 'idle',
        },
      },
    },
  },
  {
    actions: {
      loadAudio: () => {
        console.log('loading audio...');
      },
    },
  }
);

export default Hawk;
