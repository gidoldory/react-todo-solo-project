import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';
import Header from './components/Header';
import TodoGroupList from './pages/TodoGroupList';
import TodoAllList from './pages/TodoAllList';
import TodoItemList from './pages/TodoItemList';

function App() {
	// console.log('--App render--');

	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className="app">
				{/* <div className="fade-out-box">
				<img id="intro_img" src={`${process.env.PUBLIC_URL}/intro.png`} />
			</div> */}
				<Header />
				<main>
					<Routes>
						<Route exact path="./" element={<TodoGroupList />} />
						<Route path="./alllist" element={<TodoAllList />} />
						<Route path="./itemlist/:groupId" element={<TodoItemList />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
