const TodoItemAddForm = ({ groupId, todoItemCreate }) => {
	// console.log('--TodoItemAddForm render--');

	// 할 일 입력
	const handleSubmit = (e) => {
		e.preventDefault();

		const text = e.target.text.value;
		todoItemCreate({ text, groupId });
		e.target.text.value = '';
	};

	return (
		<form action="" className="todolist_item_form" onSubmit={handleSubmit}>
			<input
				type="text"
				name="text"
				className="todolist_item_text_new"
				placeholder="할 일 입력 후 엔터"
				required
			/>
		</form>
	);
};

export default TodoItemAddForm;
