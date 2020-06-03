import { Machine } from "xstate";

import { HawkContext, HawkStateSchema, HawkEvent } from "./Hawk.types";

const load = () => {
  console.log("audio loading...");
};

const Hawk = Machine<HawkContext, HawkStateSchema, HawkEvent>({
  id: 'HawkMachine',
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOAD: 'loading'
      }
    },
    loading: {
     invoke: {
        id: 'load',
        src: load,
        onDone: {
          target: 'ready',
        },
        onError: {
          target: 'error',
        }
      }
    },
    ready: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            PLAY: 'playing'
          }
        },
        playing: {
          on: {
            PAUSE: 'paused',
            END: 'ended'
          }
        },
        paused: {
          on: {
            PLAY: 'playing',
            END: 'ended'
          }
        },
        ended: {
          on: {
            RETRY: 'playing'
          }
        }
      }
    },
    error: {
      on: {
        RETRY: 'idle'
      }
    }
  }
});

export default Hawk;
