function PopupWithForm(props) {
	return (
		<section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
			<div className={`popup__container popup__container_type_${props.name}`}>
				<h2 className="popup__title">{props.title}</h2>
				<form name={props.name} className="popup__form">
          {props.children}
					<button type="submit" className="popup__submit-button">
						{props.buttonText}
					</button>
				</form>
				<button
					type="button"
					area-label="Close"
					className="popup__close-button"
					onClick={props.onClose}
				></button>
			</div>
		</section>
	);
}

export default PopupWithForm;
