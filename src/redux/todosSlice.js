import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const todosSlice = createSlice({
	name: 'todos',
	initialState: initialState.todos,
	reducers: {
		todoSet(state, action) {
			state.value = action.payload;
		},
		todoAdd(state, action) {
			const newId = state[state.length - 1].id + 1;
			action.payload.id = newId;
			action.payload.done = false;
			action.payload.flag = false;
			action.payload.createAt = new Date().toISOString();
			state.push(action.payload);
		},
		todoEdit(state, action) {
			const todo = state.find((todo) => todo.id === action.payload.id);
			if (todo) {
				// console.log('todoEdit text=' + action.payload.text);
				// console.log('todoEdit flag=' + action.payload.flag);
				if (action.payload.text !== undefined) todo.text = action.payload.text;
				if (action.payload.flag !== undefined) todo.flag = action.payload.flag;
				if (action.payload.done !== undefined) todo.done = action.payload.done;
			}
		},
		todoDel(state, action) {
			return state.filter((todo) => todo.id !== action.payload);
		},
	},
});

export const { todoSet, todoAdd, todoEdit, todoDel } = todosSlice.actions;
export default todosSlice.reducer;
