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
							<h3>
								Title: <Link to={`/${post._id}/edit`}>{post.title}</Link>
							</h3>
							<h5>Topic: {post.topic}</h5>
							<p>Entry: {post.entry}</p>
						</div>
					);
				})}
			</div>
			<div className="new-post">
				<h2>Make a New Post</h2>
				<form onSubmit={handleSubmit}>
					<label>
						Title: <br /> <input type="text" ref={title} className="title" />
					</label>
					<label>
						Topic: <br /> <input type="text" ref={topic} className="topic" />
					</label>
					<label>
						Entry: <br /> <input type="text" ref={entry} className="entry" />
					</label>
					<input type="submit" />
				</form>
			</div>
		</div>
	);
}
