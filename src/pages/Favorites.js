import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites(props) {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/songs');
				const data = await response.json();
				await setFavorites(data);
			} catch (error) {
				console.error(error);
			}
		})();
	});

	return (
		<div className="FavoritePage">
			<h1>Your Favorites</h1>
			<div className="result-container">
				{favorites.map(item => {
					return (
						<div className="results" key={item._id}>
							{item.img ? <img src={item.img} /> : 'N/A'}
							{item.song ? <h2>{item.song}</h2> : 'N/A'}
							<h3>{item.artist}</h3>
							<Link to={`/${item._id}`} className="show-link">
								View
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}
