import { ADD_TODO, COMPLETE_TODO, DEC_COUNT, INC_COUNT } from "./actions";

export function todosReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case COMPLETE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    default:
      return state;
  }
}

export function countReducer(state = 0, action) {
  switch (action.type) {
    case INC_COUNT:
      return state + 1;
    case DEC_COUNT:
      return state - 1;
    default:
      return state;
  }
}
