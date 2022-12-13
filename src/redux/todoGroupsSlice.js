import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const todosGroupSlice = createSlice({
	name: 'todoGroups',
	initialState: initialState.todoGroups,
	reducers: {
		todoGroupSet(state, action) {
			state.value = action.payload;
		},
		todoGroupAdd(state, action) {
			const newId = state[state.length - 1].id + 1;
			action.payload.id = newId;
			action.payload.undoneCnt = 0;
			state.push(action.payload);
		},
		todoGroupEdit(state, action) {
			const group = state.find((group) => group.id === action.payload.id);
			if (group) {
				group.name = action.payload.name;
				group.labelThema = action.payload.labelThema;
			}
		},
		todoGroupUndoneCntEdit(state, action) {
			// console.log('todoGroupUndoneCntEdit groupid=' + action.payload.id);
			const group = state.find((group) => group.id === action.payload.id);
			if (group) {
				group.undoneCnt = group.undoneCnt + action.payload.undoneCnt;
			}
		},
		todoGroupDel(state, action) {
			return state.filter((group) => group.id !== action.payload);
		},
	},
});

export const {
	todoGroupSet,
	todoGroupAdd,
	todoGroupEdit,
	todoGroupUndoneCntEdit,
	todoGroupDel,
} = todosGroupSlice.actions;
export default todosGroupSlice.reducer;
