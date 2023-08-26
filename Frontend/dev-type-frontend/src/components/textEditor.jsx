import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../style/home/textEditor.css";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import LoadingText from "./loadingText";

const TextEditor = ({ text, displayTime }) => {
	// Validate the props
	const [input, setInput] = useState("");
	const colors = useSelector((state) => state.theme.colors);
	const [prevChar, setPrevChar] = useState("");
	const [isEndOfLine, setIsEndOfLine] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	
	const [startTime, setStartTime] = useState(null);

	const handleTextChange = (e) => {
		setInput(e.target.value);
	};

	// q: How would you add a timer to count the time it takes to type the code?
	// a: I would add a timer to the text editor component and start it when the user starts typing
	//    and stop it when the user finishes typing. I would then pass the time to the parent component
	//	and display it there.
	// q: How do you pass the time to the parent component?
	// a: I would pass a function to the text editor component that would be called when the user finishes typing

	// Function to start the timer
	const startTimer = () => {
		const startTime = new Date();
		setStartTime(startTime);
	};

	

	const handleKeyDown = (event) => {
		// If the user starts typing start the timer
		if (!isTyping) {
			startTimer();
			setIsTyping(true);
		}

		// Prevent arrow key navigation
		if (
			event.key === "ArrowLeft" ||
			event.key === "ArrowRight" ||
			event.key === "ArrowUp" ||
			event.key === "ArrowDown"
		) {
			event.preventDefault();
		}

		// If prevChar is a space and event.key is a space prevent default
		if (prevChar === " " && event.key === " ") {
			console.log("prevent double space");
			event.preventDefault();
		}

		// If enter is pressed and the cursor is at the end of the line
		if (event.key === "Enter" && !isEndOfLine) {
			event.preventDefault();
		}
		
		if (isEndOfLine && event.key !== "Enter" && event.key !== "Backspace") {
			event.preventDefault();
		}
		setPrevChar(event.key);
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
		// if input and text are the same length then the user has finished typing
		// and the timer should stop
		if (input.replaceAll('\n', '').length === text.join("").length) {
			//setIsTyping(false);
			displayTime(startTime);
		}

		let lengths = 0;

		for (const line of text) {
			const cleanLine = line.replaceAll("\t", "");
		
			if (input.length !== 0) {
				// const cleanInput = input.replaceAll("\n", "");
		
				if (input.length === lengths + cleanLine.length) {
					console.log("end of line");
					setIsEndOfLine(true);
					break;
				}
		
				/* if (isEndOfLine && input.length > lengths + line.length) {
					setInput(input.substring(0, lengths + line.length) + "\n");
					setIsEndOfLine(false);
					break;
				} */
			}
			lengths += cleanLine.length + 1;
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
