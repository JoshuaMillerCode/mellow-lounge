import React from 'react';
import Search from '../pages/Search';
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
		Component: Show,
		key: 'Show',
		path: '/:id'
	},
	{
		Component: Search,
		key: 'Search',
		path: '/'
	}
];

export default routes;
