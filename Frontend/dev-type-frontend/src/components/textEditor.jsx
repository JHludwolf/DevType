import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../style/home/textEditor.css";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import LoadingText from "./loadingText";

const TextEditor = ({ text }) => {
	// Validate the props
	const [input, setInput] = useState("");
	const colors = useSelector((state) => state.theme.colors);
	const [isEndOfLine, setIsEndOfLine] = useState(false);

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

		// If enter is pressed and the cursor is at the end of the line
		if (event.key === "Enter" && !isEndOfLine) {
			event.preventDefault();
		} else if (isEndOfLine && event.key !== "Enter" && event.key !== "Backspace") {
			setIsEndOfLine(false);
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

	// Check if the cursor is at the end of the line
	useEffect(() => {
		let lenghts = 0;

		for (let i = 0; i < text.length; i++) {
			let cleanLine = text[i].replaceAll("\t", "");

			if (input.length !== 0) {
				//let cleanInput = input.replaceAll("\n", "");

				if (input.length === lenghts + cleanLine.length) {
					setIsEndOfLine(true);
					break;
				}

				/*if (isEndOfLine && input.length > lenghts + text[i].length) {
					setInput(input.substring(0, lenghts + text[i].length) + "\n");
					setIsEndOfLine(false);
					break;
				}*/
			}
			lenghts += cleanLine.length + 1;
			setIsEndOfLine(false);
		}
	}, [input, text]);

	const getFormatedText = () => {
		const inputLines = input.split("\n");
		const numberOfNewlines = inputLines.length - 1;

		return (
			<>
				{text.map((line, idx) => {
					let cleanLine = line.replaceAll("\t", "");

					const cursorAtEndOfLine = () => {
						if (inputLines[idx] && idx === numberOfNewlines) {
							return isEndOfLine;
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
												<span key={`letter-${index}`} style={{ color: colors.accent }}>
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
										<FaArrowTurnDown className="enter-icon" style={{ color: colors.accent }} />
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
		<div className="text-editor-div" style={{ backgroundColor: colors.window }}>
			<textarea
				value={input}
				onChange={handleTextChange}
				onKeyDown={handleKeyDown}
				autoFocus
				autoComplete="off"
				onBlur={(e) => e.target.focus()}
				spellCheck="false"
			/>
			<div className="text-div">{text ? getFormatedText() : <LoadingText />}</div>
		</div>
	);
};

TextEditor.propTypes = {
	// text is required to be array
	text: PropTypes.array.isRequired,
};

export default TextEditor;
