import React, { Component } from 'react';

const List = (props) => {
	return (
		<ul {...props.attributes}>
			<li>{props.children}</li>
		</ul>
	);
};

export default List;
