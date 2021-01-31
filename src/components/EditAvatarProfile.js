import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarProfile(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: avatarRef.current.value})
  }

	return (
		<>
			<PopupWithForm
				name="edit-avatar"
				title="Обновить аватар"
				buttonText="Сохранить"
				isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
			>
				<input
          ref={avatarRef}
					type="url"
					name="link"
					id="link"
					className="popup__input popup__input_content_link-avatar"
					placeholder="Ссылка на картинку"
					required
				/>
				<span className="popup__error" id="link-error"></span>
			</PopupWithForm>
		</>
	);
}

export default EditAvatarProfile;
