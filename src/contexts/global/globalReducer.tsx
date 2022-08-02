const reducer = (state: any, action: any) => {
  if (action.type === 'TOGGLE_ISTRUE') {
    return { ...state, isTrue: !true };
  }
  if (action.type === 'TOGGLE_ISFALSE') {
    window.localStorage.setItem('TOGGLE_ISFALSE', 'true');
    return { ...state, isFalse: !false };
  }
  if (action.type === 'RUN_FOO') {
    return { ...state, foobar: action.foo };
  }

  throw new Error('no matching action type');
};

export default reducer;
