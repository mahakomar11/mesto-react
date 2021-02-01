function PopupWithForm(props) {
	const {name, title, isOpen, onSubmit, onClose, buttonText, children} = props;
	return (
		<section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
			<div className={`popup__container popup__container_type_${name}`}>
				<h2 className="popup__title">{title}</h2>
				<form name={name} className="popup__form" onSubmit={onSubmit}>
          {children}
					<button type="submit" className="popup__submit-button">
						{buttonText}
					</button>
				</form>
				<button
					type="button"
					area-label="Close"
					className="popup__close-button"
					onClick={onClose}
				></button>
			</div>
		</section>
	);
}

export default PopupWithForm;
