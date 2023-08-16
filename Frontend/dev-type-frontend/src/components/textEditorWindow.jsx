import React, { useEffect, useRef, useState } from "react";
import TextEditor from "./textEditor";
import { RiSettings5Fill } from "react-icons/ri";
import SettingsModal from "./settingsModal";
import { useSelector } from "react-redux";

const TextEditorWindow = ({ text }) => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const colors = useSelector((state) => state.theme.colors);

	const renderOptions = () => {
		let options = [];
		for (let i = 8; i <= 46; i += 2) {
			options.push(<option value={i}>{i}</option>);
		}
		return options;
	};

	const toggleModal = () => {
		setIsSettingsOpen(!isSettingsOpen);
	};

	return (
		<div className="text-edit-window">
			<div className="text-edit-window-header" style={{ backgroundColor: colors.window }}>
				<table width={"100%"}>
					<tbody>
						<tr>
							<td width={"20%"}>
								<div className="text-edit-window-header-buttons">
									<div
										className="text-edit-window-header-button"
										style={{ backgroundColor: colors.text }}
									>
										.
									</div>
									<div
										className="text-edit-window-header-button"
										style={{ backgroundColor: colors.text }}
									>
										.
									</div>
									<div
										className="text-edit-window-header-button"
										style={{ backgroundColor: colors.text }}
									>
										.
									</div>
								</div>
							</td>
							<td width={"60%"}>
								<div className="text-edit-window-header-title" style={{ color: colors.text }}>
									src/components/Dashboard/index.jsx
								</div>
							</td>
							<td width={"20%"}>
								<div className="text-edit-window-header-settings" onClick={toggleModal}>
									<RiSettings5Fill className="settings-icon" style={{ color: colors.text }} />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<TextEditor text={text} />
			{isSettingsOpen ? <SettingsModal toggleModal={toggleModal} /> : null}
		</div>
	);
};

export default TextEditorWindow;
