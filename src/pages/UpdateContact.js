import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const UpdateContact = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [number, setNumber] = useState("");
	const [category, setCategory] = useState("");

	const [willUpdateContact, setWillUpdateContact] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`http://localhost:3004/contacts/${params.contactId}`)
			.then((res) => {
				setWillUpdateContact(res.data);
				setFirstName(res.data.firstName);
				setLastName(res.data.lastName);
				setNumber(res.data.number);
				setCategory(res.data.category)
			})
			.catch((err) => {});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (firstName === "" || lastName === "" || number === "") {
			alert("Inputs must be filled");
			return;
		}

		const updatedContact = {
			id: params.contactId,
			firstName: firstName
				.toLowerCase()
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" "),
			lastName: lastName
				.toLowerCase()
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" "),
			number: number,
			category: category.charAt(0).toUpperCase()+category.slice(1)
		};

		axios
			.put(`http://localhost:3004/contacts/${params.contactId}`, updatedContact)
			.then((res) => {
				navigate("/");
			})
			.catch((err) => {
				alert("There is an error occured while updating contact.");
			});
	};

	if (willUpdateContact === null) {
		return null;
	}

	return (
		<div>
			<Header />
			<div className="container my-5">
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="firstName" className="form-label">
							First Name
						</label>
						<input
							type="text"
							className="form-control"
							id="firstName"
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="lastName" className="form-label">
							Last Name
						</label>
						<input
							type="text"
							className="form-control"
							id="lastName"
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="number" className="form-label">
							Phone Number
						</label>
						<input
							type="tel"
							className="form-control"
							id="number"
							maxLength={10}
							minLength={10}
							value={number}
							onChange={(e) => {
								setNumber(e.target.value);
							}}
						/>
					</div>
					<div className="input-group my-4">
						<label
							className="input-group-text bg-secondary text-light"
							htmlFor="category"
						>
							Category
						</label>
						<select
							className="form-select"
							id="category"
							value={category}
							onChange={(e) => {
								setCategory(e.target.value);
								console.log(e.target.value);
							}}
						>
							<option value="family">Family</option>
							<option value="friend">Friend</option>
							<option value="business">Business</option>
							<option value="general">General</option>
						</select>
					</div>
					<div className="d-flex justify-content-center my-5">
						<button className="btn btn-primary w-50">Update</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateContact;
