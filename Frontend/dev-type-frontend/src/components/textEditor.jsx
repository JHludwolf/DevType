import React, { useState } from "react";
import "../style/home/textEditor.css";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useSelector } from "react-redux";

const TextEditor = ({ text }) => {
	
	const [input, setInput] = useState("");
	const colors = useSelector((state) => state.theme.colors);

	const handleTextChange = (e) => {
		setInput(e.target.value);

		console.log(text.join("\n"));
		console.log(e.target.value);
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
						if (inputLines[idx] && idx === numberOfNewlines) {
							return inputLines[idx].length === cleanLine.length;
						}
						return false;
					};

					return (
						<p key={`line-${idx}`} className="editor-line">
							<>
								{idx !== 0 ? getTabs(line) : <></>}
								{inputLines[idx] ? (
									inputLines[idx].split("").map((char, index) => {
										if (char === cleanLine[index]) {
											return (
												<span
													key={`letter-${index}`}
													style={{ color: colors.accent }}
												>
													{char}
												</span>
											);
										} else {
											return (
												<span
													key={`letter-${index}`}
													style={{ color: colors.text, backgroundColor: colors.error }}
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
											color: colors.text,
											backgroundColor: colors.cursor,
										}}
									>
										{cleanLine.substring(inputLines[idx].length, inputLines[idx].length + 1)}
									</span>
								)}
								<span style={{ color: colors.text }}>
									{cleanLine.substring(
										(inputLines[idx] ? inputLines[idx].length : 0) +
											(idx === numberOfNewlines ? 1 : 0)
									)}
								</span>
								{cursorAtEndOfLine() ? (
									<span className="enter-icon-span">
										<FaArrowTurnDown className="enter-icon" style={{color: colors.accent}}/>
									</span>
								) : (
									<></>
								)}
							</>
						</p>
					);
				})}
			</>
		);
	};

	return (
		<div className="text-editor-div" style={{backgroundColor: colors.window}}>
			<textarea
				value={input}
				onChange={handleTextChange}
				onKeyDown={handleKeyDown}
				autoFocus
				autoComplete="off"
				onBlur={(e) => e.target.focus()}
				spellCheck="false"
			/>
			<div className="text-div">{getFormatedText()}</div>
		</div>
	);
};

export default TextEditor;
