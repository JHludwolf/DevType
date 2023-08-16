import React, { useState } from "react";
import TextEditorWindow from "../components/textEditorWindow";
import "../style/home/home.css";

import sampleCode from "../resources/sampleCode.json";
import { useSelector } from "react-redux";
import PageTitle from "../components/pageTitle";

const Home = () => {
	const colors = useSelector((state) => state.theme.colors);

	//chose a random code
	const code = sampleCode['python']['general'][Math.floor(Math.random() * sampleCode['javascript']['react'].length)];

	return (
		<div className="home-div" style={{ backgroundColor: colors.background }}>
			<PageTitle />
			<TextEditorWindow text={code}/>
		</div>
	);
};

export default Home;
