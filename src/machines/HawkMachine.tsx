import { Machine, assign } from 'xstate';
// import raf from 'raf';

import {
  HawkMachineContext,
  HawkMachineStateSchema,
  HawkMachineEvent,
  HawkErrorEvent,
  HawkDurationEvent,
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
      position: 0,
      duration: 0,
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
            },
          },
          playing: {
            activities: 'onPosition',
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
            activities: 'onPosition',
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
            activities: 'onPosition',
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
    activities: {
      onPosition: (context: HawkMachineContext) => {
        // const animate = () => assign({
        //   position: event.howl.seek()
        // });

        // event.ref.current = raf(animate)

        // return () => {
        //   if (event.ref.current) {
        //     raf.cancel(event.ref.current)
        //   }
        // }

        console.log('look at howl -> ', context.howl);
      },
    },
  }
);

export default Hawk;
