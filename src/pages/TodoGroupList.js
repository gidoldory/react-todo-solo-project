import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faListUl,
	faFlag,
	faCalendarCheck,
	faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainBtnContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;

	> a {
		width: 113px;
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		cursor: pointer;
		border: none;
		background-color: var(--main-button-color);
		border-radius: 10px;
		box-shadow: rgba(2, 115, 220, 0.55) 1.95px 1.95px 2.6px;
	}
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
	color: var(--white-color);
	padding: 5px;
	border-radius: 50px;
	background-color: ${(props) =>
		props.thema ? `var(--list-icon-${props.thema})` : props.color};
`;

const GroupList = styled.ul`
	border-radius: 8px;
	margin: 0 10px 0 10px;
	overflow: hidden;
`;

const GroupItem = styled.li`
	width: 100%;
	height: 45px;
	display: flex;
	align-items: center;
	padding: 0 10px 0 10px;
	background-color: var(--title-bg-color);

	&:not(:last-of-type) {
		border-bottom: 1px solid var(--white-color);
	}

	> div {
		display: flex;
		align-items: center;
		font-size: 0.93rem;

		&.todo_group_item_name {
			flex-grow: 1;
		}

		&.todo_group_item_cnt {
			text-align: right;
		}
	}
`;

const TodoGroupList = () => {
	// console.log('--TodoGroupList render--');

	const todoGroups = useSelector((state) => state.todoGroups);

	return (
		<>
			<MainBtnContainer>
				<Link to={`/alllist`} state={{ title: '모두 보기', done: false }}>
					<StyledFontAwesomeIcon icon={faListUl} color="#0273dc" />
					&nbsp;모두 보기
				</Link>
				<Link
					to={`/alllist`}
					state={{
						title: '중요한 일',
						flag: true,
						done: false,
					}}
				>
					<StyledFontAwesomeIcon icon={faFlag} color="#f99400" />
					&nbsp;중요한 일
				</Link>
				<Link to={`/alllist`} state={{ title: '끝낸 일', done: true }}>
					<StyledFontAwesomeIcon icon={faCalendarCheck} color="#4DA806" />
					&nbsp;끝낸 일
				</Link>
			</MainBtnContainer>
			<GroupList>
				{todoGroups.map((group) => (
					<GroupItem key={group.id}>
						<div className="todo_group_item_name">
							<StyledFontAwesomeIcon icon={faListUl} thema={group.labelThema} />
							&nbsp;{group.name}
						</div>
						<div className="todo_group_item_cnt">
							<Link
								to={`/itemlist/${group.id}`}
								state={{ gName: group.name, gLabelThema: group.labelThema }}
							>
								{group.undoneCnt}&nbsp;
								<FontAwesomeIcon icon={faAngleRight} />
							</Link>
						</div>
					</GroupItem>
				))}
			</GroupList>
		</>
	);
};

export default TodoGroupList;
