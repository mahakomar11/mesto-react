import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import spinnerPath from "../images/spinner.gif";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarProfile from "./EditAvatarProfile";
import AddPlacePopup from "./AddPlacePopup";

function App() {
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
		false
	);
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({
		id: "",
		name: "...",
		about: "...",
		avatar: spinnerPath,
	});
	const [cards, setCards] = React.useState([]);
	const [selectedCard, setSelectedCard] = React.useState({
		name: "",
		link: "",
	});

	React.useEffect(() => {
		Promise.all([api.getUserInfo(), api.getInitialCards()])
			.then(([userData, cardsData]) => {
				setCurrentUser({
					id: userData._id,
					name: userData.name,
					about: userData.about,
					avatar: userData.avatar,
				});
				setCards(cardsData);
			})
			.catch((err) => console.log(err));
	}, []);

	// Popups handlers
	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setEditAvatarPopupOpen(true);
	}

	function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setEditProfilePopupOpen(false);
		setEditAvatarPopupOpen(false);
		setAddPlacePopupOpen(false);
		setSelectedCard({ name: "", link: "" });
	}

	// Card handlers
	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((user) => user._id === currentUser.id);
		api
			.handleLike(card._id, isLiked)
			.then((newCard) => {
				const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
				setCards(newCards);
			})
			.catch((err) => console.log(err));
	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(() => {
				const newCards = cards.filter((c) => c._id !== card._id);
				setCards(newCards);
			})
			.catch((err) => console.log(err));
	}

	// Add card handler
	function handleAddPlaceSubmit(cardData) {
		api
			.addCard(cardData)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	// Update user's data handlers
	function handleUpdateUser(newInfo) {
		api
			.patchUserInfo(newInfo)
			.then(() => {
				setCurrentUser({
					...currentUser,
					name: newInfo.name,
					about: newInfo.about,
				});
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleUpdateAvatar(newAvatar) {
		api
			.patchUserAvatar(newAvatar.avatar)
			.then(() => {
				setCurrentUser({
					...currentUser,
					avatar: newAvatar.avatar,
				});
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header />
				<Main
					cards={cards}
					onEditProfile={handleEditProfileClick}
					onEditAvatar={handleEditAvatarClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
				/>
				<Footer />
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<EditAvatarProfile
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>
				<PopupWithForm
					name="delete-card"
					title="Вы уверены?"
					buttonText="Да"
					onClose={closeAllPopups}
				/>
				<ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

// TODO: add loading messages to popups
// TODO: add validation
// TODO: add closing popups by click on backroud and by Esc
// TODO: document the code (https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js/)