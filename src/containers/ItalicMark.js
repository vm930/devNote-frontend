import React, { Component } from 'react';

const ItalicMark = (props) => {
	return <em property="italic">{props.children}</em>;
};

export default ItalicMark;
