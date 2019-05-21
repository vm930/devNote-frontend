import React, { Component } from 'react';

const Code = (props) => {
	return <code {...props.attributes}>{props.children}</code>;
};

export default Code;
