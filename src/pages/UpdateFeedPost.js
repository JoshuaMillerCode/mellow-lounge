import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UpdateFeedPost(props) {
	const [singlePost, setSinglePost] = useState({});
	const [newStatus, setNewStatus] = useState(false);
	const [didDelete, setDidDelete] = useState(false);
	const [post, setPost] = useState([
		{
			title: '',
			topic: '',
			entry: ''
		}
	]);

	//getting the original post
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/posts/${props.match.params.id}`);
				const data = await response.json();
				await setSinglePost(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleSubmit = async evt => {
		evt.preventDefault();

		try {
			const response = await fetch(`/api/posts/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(post)
			});
			const data = await response.json();
			await setPost(data);
			setNewStatus(!newStatus);
		} catch (error) {
			console.error(error);
		} finally {
			setNewStatus(!newStatus);
		}
	};

	const handleChange = evt => {
		setPost({
			...post,
			...{ [evt.target.id]: evt.target.value }
		});
	};

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/posts/${props.match.params.id}`, {
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
			window.location.assign('/feed');
		}
	};

	return (
		<div className="UpdateFeedPost">
			<div className="show-post">
				{newStatus ? (
					<>
						<h3>{post.title}</h3>
						<h5>{post.topic}</h5>
						<p>{post.entry}</p>
						<button onClick={handleDelete}>Delete Post</button>
						<Link to={'/feed'}>Back</Link>
					</>
				) : (
					<>
						<h3>{singlePost.title}</h3>
						<h5>{singlePost.topic}</h5>
						<p>{singlePost.entry}</p>
						<button onClick={handleDelete}>Delete Post</button>
						<Link to={'/feed'}>Back</Link>
					</>
				)}
			</div>
			<div className="edit">
				<h1>Edit Post</h1>
				<form onSubmit={handleSubmit}>
					<label>
						Title: <input type="text" id="title" onChange={handleChange} />
					</label>
					<label>
						Topic: <input type="text" id="topic" onChange={handleChange} />
					</label>
					<label>
						Entry: <input type="text" id="entry" onChange={handleChange} />
					</label>
					<input type="submit" />
				</form>
			</div>
		</div>
	);
}
