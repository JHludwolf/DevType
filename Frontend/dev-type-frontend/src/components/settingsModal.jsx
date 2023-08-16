import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../actions/themeActions";

import themes from "../resources/themes.json";

import "../style/home/settingsModal.css";

const SettingsModal = ({ toggleModal }) => {
	const wrapperRef = useRef(null);
	const dispatch = useDispatch();
	const colors = useSelector((state) => state.theme.colors);

	const renderOptions = () => {
		const keys = Object.keys(themes);

		return keys.map((key) => {
			return (
				<option value={key} key={key}>
					{key.charAt(0).toUpperCase() + key.slice(1)}
				</option>
			);
		});
	};

	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					toggleModal();
				}
			}
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	const handleThemeChange = (e) => {
		dispatch(changeTheme(e.target.value));
	};

	useOutsideAlerter(wrapperRef);

	return (
		<div className={"settings-modal"}>
			<div className="settings-modal-window" ref={wrapperRef}>
				<div className="settings-modal-header" style={{ backgroundColor: colors.window }}>
					<table width={"100%"}>
						<tbody>
							<tr>
								<td width={"20%"}>
									<div className="text-edit-window-header-buttons">
										<div
											className="text-edit-window-header-button"
											onClick={toggleModal}
											style={{ backgroundColor: colors.error }}
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
										src/devtype.config.json
									</div>
								</td>
								<td width={"20%"}></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="settings-modal-body" style={{ backgroundColor: colors.window }}>
					<div className="settings-modal-body-title" style={{ color: colors.accent }}>
						Settings
					</div>
					<table>
						<tbody>
							<tr>
								<td width={"50%"}>
									<div className="settings-modal-body-subtitle" style={{ color: colors.text }}>
										Theme
									</div>
								</td>
								<td width={"50%"}>
									<div className="settings-modal-body-theme">
										<select onChange={handleThemeChange}>{renderOptions()}</select>
									</div>
								</td>
							</tr>
							<tr>
								<td width={"50%"}>
									<div className="settings-modal-body-subtitle" style={{ color: colors.text }}>
										Language
									</div>
								</td>
								<td width={"50%"}>
									<div className="settings-modal-body-language">
										<select>
											<option value="js">Javascript</option>
											<option value="py">Python</option>
											<option value="java">Java</option>
											<option value="c">C</option>
											<option value="cpp">C++</option>
										</select>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default SettingsModal;
