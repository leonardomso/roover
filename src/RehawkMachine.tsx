import { Machine, assign } from 'xstate';

import {
  RehawkMachineContext,
  RehawkMachineState,
  RehawkMachineEvents,
  RehawkOnErrorEvent,
  RehawkOnReadyEvent,
} from './types';

const Rehawk = Machine<
  RehawkMachineContext,
  RehawkMachineState,
  RehawkMachineEvents
>(
  {
    id: 'RehawkMachine',
    initial: 'loading',
    context: {
      audio: null,
      duration: 0,
      muted: false,
      loop: false,
      error: null,
    },
    states: {
      loading: {
        on: {
          READY: {
            target: 'ready',
            actions: 'onReady',
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
              LOOP: {
                target: '',
                actions: 'onLoop',
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
              LOOP: {
                target: '',
                actions: 'onLoop',
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
              LOOP: {
                target: '',
                actions: 'onLoop',
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
              LOOP: {
                target: '',
                actions: 'onLoop',
              },
            },
          },
          ended: {
            on: {
              RETRY: 'idle',
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
      onError: assign<RehawkMachineContext, any>({
        error: (_, event) => (event as RehawkOnErrorEvent).error,
      }),
      onMute: assign<RehawkMachineContext, RehawkMachineEvents>({
        muted: context => !context.muted,
      }),
      onLoop: assign<RehawkMachineContext, RehawkMachineEvents>({
        loop: context => !context.loop,
      }),
      onReady: assign<RehawkMachineContext, any>({
        duration: (_, event) => (event as RehawkOnReadyEvent).duration,
      }),
    },
  }
);

export default Rehawk;
