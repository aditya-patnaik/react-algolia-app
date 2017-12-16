import { LIST_STORIES, UPDATE_TOP_STORIES, UPDATE_INDEX, TOGGLE_LOADER, SET_LOADER_TEXT, SET_LOADED_CARDS_COUNTER, UPDATE_SELECTED_STORIES, UPDATE_SCREEN, UPDATE_STORY_STORE } from '../actions/types';

const INITIAL_STATE = {
	loader: false,
	currentScreen: LIST_STORIES,
	loadedCardsCounter: 0,
	selectedStories: [],
	loaderText: '',
	topStories: [],
	storyStore: {},
	index: 0
};

export default ( state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case UPDATE_TOP_STORIES:
			return {...state, topStories: action.payload };
		case UPDATE_INDEX:
			return {...state, index: action.payload };
		case TOGGLE_LOADER:
			return {...state, loader: action.payload };
		case SET_LOADER_TEXT:
			return {...state, loaderText: action.payload };
		case SET_LOADED_CARDS_COUNTER:
			return {...state, loadedCardsCounter: action.payload };
		case UPDATE_SELECTED_STORIES:
			return {...state, selectedStories: action.payload };
		case UPDATE_SCREEN:
			return {...state, currentScreen: action.payload };
		case UPDATE_STORY_STORE:
			return {...state, storyStore: action.payload };
		default:
			return state;
	}
}