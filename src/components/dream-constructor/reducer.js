export const initialState = {
  categories: [],
  step: 1,
  type: '',
  video: null,
  text: '',
  name: '',
  email: '',
  country: 'USA',
};

export function reducer(state, action) {
  switch (action.type) {
    case 'stepUp': return { ...state, step: state.step + 1 };
    case 'stepDown': return { ...state, step: Math.max(state.step - 1, 1) };
    case 'setType': return { ...state, type: action.payload };
    case 'setCategories': return { ...state, categories: action.payload };
    case 'setVideo': return { ...state, video: action.payload };
    case 'setText': return { ...state, text: action.payload };
    case 'setName': return { ...state, name: action.payload };
    case 'setEmail': return { ...state, email: action.payload };
    case 'setCountry': return { ...state, country: action.payload };
    case 'reset': return initialState;
    default: return '';
  }
}
