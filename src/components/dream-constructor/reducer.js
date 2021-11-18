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

export const actions = {
  stepUp: () => ({ type: 'stepUp' }),
  stepDown: () => ({ type: 'stepDown' }),
  setType: (newType) => ({ type: 'setType', payload: newType }),
  toggleCategory: (category) => ({ type: 'toggleCategory', payload: category }),
  setVideo: (recorded) => ({ type: 'setVideo', payload: recorded }),
  setText: (newText) => ({ type: 'setText', payload: newText }),
  setName: (name) => ({ type: 'setName', payload: name }),
  setEmail: (email) => ({ type: 'setEmail', payload: email }),
  setCountry: (country) => ({ type: 'setCountry', payload: country }),
  reset: () => ({ type: 'reset' }),
};

export function reducer(state, action) {
  switch (action.type) {
    case 'stepUp': return { ...state, step: state.step + 1 };
    case 'stepDown': return { ...state, step: Math.max(state.step - 1, 1) };
    case 'setType': return { ...state, type: action.payload };
    case 'toggleCategory': {
      const categories = state.categories.includes(action.payload)
        ? state.categories.filter((item) => item !== action.payload)
        : [...state.categories, action.payload];
      if (categories.length > 5) return state;
      return { ...state, categories };
    }
    case 'setVideo': return { ...state, video: action.payload };
    case 'setText': return { ...state, text: action.payload };
    case 'setName': return { ...state, name: action.payload };
    case 'setEmail': return { ...state, email: action.payload };
    case 'setCountry': return { ...state, country: action.payload };
    case 'reset': return initialState;
    default: throw new Error(`Неизвестный ${action.type}`);
  }
}
