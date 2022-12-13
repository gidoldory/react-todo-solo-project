import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { todoEdit, todoDel } from '../redux/todosSlice';
import { todoGroupUndoneCntEdit } from '../redux/todoGroupsSlice';
import TodoItem from '../components/TodoItem';
import { useDispatch, useSelector } from 'react-redux';

const MenuTitle = styled.div`
	width: 100%;
	height: 45px;
	display: flex;
	align-items: center;
	font-size: 1.2rem;
	padding: 0 10px 0 10px;
	background-color: var(--main-button-color);
	border-bottom: 1px solid var(--list-line-color);

	.btn_prev {
		color: var(--main-blue-color);
		cursor: pointer;
	}

	.group_name {
		color: var(--main-blue-color);
		font-weight: bold;
		padding-left: 10px;
	}
`;

const GroupTitle = styled.h4`
	color: var(--list-icon-${(props) => props.thema});
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 10px;
	border-bottom: 1px solid var(--list-icon-${(props) => props.thema});
`;

const TodoAllList = () => {
	// 링크 상태값 가져오기(모두 보기, 중요한 일, 끝낸 일)
	const { title, done, flag } = useLocation().state;

	// 할 일 목록 필터링
	const todosFiltered = useSelector((state) =>
		state.todos.filter((todo) => {
			if (flag !== undefined) return todo.done === done && todo.flag === flag;
			else return todo.done === done;
		})
	);

	// 필터링된 할 일 목록의 그룹 아이디 필터링
	const todoGroupsFiltered = useSelector((state) =>
		state.todoGroups.filter((group) => {
			if (todosFiltered.find((todo) => todo.groupId === group.id)) return true;
			return false;
		})
	);
	const todosByGroup = (groupId) => {
		return todosFiltered.filter((todo) => todo.groupId === groupId);
	};

	const dispatch = useDispatch();

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
			<MenuTitle>
				<Link to="/">
					<FontAwesomeIcon icon={faCircleChevronLeft} className="btn_prev" />
				</Link>
				<span className="group_name">{title}</span>
			</MenuTitle>
			{todoGroupsFiltered.map((group) => (
				<div key={group.id}>
					<GroupTitle thema={group.labelThema}>{group.name}</GroupTitle>
					<ul className="todolist">
						{todosByGroup(group.id).map((todo) => (
							<TodoItem
								key={todo.id}
								item={todo}
								todoItemUpdate={todoItemUpdate}
								todoItemDelete={todoItemDelete}
							/>
						))}
					</ul>
				</div>
			))}
		</>
	);
};

export default TodoAllList;
