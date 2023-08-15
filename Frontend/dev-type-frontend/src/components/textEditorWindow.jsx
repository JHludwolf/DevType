import React from "react";
import TextEditor from "./textEditor";

const TextEditorWindow = () => {
	
    const sampleTexts = [
		[
			`const handleTextChange = (e) => {`,
			`\tconsole.log("Hello World!");`,
			`\tinputLines[idx].split("").map((char, index) => {`,
			`\t\treturn (<div></div>);`,
			`\t});`,
			`}`,
		],
		[
			`let text = "Hello World!";`,
			`console.log(text);`,
			`for (let i = 0; i < text.length; i++) {`,
			`\tconsole.log(text[i]);`,
			`}`,
		],
		[
			`const getCurrentDolarPrice = async () => {`,
			`\tconst response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");`,
			`\tconst data = await response.json();`,
			`\treturn data.bpi.USD.rate;`,
			`}`,
		]
	];

	return (
		<div className="text-edit-window">
			<div className="text-edit-window-header">
				<table width={'100%'}>
					<tr>
						<td width={'20%'}>
							<div className="text-edit-window-header-buttons">
								<div className="text-edit-window-header-button red">.</div>
								<div className="text-edit-window-header-button yellow">.</div>
								<div className="text-edit-window-header-button green">.</div>
							</div>
						</td>
						<td  width={'60%'}>
							<div className="text-edit-window-header-title">src/components/Dashboard/index.jsx</div>
						</td>
						<td width={'20%'}></td>
					</tr>
				</table>
			</div>
			<TextEditor text={sampleTexts[2]}/>
		</div>
	);
};

export default TextEditorWindow;
