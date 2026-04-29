import { assign, setup } from "xstate";

type Context = {
  title: string;
  error: string | null;
};

type Events =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "UPDATE_TITLE"; title: string }
  | { type: "SUBMIT" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; error: string };

export const todoMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  guards: {
    titleNotEmpty: ({ context }) => context.title.trim().length > 0,
  },
}).createMachine({
  id: "todo",
  initial: "idle",
  context: { title: "", error: null },
  states: {
    idle: {
      on: {
        OPEN_MODAL: "creating",
      },
    },
    creating: {
      on: {
        CLOSE_MODAL: {
          target: "idle",
          actions: assign({ title: () => "", error: () => null }),
        },
        UPDATE_TITLE: {
          target: "creating",
          actions: assign({
            title: ({ event }) => event.title,
            error: () => null,
          }),
        },
        SUBMIT: {
          target: "submitting",
          guard: "titleNotEmpty",
        },
      },
    },
    submitting: {
      on: {
        SUBMIT_SUCCESS: {
          target: "idle",
          actions: assign({ title: () => "", error: () => null }),
        },
        SUBMIT_ERROR: {
          target: "failure",
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    failure: {
      on: {
        CLOSE_MODAL: {
          target: "idle",
          actions: assign({ title: () => "", error: () => null }),
        },
        UPDATE_TITLE: {
          target: "creating",
          actions: assign({
            title: ({ event }) => event.title,
            error: () => null,
          }),
        },
      },
    },
  },
});
