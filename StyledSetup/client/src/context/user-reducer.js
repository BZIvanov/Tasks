export const initialState = {
  isLoggedIn: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'SIGNIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'SIGNOUT':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
