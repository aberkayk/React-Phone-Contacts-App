import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AddContacts = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [number, setNumber] = useState("");
	const [contacts, setContacts] = useState(null);
	const [category, setCategory] = useState("0");

	const navigate = useNavigate();

	const handleSave = (event) => {
		event.preventDefault();

		if (firstName === "" || lastName === "" || number === "") {
			alert("You must fill all fields");
			return;
		}

		if (category === "0") {
			alert("You must choose a category");
			return;
		}

		const hasContact = contacts.find((item) => item.number === number);

		if (hasContact !== undefined) {
			alert(`${number} is already exists`);
			return;
		}

		const newContact = {
			id: String(new Date().getTime()),
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
			number: "0"+number,
			category: category.charAt(0).toUpperCase() + category.slice(1),
		};

		axios
			.post("http://localhost:3004/contacts", newContact)
			.then((res) => {
				navigate("/");
			})
			.catch((err) => {});
	};

	useEffect(() => {
		axios
			.get("http://localhost:3004/contacts")
			.then((res) => {
				setContacts(res.data);
			})
			.catch((err) => {});
	}, []);

	if (contacts === null) return null;

	return (
		<div>
			<Header />
			<div className="container d-flex justify-content-center mt-5 p-3 text-primary bg-light rounded-3">
				<h1>Add Contact</h1>
			</div>
			<div className="container mb-5 bg-light">
				<form onSubmit={handleSave}>
					<div className="mb-3">
						<label htmlFor="firstName" className="form-label">
							First Name
						</label>
						<input
							type="text"
							className="form-control"
							id="firstName"
							placeholder="e.g. Alex"
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
							placeholder="e.g. Doe"
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="number" className="form-label">
							Phone Number <small>(Please type without "0")</small>
						</label>
						<input
							type="tel"
							className="form-control"
							id="number"
							placeholder="e.g. 5323332211"
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
							<option value="0">Select Category</option>
							<option value="family">Family</option>
							<option value="friend">Friend</option>
							<option value="business">Business</option>
							<option value="general">General</option>
						</select>
					</div>
					<div className="d-flex justify-content-center">
						<button type="submit" className="btn btn-primary w-50 mb-3">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddContacts;
