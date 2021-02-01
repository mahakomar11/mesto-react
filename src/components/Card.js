import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
	const { card, onCardClick, onLikeClick, onDeleteClick } = props;
	const currentUser = React.useContext(CurrentUserContext);

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onLikeClick(card);
	}

	function handleDeleteClick() {
		onDeleteClick(card);
	}

	const isMine = card.owner._id === currentUser.id;
	const isLiked = card.likes.some((user) => user._id === currentUser.id);

	return (
		<li className="place">
			<div className="place__photo-container" onClick={handleClick}>
				<img
					src={card.link}
					alt={`Фото, ${card.name}`}
					className="place__photo"
				/>
			</div>
			<button
				type="button"
				area-label="Delete"
				className={`place__icon-delete ${
					isMine && "place__icon-delete_active"
				}`}
				onClick={handleDeleteClick}
			></button>
			<div className="place__description">
				<h2 className="place__title">{card.name}</h2>
				<div className="place__like-area">
					<button
						type="button"
						area-label="Like"
						className={`place__icon-like ${
							isLiked && "place__icon-like_active"
						}`}
						onClick={handleLikeClick}
					></button>
					<p className="place__like-count">{card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}

export default Card;
