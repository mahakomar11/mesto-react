import React from "react";
import api from "../utils/api";
import spinnerPath from "../images/spinner.gif";
import Card from "./Card";

function Main(props) {
	const [userName, setUserName] = React.useState("...");
	const [userDescription, setUserDescription] = React.useState("...");
	const [userAvatar, setUserAvatar] = React.useState(spinnerPath);
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
			([userData, cardsData]) => {
				setUserName(userData.name);
				setUserDescription(userData.about);
				setUserAvatar(userData.avatar);
				setCards(cardsData);
			}
		);
	});

	return (
		<main>
			<section className="profile">
				<img
					src={userAvatar}
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
					<h1 className="profile__name">{userName}</h1>
					<button
						type="button"
						area-label="Edit"
						className="profile__edit-button"
						onClick={props.onEditProfile}
					></button>
					<p className="profile__job">{userDescription}</p>
				</div>
				<button
					type="button"
					className="profile__add-button"
					onClick={props.onAddPlace}
				></button>
			</section>

			<section className="places">
				<ul className="places__grid">
					{cards.map((card, i) => (
						<li className="place" key={i}>
							<Card card={card} onCardClick={props.onCardClick}/>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}

export default Main;
