import { useState } from "react";
import "./App.css";

function App() {
	//const text = 'const getFormatedText = () => {\n\tconsole.log("Hello World!);\n}';
  const text = 'Hola Mundo desde React.js!';
	const [input, setInput] = useState("");

	const handleTextChange = (e) => {
		if (e.target.value === text.substring(0, text.length - 1)) {
			setInput((prevState) =>
				prevState.substring(0, prevState.length - 1)
			);
		} else {
			setInput(
				(prevState) => prevState + e.target.value.replace(text, "")
			);
		}
		console.log(input);
	};

  const getTextWithSpacing = () => {
    return text.replace(/\n/g, '<br/>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  }

	const getFormatedText = () => {
		return (
			<>
				{input.split("").map((char, index) => {
					if (char === text[index]) {
						return <span key={`letter-${index}`} style={{ color: "#A78BFA" }}>{char}</span>;
					} else {
						return (
							<span key={`letter-${index}`} style={{ backgroundColor: "#EF4444" }}>
								{text[index]}
							</span>
						);
					}
				})}
				{/*<span style={{ color: "#A78BFA" }}>{input.substring(0, input.length)}</span>*/}
				<span
					style={{
						color: "B8B8B8",
						backgroundColor: "rgb(55, 65, 81)",
					}}
				>
					{text.substring(input.length, input.length + 1)}
				</span>
				<span style={{ color: "#B8B8B8" }}>
					{text.substring(input.length + 1)}
				</span>
			</>
		);
	};

	return (
		<div className="app-div">
			<div className="text-editor-div">
				<textarea
					value={text}
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
