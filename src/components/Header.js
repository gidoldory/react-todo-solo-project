import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import TodoTopText from '../img/todo_top_text.png';
import { useState } from 'react';
import TodoGroupFormModal from './TodoGroupFormModal';

const Header = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<header>
			<button className="btn_search">
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</button>
			<img className="top_text" src={TodoTopText} alt="today todo" />
			<button className="btn_group_add" onClick={() => setIsModalOpen(true)}>
				┿
			</button>
			{isModalOpen && <TodoGroupFormModal modalClose={modalClose} />}
		</header>
	);
};

export default Header;
