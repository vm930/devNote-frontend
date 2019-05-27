import React from 'react';

const Underline = (props) => {
	return <u {...props.attributes}>{props.children}</u>;
};

export default Underline;
