import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Feed(props) {
	const [feedPosts, setFeedPosts] = useState([]);
	const title = useRef(null);
	const topic = useRef(null);
	const entry = useRef(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/posts');
				const data = await response.json();
				await setFeedPosts(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleSubmit = async evt => {
		evt.preventDefault();
		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					title: title.current.value,
					topic: topic.current.value,
					entry: entry.current.value
				})
			});
			const data = await response.json();
			await setFeedPosts([...feedPosts, data]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="FeedPage">
			<div className="feed-container">
				{feedPosts.map(post => {
					return (
						<div className="post" key={post._id}>
							<Link to={`/${post._id}/edit`}>
								<h3>{post.title}</h3>
							</Link>
							<h5>{post.topic}</h5>
							<p>{post.entry}</p>
						</div>
					);
				})}
			</div>
			<div className="new-post">
				<h2>Make a New Post</h2>
				<form onSubmit={handleSubmit}>
					<label>
						Title: <input type="text" ref={title} />
					</label>
					<label>
						Topic: <input type="text" ref={topic} />
					</label>
					<label>
						Entry: <input type="text" ref={entry} />
					</label>
					<input type="submit" />
				</form>
			</div>
		</div>
	);
}
