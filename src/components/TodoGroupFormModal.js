import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { todoGroupAdd } from '../redux/todoGroupsSlice';

const ModalContainer = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBox = styled.div`
	top: 80px;
	left: 50px;
	/* transform: translate(-50%, -50%); */
	position: absolute;
	width: 275px;
	height: 220px;
	overflow: hidden;
	border-radius: 10px;
	border: 2px solid var(--main-blue-color);
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	background-color: var(--title-bg-color);
	padding: 20px;

	.todo_group_form_buttons {
		display: flex;
		justify-content: space-between;
		height: 30px;

		> button {
			text-decoration: underline;
			color: var(--main-blue-color);
			border: none;
			outline: none;
			background-color: var(--title-bg-color);
		}
	}

	.todo_group_form_thema {
		margin-top: 20px;
		text-align: center;

		[type='radio'] {
			width: 0;
			height: 0;
			opacity: 0;
		}

		[type='radio']:checked + svg {
			outline: 3px solid var(--main-blue-color);
		}
	}

	.todo_group_form_name {
		margin-top: 20px;
		text-align: center;

		[type='text'] {
			width: 90%;
			height: 40px;
			border-radius: 8px;
			border: none;
			text-align: center;
			background-color: #eeeeee;
		}

		[type='text']:focus {
			outline: 1px solid var(--main-blue-color);
		}
	}
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
	padding: 5px;
	border-radius: 20px;
	font-size: 1.5rem;
	background-color: var(--list-icon-${(props) => props.thema});
`;

const TodoGroupFormModal = ({ modalClose }) => {
	const navigate = useNavigate();
	// 라벨 테마 갯수 설정
	const labelThema = [1, 2, 3, 4, 5];
	const dispatch = useDispatch();

	// 할 일 그룹 생성
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		dispatch(
			todoGroupAdd({
				name: form.name.value,
				labelThema: form.label_thema.value,
			})
		);
		modalClose();
		navigate('/');
	};

	return (
		<>
			<ModalContainer>
				<ModalBox>
					<form onSubmit={handleSubmit}>
						<div className="todo_group_form_buttons">
							<button type="button" onClick={() => modalClose()}>
								취소
							</button>
							<button type="submit">완료</button>
						</div>
						<div className="todo_group_form_thema">
							{labelThema.map((no) => (
								<label key={no} htmlFor={`radio${no}`}>
									<input
										type="radio"
										id={`radio${no}`}
										name="label_thema"
										value={`thema${no}`}
										defaultChecked={no === 1 ? true : false}
									/>
									<StyledFontAwesomeIcon
										icon={faListUl}
										thema={`thema${no}`}
										inverse
									/>
									&nbsp;
								</label>
							))}
						</div>
						<div className="todo_group_form_name">
							<input type="text" name="name" placeholder="목록 이름" required />
						</div>
					</form>
				</ModalBox>
			</ModalContainer>
		</>
	);
};

export default TodoGroupFormModal;
