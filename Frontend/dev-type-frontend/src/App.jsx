import { useState } from "react";
import "./App.css";

function App() {
	//const text = 'const getFormatedText = () => {\n\tconsole.log("Hello World!);\n}';
	const text = [
		`const handleTextChange = (e) => {`,
		`console.log("Hello World!);`,
		`}`,
	];
	const [input, setInput] = useState("");

	const handleTextChange = (e) => {
		setInput(e.target.value);
	};

	const getFormatedText = () => {
    const inputLines = input.split("\n");
		const numberOfNewlines = inputLines.length - 1;

		return (
			<>
				{text.map((line, idx) => (
					<p key={`line-${idx}`}>
						<>
							{inputLines[idx] ? (
								inputLines[idx].split("").map((char, index) => {
									if (char === line[index]) {
										return (
											<span
												key={`letter-${index}`}
												style={{ color: "#A78BFA" }}
											>
												{char}
											</span>
										);
									} else {
										return (
											<span
												key={`letter-${index}`}
												style={{
													backgroundColor: "#EF4444",
												}}
											>
												{line[index]}
											</span>
										);
									}
								})
							) : (
								<></>
							)}
							{/*<span style={{ color: "#A78BFA" }}>{input.substring(0, input.length)}</span>*/}
							{idx === numberOfNewlines && (
								<span
									style={{
										color: "B8B8B8",
										backgroundColor: "rgb(55, 65, 81)",
									}}
								>
									{line.substring(
										inputLines[idx].length,
										inputLines[idx].length + 1
									)}
								</span>
							)}
							<span style={{ color: "#B8B8B8" }}>
								{line.substring(
									(inputLines[idx]
										? inputLines[idx].length
										: 0) +
										(idx === numberOfNewlines ? 1 : 0)
								)}
							</span>
						</>
					</p>
				))}
			</>
		);
	};

	return (
		<div className="app-div">
			<div className="text-editor-div">
				<textarea
					value={input}
					onChange={handleTextChange}
					autoFocus
					spellCheck="false"
				/>

				<div className="text-div">{getFormatedText()}</div>
			</div>
		</div>
	);
}

export default App;
