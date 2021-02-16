import React, { useState, useEffect } from 'react';
import { replaceOne } from '../../models/song';

export default function Show(props) {
	const [singleSong, setSingleSong] = useState([]);
	const [lyrics, setLyrics] = useState({});

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

	return (
		<div>
			<div className="song-container">
				<img src={singleSong.img} />
				<h2>{singleSong.song}</h2>
				<h4>{singleSong.artist}</h4>
			</div>
			<aside className="lyric-container">
				<button
					onClick={async () => {
						try {
							const response = await fetch(
								`https://api.lyrics.ovh/v1/${singleSong.artist}/${singleSong.song}`
							);
							const data = await response.json();
							await setLyrics(data);
						} catch (error) {
							console.error(error);
						}
					}}
				>
					Get Lyrics
				</button>
				<div className="lyrics">
					{Object.keys(lyrics).length ? (
						<p>{lyrics.lyrics}</p>
					) : (
						'Lyrics not Available:('
					)}
				</div>
			</aside>
		</div>
	);
}
