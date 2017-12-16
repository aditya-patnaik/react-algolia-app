import { UPDATE_STORY_URL, UPDATE_TOP_STORIES_URL } from '../actions/types';

const INITIAL_STATE = {
	storyURL: 'http://hn.algolia.com/api/v1/items/',
	topStoriesURL: 'https://hacker-news.firebaseio.com/v0/topstories.json'
};

export default ( state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case UPDATE_STORY_URL:
			return {...state, storyURL: action.payload};
		case UPDATE_TOP_STORIES_URL:
			return {...state, topStoriesURL: action.payload };
		default:
			return state;
	}
}