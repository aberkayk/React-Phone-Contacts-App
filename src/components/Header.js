import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<nav className="navbar navbar-expand-sm navbar-dark bg-secondary">
				<div className="container-fluid">
					<div className="navbar-brand">
						Phone Contacts
					</div>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link active" to={"/"}>
									Home
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
