function ImagePopup(props) {
	return (
		<section
			className={`popup popup_type_show-card ${props.card.name && "popup_opened"}`}
		>
			<figure className="popup__figure">
				<img
					src={props.card.link ? props.card.link : ""}
					alt={`Фото, ${props.card.name}`}
					className="popup__photo"
				/>
				<figcaption className="popup__caption">{props.card.name}</figcaption>
				<button
					type="button"
					area-label="Close"
					className="popup__close-button"
					onClick={props.onClose}
				></button>
			</figure>
		</section>
	);
}

export default ImagePopup;
