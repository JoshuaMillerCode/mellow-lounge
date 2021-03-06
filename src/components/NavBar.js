import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
	return (
		<nav className="NavBar">
			{props.routes
				.filter(item => !item.path.includes(':'))
				.map(({ key, path }) => (
					<Link className="links" key={key} to={path}>
						{key}
					</Link>
				))}
		</nav>
	);
};

export default NavBar;
