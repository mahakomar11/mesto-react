import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
	const { isOpen, onClose, onUpdateUser } = props;
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState(currentUser.name);
	const [about, setAbout] = React.useState(currentUser.about);

	React.useEffect(() => {
		setName(currentUser.name);
		setAbout(currentUser.about);
	}, [currentUser]);

	function handleChangeName(e) {
		setName(e.target.value);
	}

	function handleChangeAbout(e) {
		setAbout(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({ name: name, about: about });
	}

	return (
		<>
			<PopupWithForm
				name="edit-profile"
				title="Редактировать профиль"
				buttonText="Сохранить"
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					name="name"
					value={name}
					id="name"
					className="popup__input popup__input_content_name"
					minLength={2}
					maxLength={40}
					required
					onChange={handleChangeName}
				/>
				<span className="popup__error" id="name-error"></span>
				<input
					type="text"
					name="job"
					value={about}
					id="job"
					className="popup__input popup__input_content_job"
					minLength={2}
					maxLength={200}
					required
					onChange={handleChangeAbout}
				/>
				<span className="popup__error" id="job-error"></span>
			</PopupWithForm>
		</>
	);
}

export default EditProfilePopup;
