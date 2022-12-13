import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 적용된 컴포넌트 진입시 페이지 맨 위로 스크롤해주는 커스텀 훅 예제입니다.
const ScrollTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		console.log('scroll top');
		if (window) window.scrollTo(0, 0);
	}, [pathname]);
};

export default ScrollTop;
