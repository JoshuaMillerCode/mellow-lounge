import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Show(props) {
	const [singleSong, setSingleSong] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/songs/${props.match.params.id}`);
				const data = await response.json();
				setSingleSong(data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return <div className="song-container"></div>;
}
