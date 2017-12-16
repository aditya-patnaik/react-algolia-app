import { combineReducers } from 'redux';
import StateReducer from './StateReducer';
import ConfigReducer from './ConfigReducer';


export default combineReducers({
	currentState: StateReducer,
	configuration: ConfigReducer
});