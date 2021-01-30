import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);

	function handleClick() {
		props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onLikeClick(props.card);
	}

	const isMine = props.card.owner === currentUser.id;
	const isLiked = props.card.likes.some(user => user._id === currentUser.id);

	return (
		<li className="place">
			<div className="place__photo-container" onClick={handleClick}>
				<img
					src={props.card.link}
					alt={`Фото, ${props.card.name}`}
					className="place__photo"
				/>
			</div>
			<button
				type="button"
				area-label="Delete"
				className={`place__icon-delete ${isMine && 'place__icon-delete_active'}`}
			></button>
			<div className="place__description">
				<h2 className="place__title">{props.card.name}</h2>
				<div className="place__like-area">
					<button
						type="button"
						area-label="Like"
						className={`place__icon-like ${isLiked && 'place__icon-like_active'}`}
						onClick={handleLikeClick}
					></button>
					<p className="place__like-count">{props.card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}

export default Card;
