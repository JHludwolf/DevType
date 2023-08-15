import React from "react";
import TextEditor from "./textEditor";

const TextEditorWindow = () => {
	// div that simulates a macos window
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
			<TextEditor />
		</div>
	);
};

export default TextEditorWindow;
