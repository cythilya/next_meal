export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export const initialContext = { isLoading: false };

export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    default:
      return state
  }
}
