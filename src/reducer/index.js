const initialState = {
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'A line of text in a paragraph.'
							}
						]
					}
				]
			}
		]
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
