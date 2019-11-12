import * as Actions from '../actions';

const initialState = {
  message: null,
};

const message = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SHOW_MESSAGE: {
      return {
        state: true,
        options: {
          ...initialState.options,
          ...action.options,
        },
      };
    }

    case Actions.HIDE_MESSAGE: {
      return {
        ...state,
        state: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default message;
