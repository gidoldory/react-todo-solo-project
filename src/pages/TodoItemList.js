import styled from 'styled-components';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { todoAdd, todoEdit, todoDel } from '../redux/todosSlice';
import { todoGroupUndoneCntEdit } from '../redux/todoGroupsSlice';
import TodoItem from '../components/TodoItem';
import TodoItemAddForm from '../components/TodoItemAddForm';

const GroupTitle = styled.div`
	width: 100%;
	height: 45px;
	display: flex;
	align-items: center;
	font-size: 1.2rem;
	padding: 0 10px 0 10px;
	background-color: var(--title-bg-color);
	border-bottom: 1px solid var(--list-line-color);

	.btn_prev {
		color: var(--main-blue-color);
		font-size: 1.5rem;
		cursor: pointer;
	}

	.group_name {
		color: var(--list-icon-${(props) => props.thema});
		font-weight: bold;
		padding-left: 10px;
	}
`;

const TodoItemList = () => {
	const groupId = Number(useParams().groupId);
	const { gName, gLabelThema } = useLocation().state;
	const todosFiltered = useSelector((state) =>
		state.todos.filter((todo) => {
			if (todo.groupId === groupId && !todo.done) return true;
			return false;
		})
	);

	const dispatch = useDispatch();
	// console.log(todos);

	// 할 일 입력
	const todoItemCreate = (data) => {
		// console.log('todoItemCreate', data);
		const { text, groupId } = data;
		dispatch(todoAdd({ text, groupId }));
		todoGroupUndoneCntUpdate(groupId, 1);
	};

	// 할 일 수정
	const todoItemUpdate = (data) => {
		// console.log('todoItemUpdate', data);
		dispatch(todoEdit(data));
		if (data.done !== undefined) {
			const doneAddCnt = data.done ? -1 : 1;
			todoGroupUndoneCntUpdate(data.groupId, doneAddCnt);
		}
	};

	// 할 일 삭제
	const todoItemDelete = (itemId, groupId) => {
		// console.log('todoItemDelete', itemId);
		dispatch(todoDel(itemId));
		todoGroupUndoneCntUpdate(groupId, -1);
	};

	// 할 일 그룹 > 미완료 카운트 수정
	const todoGroupUndoneCntUpdate = (groupId, undoneCnt) => {
		// console.log('todoGroupUndoneCntUpdate', undoneCnt);
		dispatch(todoGroupUndoneCntEdit({ id: groupId, undoneCnt }));
	};

	return (
		<>
			<GroupTitle thema={gLabelThema}>
				<Link to="/">
					<FontAwesomeIcon icon={faCircleChevronLeft} className="btn_prev" />
				</Link>
				<span className="group_name">{gName}</span>
			</GroupTitle>
			<ul className="todolist">
				{todosFiltered.map((item) => (
					<TodoItem
						key={item.id}
						item={item}
						todoItemUpdate={todoItemUpdate}
						todoItemDelete={todoItemDelete}
					/>
				))}
			</ul>
			<TodoItemAddForm groupId={groupId} todoItemCreate={todoItemCreate} />
		</>
	);
};

export default TodoItemList;
