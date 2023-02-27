import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ListContacts from "../components/ListContacts";

const Home = () => {
	const [contacts, setContacts] = useState(null);
	const [didUpdate, setDidUpdate] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:3004/contacts")
			.then((res) => {
				setContacts(res.data);
			})
			.catch((err) => {});
	}, [didUpdate]);

	if (contacts === null) return null;

	return (
		<div>
			<Header />
			<ListContacts
				contacts={contacts}
				didUpdate={didUpdate}
				setDidUpdate={setDidUpdate}
			/>
		</div>
	);
};

export default Home;
