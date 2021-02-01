import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
	const {
		cards,
		onEditProfile,
		onEditAvatar,
		onAddPlace,
		onCardClick,
		onCardLike,
		onCardDelete,
	} = props;
	const currentUser = React.useContext(CurrentUserContext);

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
					onClick={onEditAvatar}
				></button>
				<div className="profile__info">
					<h1 className="profile__name">{currentUser.name}</h1>
					<button
						type="button"
						area-label="Edit"
						className="profile__edit-button"
						onClick={onEditProfile}
					></button>
					<p className="profile__job">{currentUser.about}</p>
				</div>
				<button
					type="button"
					className="profile__add-button"
					onClick={onAddPlace}
				></button>
			</section>

			<section className="places">
				<ul className="places__grid">
					{cards.map((card) => (
						<Card
							card={card}
							onCardClick={onCardClick}
							onLikeClick={onCardLike}
							onDeleteClick={onCardDelete}
							key={card._id}
						/>
					))}
				</ul>
			</section>
		</main>
	);
}

export default Main;
