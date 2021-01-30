import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import spinnerPath from "../images/spinner.gif";

function App() {
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
		false
	);
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({
		name: "",
		link: "",
	});
	const [currentUser, setCurrentUser] = React.useState({
		id: "",
		name: "...",
		about: "...",
		avatar: spinnerPath,
	});

	React.useEffect(() => {
		api
			.getUserInfo()
			.then((data) => {
				setCurrentUser({
					id: data._id,
					name: data.name,
					about: data.about,
					avatar: data.avatar,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setEditAvatarPopupOpen(true);
	}

	function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function closeAllPopups() {
		setEditProfilePopupOpen(false);
		setEditAvatarPopupOpen(false);
		setAddPlacePopupOpen(false);
		setSelectedCard({ name: "", link: "" });
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header />
				<Main
					onEditProfile={handleEditProfileClick}
					onEditAvatar={handleEditAvatarClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
				/>
				<Footer />
				<PopupWithForm
					name="edit-profile"
					title="Редактировать профиль"
					buttonText="Сохранить"
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
				>
					<input
						type="text"
						name="name"
						id="name"
						className="popup__input popup__input_content_name"
						minLength={2}
						maxLength={40}
						required
					/>
					<span className="popup__error" id="name-error"></span>
					<input
						type="text"
						name="job"
						id="job"
						className="popup__input popup__input_content_job"
						minLength={2}
						maxLength={200}
						required
					/>
					<span className="popup__error" id="job-error"></span>
				</PopupWithForm>
				<PopupWithForm
					name="edit-avatar"
					title="Обновить аватар"
					buttonText="Сохранить"
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
				>
					<input
						type="url"
						name="link"
						id="link"
						className="popup__input popup__input_content_link-avatar"
						placeholder="Ссылка на картинку"
						required
					/>
					<span className="popup__error" id="link-error"></span>
				</PopupWithForm>
				<PopupWithForm
					name="add-card"
					title="Новое место"
					buttonText="Создать"
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
				>
					<input
						type="text"
						name="title"
						id="title"
						className="popup__input popup__input_content_title"
						placeholder="Название"
						minLength={2}
						maxLength={30}
						required
					/>
					<span className="popup__error" id="title-error"></span>
					<input
						type="url"
						name="link"
						id="link"
						className="popup__input popup__input_content_link"
						placeholder="Ссылка на картинку"
						required
					/>
					<span className="popup__error" id="link-error"></span>
				</PopupWithForm>
				<PopupWithForm
					name="delete-card"
					title="Вы уверены?"
					buttonText="Да"
					onClose={closeAllPopups}
				></PopupWithForm>
				<ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
