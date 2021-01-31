import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
	const [cardName, setCardName] = React.useState();
	const [cardLink, setCardLink] = React.useState();

	React.useEffect(() => {
    setCardName('');
    setCardLink('');
	}, [props.isOpen]);

	function handleChangeCardName(e) {
		setCardName(e.target.value);
	}

	function handleChangeCardLink(e) {
		setCardLink(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onAddPlace({ name: cardName, link: cardLink });
	}

	return (
		<>
			<PopupWithForm
				name="add-card"
				title="Новое место"
				buttonText="Создать"
				isOpen={props.isOpen}
				onClose={props.onClose}
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					name="title"
					value={cardName}
					id="title"
					className="popup__input popup__input_content_title"
					placeholder="Название"
					minLength={2}
					maxLength={30}
					required
					onChange={handleChangeCardName}
				/>
				<span className="popup__error" id="title-error"></span>
				<input
					type="url"
					name="link"
					value={cardLink}
					id="link"
					className="popup__input popup__input_content_link"
					placeholder="Ссылка на картинку"
					required
					onChange={handleChangeCardLink}
				/>
				<span className="popup__error" id="link-error"></span>
			</PopupWithForm>
		</>
	);
}

export default AddPlacePopup;
