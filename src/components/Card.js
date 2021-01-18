function Card(props) {
	function handleClick() {
		props.onCardClick(props.card);
	}

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
				className="place__icon-delete"
			></button>
			<div className="place__description">
				<h2 className="place__title">{props.card.name}</h2>
				<div className="place__like-area">
					<button
						type="button"
						area-label="Like"
						className="place__icon-like"
					></button>
					<p className="place__like-count">{props.card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}

export default Card;
