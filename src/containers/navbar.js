import React, { Component } from 'react';

const navbar = (props) => {
	function handleClick(props) {
		return this.props.logout();
	}

	return (
		<React.Fragment>
			<div className="navNarrow">
				<i className="fa fa-bars fa-2x" />
				<div className="narrowLinks">
					{/* <button onClick={handleClick}>Log Out</button> */}
					<a href="#">Link 1</a>
					<a href="#">Link 2</a>
					<a href="#">Link 3</a>
				</div>
			</div>
		</React.Fragment>
	);
};
export default navbar;
