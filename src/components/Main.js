import React from "react";
import api from "../utils/api";
import spinnerPath from "../images/spinner.gif";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api
			.getInitialCards()
			.then((data) => {
				setCards(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const currentUser = React.useContext(CurrentUserContext);

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

	return (
		<main>
			<section className="profile">
				<img
					src={currentUser.avatar}
					alt="Аватар профиля"
					className="profile__avatar"
				/>
				<button
					type="button"
					area-label="Edit"
					className="profile__edit-avatar-button"
					onClick={props.onEditAvatar}
				></button>
				<div className="profile__info">
					<h1 className="profile__name">{currentUser.name}</h1>
					<button
						type="button"
						area-label="Edit"
						className="profile__edit-button"
						onClick={props.onEditProfile}
					></button>
					<p className="profile__job">{currentUser.about}</p>
				</div>
				<button
					type="button"
					className="profile__add-button"
					onClick={props.onAddPlace}
				></button>
			</section>

			<section className="places">
				<ul className="places__grid">
					{cards.map((card) => (
						<Card
							card={card}
							onCardClick={props.onCardClick}
							onLikeClick={handleCardLike}
							key={card._id}
						/>
					))}
				</ul>
			</section>
		</main>
	);
}

export default Main;
