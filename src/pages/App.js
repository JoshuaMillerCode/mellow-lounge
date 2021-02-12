require('dotenv').config();
import React, { useState, useEffect } from 'react';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET


const [musicResults, setMusicResults] = useState([])
const [query, updateQuery] = useState({
	baseURL: 'https://api.spotify.com/v1/search?q=',
	search: '',
	option: '&type=album',
	searchURL: ''
});

useEffect(() => {
	(
		getToken = async () => {
			try{
				const response = await fetch('https://accounts.spotify.com/api/token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Basic' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
					},
					body: 'grant_type=client_credentials'
				})
				const data = await response.json();
				return data.access_token;
			} catch (error) {
				console.error(error)
			}
		}
	)()
}, [])

useEffect(() => {
	( async () => {
		try{
			const response = await fetch(query.searchURL, {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer' + getToken()
				}
			});
			const data = await response.json();
			await setMusicResults(data.albums.items)
		} catch (error) {
			console.error(error)
		} finally {
			updateQuery({
				baseURL: 'https://api.spotify.com/v1/search?q=',
				search: '',
				option: '&type=album',
				searchURL: ''
			})
		}
	})()
})


export default function App(props) {
	return (<div className="AppPage">This is the {props.page} page</div>;
}
