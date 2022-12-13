export const initialGroupList = [
	{ id: 1, name: '할 일', labelColor: 'red', sortNum: 1, itemCnt: 3 },
	{ id: 2, name: '장보기', labelColor: 'blue', sortNum: 1, itemCnt: 1 },
	{ id: 3, name: '독서', labelColor: 'purple', sortNum: 1, itemCnt: 0 },
];

export const ititialTodoList = [
	{
		id: 1,
		text: '밥 먹기',
		groupId: 1,
		done: true,
		flag: false,
		createAt: '2022-12-02T10:04:01.901Z',
	},
	{
		id: 2,
		text: '잠 자기',
		groupId: 1,
		done: false,
		flag: true,
		createAt: '2022-12-03T10:04:01.901Z',
	},
	{
		id: 3,
		text: '청소 하기',
		groupId: 1,
		done: true,
		flag: false,
		createAt: '2022-12-04T10:04:01.901Z',
	},
	{
		id: 4,
		text: '과일 구매',
		groupId: 2,
		done: false,
		flag: true,
		createAt: '2022-12-05T10:04:01.901Z',
	},
];
