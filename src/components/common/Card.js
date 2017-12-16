/*
 *  Filename: Card.js
 *  Author  : Aditya Patnaik
 *  Date created : 7th December 2017
 *  =================
 * 
 * Requirements
 * ***********************
 * 1. Display the title of the story
 * 2. Name of the author
 * 3. Number of comments
 * 
 * Flow
 * ****
 * -> It receives the index of the story as a prop
 * -> When mounted, Check if the story corresponding to the index is present in local storage.
 * -> If yes:-
 * 		-> No need of api call, just obtain its value from local storage
 * 		-> the story is updated in the state
 * 		-> increment the loadedCardsCounter by 1
 * 		-> push the same in the redux store(storyStore)
 * -> If not:-
 * 		-> an axios call is made to fetch all the details of the story using its index
 * 		-> If successful:
 * 			-> the story is added to localStorage
 * 			-> the story is updated in the state
 * 			-> increment the loadedCardsCounter by 1
 * 			-> push the same in the redux store(storyStore)
 * 		-> If failed:
 * 			-> The index of the story is removed from the topStories in our redux store
 * 			-> So that no more amount of time will be spent in fetching the same story(faulty story) and time can be saved
 * 
 */
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {increseLoadedCardsCounter, addStoryToSelection, removeStoryFromSelection, updateStore, removeFaultyStory} from './../../actions';

class Card extends Component {
	constructor(){
		super();
		this.calculateComments = this.calculateComments.bind(this);
		this.toggleSelection = this.toggleSelection.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.state = {
			story: ''
		}
	}
	componentDidMount(){
		var self = this;
		var store = localStorage.getItem('algolia-hackerNews-api') != null ? JSON.parse(localStorage.getItem('algolia-hackerNews-api')) : {};
		if(store.hasOwnProperty(self.props.id)){
			console.log(`${self.props.id} found in store. No need of api call.`);
			self.setState({
				story: store[self.props.id]
			}, () => {
				console.log(`Updating loadedCard counter for ${self.props.id}`);
				self.props.increseLoadedCardsCounter();
				self.props.updateStore(store[self.props.id]);
			})
		} else{
			console.log(`${self.props.id} could not be found in store. Calling api.`);
			axios.get(this.props.url + this.props.id).then(function(response){
				store[response.data.id] = response.data;
				localStorage.setItem('algolia-hackerNews-api', JSON.stringify(store));
				self.setState({
					story: response.data
				}, () => {
					console.log(`Updating loadedCard counter for ${self.props.id}`);
					self.props.increseLoadedCardsCounter();
					self.props.updateStore(store[response.data.id]);
				})
			}).catch(function(error){
				console.log('Removing faulty story...');
				self.props.removeFaultyStory(self.props.id);
				console.log(error);
			});
		}
	}

	/* shouldComponentUpdate(nextProps, nextState){
		if((this.state.story === '' && nextState.story !== '') || (nextProps.selectedStories.indexOf(this.props.id) !== this.props.selectedStories.indexOf(this.props.id))) return true;
		else return false;
	}

	componentDidUpdate(){
		console.log(`${this.state.story.id} updated`);
		this.props.increseLoadedCardsCounter();
	} */

	calculateComments(){
		return `${this.state.story.children.length} comments`
	}

	toggleSelection(){
		if(this.props.selectedStories.indexOf(this.props.id) > -1){
			this.props.removeStoryFromSelection(this.props.id);
			this.cardDOM.blur();
		} else{
			this.props.addStoryToSelection(this.props.id);
		}
		
	}

	handleKeyPress(event){
		if(event.key == 'Enter' || event.key == ' '){
			this.toggleSelection();
		}
	}

	render(){
		//const isSelected = this.props.selectedStories.indexOf(this.props.id) > -1 ? true : false;
		const cardClasses = classnames({
			'card': true,
			'selected': this.props.isSelected
		})
		return (
			<div ref={(cardDOM) => {
					this.cardDOM = cardDOM
				}} className={cardClasses} onClick={this.toggleSelection} tabIndex='0' onKeyPress={this.handleKeyPress}>
				{ this.props.isSelected ? <div className='selectedMark'></div> : ''}
				<div className='title-container'>{this.state.story ? this.state.story.title : ''}</div>
				<div className='info-container'>
				{this.state.story !== '' ? 'By ' + this.state.story.author : ''} | {this.state.story !== '' ? this.calculateComments() : ''}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({currentState}) => {
	const {selectedStories} = currentState;
	return {selectedStories};
}

export default connect(mapStateToProps, {increseLoadedCardsCounter, addStoryToSelection, removeStoryFromSelection, updateStore, removeFaultyStory})(Card);