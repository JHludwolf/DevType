import React, { useState } from "react";
import "../style/home/textEditor.css";
import { FaArrowTurnDown } from "react-icons/fa6";

const TextEditor = () => {
	//const text = 'const getFormatedText = () => {\n\tconsole.log("Hello World!);\n}';
	const text = [
		`const handleTextChange = (e) => {`,
		`\tconsole.log("Hello World!");`,
		`\tinputLines[idx].split("").map((char, index) => {`,
		`\t\treturn (<div></div>);`,
		`\t});`,
		`}`,
	];
	const [input, setInput] = useState("");
	const [colorIndex, setColorIndex] = useState(2);

	// An array with three  aestheric color palletes for a typewriter theme
	const colors = [
		{
			background: "#1F2937",
			text: "#F3F4F6",
			accent: "#A78BFA",
			error: "#EF4444",
			secondary: "#B8B8B8",
		},
		{
			background: "#1F2937",
			text: "#F3F4F6",
			accent: "#F59E0B",
			error: "#EF4444",
			secondary: "#B8B8B8",
		},
		{
			background: "#1F2937",
			text: "#F3F4F6",
			accent: "#10B981",
			error: "#EF4444",
			secondary: "#B8B8B8",
		},
	];

	const handleTextChange = (e) => {
		setInput(e.target.value);
	};

	const handleKeyDown = (event) => {
		// Prevent arrow key navigation
		if (
			event.key === "ArrowLeft" ||
			event.key === "ArrowRight" ||
			event.key === "ArrowUp" ||
			event.key === "ArrowDown"
		) {
			event.preventDefault();
		}
	};

	const getTabs = (line) => {
		const tabs = line.split("\t").length - 1;

		if (tabs !== 0) {
			return [...Array(tabs)].map((e, i) => <span key={`tab-${i}`}>&nbsp;&nbsp;</span>);
		} else {
			return <></>;
		}
	};

	const getFormatedText = () => {
		const inputLines = input.split("\n");
		const numberOfNewlines = inputLines.length - 1;

		return (
			<>
				{text.map((line, idx) => {
					let cleanLine = line.replaceAll("\t", "");
					const cursorAtEndOfLine = () => {
						if (inputLines[idx]) {
							if(idx === numberOfNewlines) {
								return inputLines[idx].length === cleanLine.length;
							}
						}
						
						return false;
					};

					return (
						<p key={`line-${idx}`}>
							<>
								{idx !== 0 ? getTabs(line) : <></>}
								{inputLines[idx] ? (
									inputLines[idx].split("").map((char, index) => {
										if (char === cleanLine[index]) {
											return (
												<span
													key={`letter-${index}`}
													style={{ color: colors[colorIndex].accent }}
												>
													{char}
												</span>
											);
										} else {
											return (
												<span
													key={`letter-${index}`}
													style={{ backgroundColor: colors[colorIndex].error }}
												>
													{cleanLine[index]}
												</span>
											);
										}
									})
								) : (
									<></>
								)}
								{idx === numberOfNewlines && (
									<span
										style={{
											color: colors[colorIndex].secondary,
											backgroundColor: colors[colorIndex].text,
										}}
									>
										{cleanLine.substring(inputLines[idx].length, inputLines[idx].length + 1)}
									</span>
								)}
								<span style={{ color: colors[colorIndex].secondary }}>
									{cleanLine.substring(
										(inputLines[idx] ? inputLines[idx].length : 0) +
											(idx === numberOfNewlines ? 1 : 0)
									)}
								</span>
								{cursorAtEndOfLine() ? <span className="enter-icon-span"><FaArrowTurnDown className="enter-icon"/></span> : <></>}
							</>
						</p>
					);
				})}
			</>
		);
	};

	return (
		<div className="text-editor-div">
			<textarea
				value={input}
				onChange={handleTextChange}
				onKeyDown={handleKeyDown}
				autoFocus
				spellCheck="false"
			/>
			<div className="text-div">{getFormatedText()}</div>
		</div>
	);
};

export default TextEditor;
