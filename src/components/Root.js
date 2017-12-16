/*
 *  Filename: Root.js
 *  Author  : Aditya Patnaik
 *  Date created : 7th December 2017
 *  =================
 * 
 * Requirements
 * ************
 * -> Landing page of the application
 * -> Contains a list of top stories (10 at a time)
 * -> A next button that fetches the next set(10) of stories
 * -> A main menu that displays appropriate controls at an appropriate time
 * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {updateTopStories, toggleLoader, setLoaderText, setLoadedCardsCounted, updateIndex, removeAllStoriesFromSelection} from './../actions';
import Card from './common/Card';
import Loader from './common/Loader';
import MainMenu from './MainMenu';
import StoryMode from './StoryMode';

class Root extends Component {
    constructor() {
        super();
        this.fetchTopStories = this.fetchTopStories.bind(this);
        this.updateIndex = this.updateIndex.bind(this);
        this.generateCards = this.generateCards.bind(this);
        this.incrementLoadedCards = this.incrementLoadedCards.bind(this);
        this.state = {
            loadedCards: 0
        }
    }

    /*
     * 1. Calls the topStories api using fetchTopStories method
     * 2. Displays the loader
     * 3. Sets the loader text appripriately
     */
    componentDidMount() {
        var self = this;
        this.props.toggleLoader(true);
        this.props.setLoaderText('Please wait while we fetch the latest stories');
        this.fetchTopStories();
    }

    /*
     *
     * 1. The root component maybe updated multiple times during the application
     * 2. But the case we are interested in is, when the number of loaded cards equates to 10
     * 3. Which means all the story cards in the list have fetched their data from the api (i.e. they're loaded)
     * 4. When all the story cards load, disable the loader and reset the loadedCardsCounter
     * 
     */
    componentDidUpdate(){
        if(this.props.currentState.loadedCardsCounter == 10){
            this.props.setLoadedCardsCounted(0);
            this.props.toggleLoader(false);
            this.props.setLoaderText('Please wait while we fetch the latest stories');
        }
    }

    /*
     *
     * 1. This function is responsible for fetching the top stories from the api
     * 2. The api returns the id of all the top stories as an array
     * 3. On successful response we update the topStories in our redux store
     * 
     */
    fetchTopStories(){
        var self = this;
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(function (response) {
            self.props.setLoaderText('Fetching stories'); // This is done because, once the top stories are fetched, the individual stories have to be fetched again, which requires a loader
            self.props.updateTopStories({
                topStories: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    /*
     * -> This method is passed as a prop to our card component which displays the story
     * -> Once the card component finishes loading up the story, it calls this function which lets the redux store know that one out of the ten cards has finished loading
     * -> After which, its value in the store is incremented by 1
     */
    incrementLoadedCards(){
        const alreadyLoaded = this.state.loadedCards;
        const loadedCards = alreadyLoaded + 1;
        this.setState({loadedCards})
    }

    /*
     * This method is responsible for generating the markup for the list of top stories
     */
    generateCards(){
        var cards = [];
        if(this.props.currentState.topStories.length){
            for(var i=this.props.currentState.index; i<this.props.currentState.index+10; i++){
                const {selectedStories} = this.props.currentState;
                const isSelected = this.props.currentState.selectedStories.indexOf(this.props.currentState.topStories[i]) > -1 ? true : false;
                const trigger = i == this.props.currentState.index ? true : false;
                cards.push(<Card key={this.props.currentState.topStories[i]} isSelected={isSelected} id={this.props.currentState.topStories[i]} url={this.props.configuration.storyURL} onCompletion={this.incrementLoadedCards}/>)
            }
        }
        return cards;
    }

    /*
     * -> This method updates the index in our redux store
     * -> It is called when we click on the next button in out list stories page
     */
    updateIndex(){
        this.props.updateIndex(this.props.currentState.index + 10);
        this.props.removeAllStoriesFromSelection(true); // This is done to ensure that there are no selected stories when we go to the next set of stories
        this.props.toggleLoader(true); // Show the loader again, since the new set of stories will be fetched from the api
        this.props.setLoaderText('Fetching stories');
    }

    render() {
        return (
            <div className='app-container'>
                <Loader />
                <MainMenu currentScreen={this.props.currentState.currentScreen} />
                {this.generateCards()}
                { this.props.currentState.currentScreen === 'list_stories' ? <input type='button' value='Next' className='showMore-btn' onClick={this.updateIndex} /> : '' }
                { this.props.currentState.currentScreen === 'reading_session' ? <StoryMode /> : '' }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { currentState, configuration } = state;
    return {currentState, configuration};
};

export default connect(mapStateToProps, {updateTopStories, toggleLoader, setLoaderText, setLoadedCardsCounted, updateIndex, removeAllStoriesFromSelection})(Root);