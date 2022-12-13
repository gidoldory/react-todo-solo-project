import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import todoGroupsReducer from './todoGroupsSlice';

export const store = configureStore({
	reducer: {
		todos: todosReducer,
		todoGroups: todoGroupsReducer,
	},
});
