import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollTop from './components/ScrollTop.js';
import Header from './components/Header';
import TodoGroupList from './pages/TodoGroupList';
import TodoAllList from './pages/TodoAllList';
import TodoItemList from './pages/TodoItemList';

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<ScrollTop />
			<div className="app">
				<Header />
				<main>
					<Routes>
						<Route exact path="/" element={<TodoGroupList />} />
						<Route path="/alllist" element={<TodoAllList />} />
						<Route path="/itemlist/:groupId" element={<TodoItemList />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
