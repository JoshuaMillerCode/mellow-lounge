import React, { useState, useEffect } from 'react';

export default function SearchTrack(props) {
	const [musicResults, setMusicResults] = useState([]);

	const [query, updateQuery] = useState({
		baseURL: 'http://ws.audioscrobbler.com/2.0/?method=track.search',
		type: '&track=',
		searchOption: '',
		apiKey: '&api_key=e5c62ee23fd6bb4b9870020e49b58615',
		format: '&format=json',
		searchURL: ''
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(query.searchURL);
				const data = await response.json();
				await setMusicResults(data.results.trackmatches.track);
			} catch (error) {
				console.error(error);
			} finally {
				updateQuery({
					baseURL: 'http://ws.audioscrobbler.com/2.0/?method=track.search',
					type: '&track=',
					searchOption: '',
					apiKey: '&api_key=e5c62ee23fd6bb4b9870020e49b58615',
					format: '&format=json',
					searchURL: ''
				});
			}
		})();
	}, [query.searchURL]);

	const handleChange = evt => {
		updateQuery({
			...query,
			...{ [evt.target.id]: evt.target.value }
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		updateQuery({
			...query,
			searchURL:
				query.baseURL +
				query.type +
				query.searchOption +
				query.apiKey +
				query.format
		});
	};

	return (
		<div className="SearchPage">
			<form onSubmit={handleSubmit}>
				<label>
					Search Track/Artist:{' '}
					<input type="text" id="searchOption" onChange={handleChange} />
				</label>
				<input type="submit" />
			</form>
			<div className="result-container">
				{musicResults.map((result, index) => {
					return (
						<div className="results" key={index}>
							{result.image[3]['#text'] ? (
								<img src={result.image[3]['#text']} />
							) : (
								'N/A'
							)}
							{result.name ? <h2>{result.name}</h2> : 'N/A'}

							<h3>{result.artist}</h3>
							<button
								onClick={async evt => {
									try {
										const response = await fetch('/api/songs', {
											method: 'POST',
											headers: {
												'Content-type': 'application/json'
											},
											body: JSON.stringify([
												{
													song: result.name,
													artist: result.artist,
													img: result.image[3]['#text'],
													type: 'Track'
												}
											])
										});
									} catch (error) {
										console.error(error);
									}
								}}
							>
								Favorite
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
