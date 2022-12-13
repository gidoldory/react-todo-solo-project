import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFlag as faFlagOn,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { faFlag as faFlagOff } from '@fortawesome/free-regular-svg-icons';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
	margin-right: 10px;
	text-align: right;
	color: #f99400;
`;

const EditButton = styled.button`
	width: 30px;
	height: 100%;
	color: var(--white-color);
	border: none;
	cursor: pointer;
	background-color: var(${(props) => props.bgColor});
`;

const TodoItem = ({ item, todoItemUpdate, todoItemDelete }) => {
	// console.log('--TodoItem render--');

	const [text, setText] = useState(item.text);
	const [editMode, setEditMode] = useState(false);

	// 할 일 수정
	const handleTodoItemUpdate = (type, id, initVal) => {
		let data = { id, groupId: item.groupId };
		setEditMode(false);

		if (type === 'text') {
			// 변경사항이 없으면 리턴
			if (initVal === text) return;
			data.text = text;
		} else if (type === 'checkbox') {
			data.done = !initVal;
		} else if (type === 'flag') {
			data.flag = !initVal;
		}

		todoItemUpdate(data);
	};

	// 할 일 삭제
	const handleItemDelete = (id) => {
		setEditMode(false);
		todoItemDelete(id, item.groupId);
	};

	return (
		<li className={editMode ? 'todolist_item focusLine' : 'todolist_item'}>
			<input
				className="todolist_item_checkbox"
				type="checkbox"
				value={item.id}
				title="할 일 선택"
				checked={item.done}
				onChange={() => handleTodoItemUpdate('checkbox', item.id, item.done)}
			/>
			<input
				type="text"
				className={item.done ? 'todolist_item_text done' : 'todolist_item_text'}
				value={text}
				onChange={(e) => setText(e.target.value)}
				onMouseDown={() => setEditMode(true)}
				onBlur={() => handleTodoItemUpdate('text', item.id, item.text)}
				readOnly={!editMode}
			/>
			{item.flag && <StyledFontAwesomeIcon icon={faFlagOn} />}
			{editMode && (
				<div className="todolist_item_btn">
					<EditButton
						bgColor="--flag-bg-color"
						onMouseDown={() => handleTodoItemUpdate('flag', item.id, item.flag)}
					>
						{item.flag ? (
							<FontAwesomeIcon icon={faFlagOn} inverse />
						) : (
							<FontAwesomeIcon icon={faFlagOff} inverse />
						)}
					</EditButton>
					<EditButton
						bgColor="--del-bg-color"
						onMouseDown={() => handleItemDelete(item.id)}
					>
						<FontAwesomeIcon icon={faTrashCan} inverse />
					</EditButton>
				</div>
			)}
		</li>
	);
};

export default TodoItem;
