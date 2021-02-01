function ImagePopup(props) {
	const {card, onClose} = props;
	return (
		<section
			className={`popup popup_type_show-card ${card.link && "popup_opened"}`}
		>
			<figure className="popup__figure">
				<img
					src={card.link}
					alt={`Фото, ${card.name}`}
					className="popup__photo"
				/>
				<figcaption className="popup__caption">{card.name}</figcaption>
				<button
					type="button"
					area-label="Close"
					className="popup__close-button"
					onClick={onClose}
				></button>
			</figure>
		</section>
	);
}

export default ImagePopup;
