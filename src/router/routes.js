import React from 'react';
import SearchAlbum from '../pages/SearchAlbum';
import SearchSong from '../pages/SearchSong';
import About from '../pages/About';
import Feed from '../pages/Feed';
import Show from '../pages/Show';

import Favorites from '../pages/Favorites';

const routes = [
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: Feed,
		key: 'Feed',
		path: '/feed'
	},
	{
		Component: Favorites,
		key: 'Favorites',
		path: '/favorites'
	},
	{
		Component: SearchSong,
		key: 'Search Track',
		path: '/searchTrack'
	},
	{
		Component: Show,
		key: 'Show',
		path: '/:id'
	},
	{
		Component: SearchAlbum,
		key: 'Search Album',
		path: '/'
	}
];

export default routes;
