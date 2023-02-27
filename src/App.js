import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddContacts from "./pages/AddContact";
import Home from "./pages/Home";
import UpdateContact from "./pages/UpdateContact";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-contact" element={<AddContacts />} />
				<Route path="/edit-contact/:contactId" element={<UpdateContact />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
