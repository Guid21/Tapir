const EDIT_STEP = 'EDIT_STEP';

const createStore = (reducer, initialState) => {
  const subscribes = [];
  let state = reducer(initialState, { type: '__INIT__' });

  return {
    dispatch: (action) => {
      state = reducer(state, action);
      subscribes.forEach((sub) => sub());
    },
    subscribe: (cb) => subscribes.push(cb),
    getState: () => state,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case EDIT_STEP:
      return {
        ...state,
        step: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  step: 1,
};
