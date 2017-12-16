import { UPDATE_TOP_STORIES, UPDATE_INDEX, TOGGLE_LOADER, SET_LOADER_TEXT, SET_LOADED_CARDS_COUNTER, UPDATE_SELECTED_STORIES, UPDATE_SCREEN, UPDATE_STORY_STORE } from './types';

export const updateTopStories = ({topStories}) => {
	return {
		type: UPDATE_TOP_STORIES,
		payload: topStories
	};
}

export const updateIndex = (index) => {
	return {
		type: UPDATE_INDEX,
		payload: index
	}
}

export const toggleLoader = (flag) => {
	return {
		type: TOGGLE_LOADER,
		payload: flag
	}
}

export const setLoaderText = (text) => {
	return {
		type: SET_LOADER_TEXT,
		payload: text
	}
}

export const setLoadedCardsCounted = (counter) => {
	return {
		type: SET_LOADED_CARDS_COUNTER,
		payload: counter
	}
}

/* export const resetLoadedCardsCounted = () => {
	return (dispatch) => {
		dispatch({
			type: SET_LOADED_CARDS_COUNTER,
			payload: 0
		})
		dispatch({
			type: TOGGLE_LOADER,
			payload: false
		})
	}
} */

export const increseLoadedCardsCounter = () => {
	return (dispatch, getState) => {
		var currentCounter = getState().currentState.loadedCardsCounter;
		dispatch({
			type: SET_LOADED_CARDS_COUNTER,
			payload: currentCounter + 1
		})
	}
}

export const addStoryToSelection = (storyId) => {
	return (dispatch, getState) => {
		var selectedStories = getState().currentState.selectedStories.concat(storyId);
		/* selectedStories.push(storyId); */
		dispatch({
			type: UPDATE_SELECTED_STORIES,
			payload: selectedStories
		})
	}
}

export const addAllStoriesToSelection = (flag) => {
	return (dispatch, getState) => {
		const {index} = getState().currentState;
		var selectedStories = getState().currentState.topStories.slice(index, index+10);
		/* var selectedStories = getState().currentState.selectedStories.concat(storyId); */
		dispatch({
			type: UPDATE_SELECTED_STORIES,
			payload: selectedStories
		})
	}
}

export const removeAllStoriesFromSelection = (flag) => {
	return (dispatch, getState) => {
		var selectedStories = new Array();
		dispatch({
			type: UPDATE_SELECTED_STORIES,
			payload: selectedStories
		})
	}
}

export const removeStoryFromSelection = (storyId) => {
	return (dispatch, getState) => {
		var selectedStories = [...getState().currentState.selectedStories];
		selectedStories.splice(selectedStories.indexOf(storyId), 1);
		dispatch({
			type: UPDATE_SELECTED_STORIES,
			payload: selectedStories
		})
	}
}

export const updateScreen = (screen) => {
	return (dispatch, getState) => {
		dispatch({
			type: UPDATE_SCREEN,
			payload: screen
		})
	}
}

export const updateStore = (story) => {
	return (dispatch, getState) => {
		if(!getState().currentState.storyStore.hasOwnProperty(story.id)){
			var store = JSON.parse(JSON.stringify(getState().currentState.storyStore));
			store[story.id] = story;
			dispatch({
				type: UPDATE_STORY_STORE,
				payload: store
			})
		}
	}
}

export const removeFaultyStory = (storyId) => {
	return (dispatch, getState) => {
		var currentTopStories = [...getState().currentState.topStories];
		currentTopStories.splice(getState().currentState.topStories.indexOf(storyId), 1);
		var refreshedStories = [...currentTopStories];
		dispatch({
			type: UPDATE_TOP_STORIES,
			payload: refreshedStories
		})
	}
}