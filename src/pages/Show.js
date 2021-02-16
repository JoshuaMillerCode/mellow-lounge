import React, { useState, useEffect } from 'react';
import { replaceOne } from '../../models/song';

export default function Show(props) {
	const [singleSong, setSingleSong] = useState([]);
	const [lyrics, setLyrics] = useState({});
	const [didDelete, setDidDelete] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/songs/${props.match.params.id}`);
				const data = await response.json();
				await setSingleSong(data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/songs/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json'
				}
			});
			const data = await response.json();
			setDidDelete(!didDelete);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};

	const handleClick = async () => {
		try {
			const response = await fetch(
				`https://api.lyrics.ovh/v1/${singleSong.artist}/${singleSong.song}`
			);
			const data = await response.json();
			await setLyrics(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="song-container">
				<img src={singleSong.img} />
				<h2>{singleSong.song}</h2>
				<h4>{singleSong.artist}</h4>
				<h5>Type: {singleSong.type}</h5>
				<button onClick={handleDelete}>Remove From Favorites</button>
			</div>
			<aside className="lyric-container">
				<button onClick={handleClick}>Get Lyrics</button>
				<div className="lyrics">
					{singleSong.type ? <p>{lyrics.lyrics}</p> : ''}
				</div>
			</aside>
		</div>
	);
}
