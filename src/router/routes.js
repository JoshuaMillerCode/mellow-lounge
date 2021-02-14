import React from 'react';
import Search from '../pages/Search';
import About from '../pages/About';
import Feed from '../pages/Feed';
import Recommendations from '../pages/Recommendations';
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
		Component: Recommendations,
		key: 'Recommendations',
		path: '/recommendations'
	},
	{
		Component: Favorites,
		key: 'Favorites',
		path: '/favorites'
	},
	{
		Component: Search,
		key: 'Search',
		path: '/'
	}
];

export default routes;
