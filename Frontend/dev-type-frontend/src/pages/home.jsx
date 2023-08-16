import React, { useState } from "react";
import TextEditorWindow from "../components/textEditorWindow";
import "../style/home/home.css";

import sampleCode from "../resources/sampleCode.json";
import { useSelector } from "react-redux";

const Home = () => {
	const colors = useSelector((state) => state.theme.colors);
	// q: What is the copyright symbol?
	// a: &copy;

	//chose a random code
	const code = sampleCode['javascript']['react'][Math.floor(Math.random() * sampleCode['javascript']['react'].length)];

	return (
		<div className="home-div" style={{ backgroundColor: colors.background }}>
			<h1 className="home-h1" style={{color: colors.accent}}>DevType</h1>
			<h2 className="home-h2" style={{color: colors.text}}>A typing test for developers</h2>
			<h3 className="home-h3" style={{color: colors.text}}>By Dinamita &copy; </h3>
			<TextEditorWindow text={code}/>
		</div>
	);
};

export default Home;
