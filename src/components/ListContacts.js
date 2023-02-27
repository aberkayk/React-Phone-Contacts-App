import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListContacts = ({ contacts, setDidUpdate, didUpdate }) => {
	const [searchText, setSearchText] = useState("");
	const [searchCategory, setSearchCategory] = useState("");
	const [filteredContacts, setFilteredContacts] = useState(contacts);

	const handleDelete = (id) => {
		if (window.confirm("Are you sure to delete?") === true) {
			axios
				.delete(`http://localhost:3004/contacts/${id}`)
				.then((res) => {
					setDidUpdate(!didUpdate);
				})
				.catch((err) => {});
		}
	};

	useEffect(() => {
		const tempArray = contacts.filter(
			(item) =>
				item.firstName.toLowerCase().includes(searchText.toLowerCase()) ===
					true ||
				item.lastName.toLowerCase().includes(searchText.toLowerCase()) === true
		);
		setFilteredContacts(tempArray);
	}, [searchText]);

	useEffect(() => {
		const arrayTemp = contacts.filter(
			(item) =>
				item.category.toLowerCase().includes(searchCategory.toLowerCase()) ===
				true
		);
		{
			searchCategory === "all"
				? setFilteredContacts(contacts)
				: setFilteredContacts(arrayTemp);
		}
		console.log(arrayTemp);
	}, [searchCategory]);

	return (
		<div className="container my-5 bg-light rounded-3">
			<div className="d-flex justify-content-between mb-3">
				<div className="input-group w-25">
					<select
						className="form-select"
						id="category"
						value={searchCategory}
						onChange={(e) => {
							console.log(e.target.value);
							setSearchCategory(e.target.value);
						}}
					>
						<option value="all">All</option>
						<option value="family">Family</option>
						<option value="friend">Friend</option>
						<option value="business">Business</option>
						<option value="general">General</option>
					</select>
				</div>
				<div>
					<input
						className="form-control me-5 l-w-75"
						type="text"
						placeholder="Search"
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
					/>
				</div>
				<div className="d-flex justify-content-end">
					<Link className="btn btn-primary" to={"/add-contact"}>
						Add Contact
					</Link>
				</div>
			</div>

			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Number</th>
						<th scope="col">Category</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{contacts.length === 0 ? (
						<tr>
							<th className="text-center" colSpan={5}>
								There is not any contact to list
							</th>
						</tr>
					) : (
						<>
							{filteredContacts.map((contact, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>{contact.firstName}</td>
									<td>{contact.lastName}</td>
									<td>+90{contact.number}</td>
									<td>{contact.category}</td>
									<td>
										<button
											onClick={() => {
												handleDelete(contact.id);
											}}
											type="button"
											className="btn btn-sm btn-outline-danger"
										>
											Delete
										</button>
										<Link
											to={`/edit-contact/${contact.id}`}
											className="btn btn-sm btn-outline-secondary"
										>
											Update
										</Link>
									</td>
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ListContacts;
