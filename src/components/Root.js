/*
 *  Filename: Root.js
 *  =================
 * 
 * Requirements
 * ************
 * -> Landing page of the application
 * -> Contains a list of top stories (10 at a time)
 * -> A next button that fetches the next set(10) of stories
 * -> A main menu that displays appropriate controls at an appropriate time
 * 
 * Solution
 * ********
 * -> A list of cards that display the latest stproes 
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

    componentDidUpdate(){
        if(this.props.currentState.loadedCardsCounter == 10){
            this.props.setLoadedCardsCounted(0);
            this.props.toggleLoader(false);
            this.props.setLoaderText('Please wait while we fetch the latest stories');
        }
    }

    fetchTopStories(){
        var self = this;
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(function (response) {
            self.props.setLoaderText('Fetching stories');
            //self.props.toggleLoader(false);
            self.props.updateTopStories({
                topStories: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    incrementLoadedCards(){
        const alreadyLoaded = this.state.loadedCards;
        const loadedCards = alreadyLoaded + 1;
        this.setState({loadedCards})
    }

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

    updateIndex(){
        this.props.updateIndex(this.props.currentState.index + 10);
        this.props.removeAllStoriesFromSelection(true);
        this.props.toggleLoader(true);
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