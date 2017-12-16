/*
 *  Filename: StateReducer.js
 *  Author  : Aditya Patnaik
 *  Date created : 7th December 2017
 *  =================
 * 
 * State Store description
 * ***********************
 * 1. Loader : When set to true, displays the loader on the screen and prevents any other activity on the screen
 * 2. currentScreen : Decides which screen has to be shown (List Stories or StoryMode)
 * 3. LoadedCardsCounter: Keeps track of the number of stories loaded by the card after a successful api call. When its value reaches ten, the loader is disabled
 * 4. selectedStories: Is an array that stores the id of all the stories that are selected by the user in the list stories screen
 * 5. loaderText: Specifies the text that has to be displayed when the loader is shown on the screen
 * 6. topStories: Is an array that contains the index of all the topStories that is returned by an api call
 * 7. storyStore: Is an object that stores a story the moment it's loaded, in order to trim the time taken to make an api call. If a story is found in the storyStore then no need of making an api call
 * 8. index: Stores the index of the story after which all the stories are displayed. The value of this is updated when the user clicks in the next button.
 */

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