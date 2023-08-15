import { useState } from "react";
import "./App.css";
import Home from "./pages/home";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
	// Returns a react router with Home component
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
