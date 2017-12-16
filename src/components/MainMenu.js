/*
 *  Filename: MainMenu.js
 *  Author  : Aditya Patnaik
 *  Date created : 10th December 2017
 *  =================
 * 
 * Requirements
 * ************
 * -> Show appropriate controls based on requirement
 * 1. List screen
 *  -> No controls by default
 *  -> Controls start showing up once stories are selected
 *  -> One control lets the user start a reading session with all the selected stories
 *  -> One control lets the user select all the stories in the screen
 *  -> One control lets the user deselect all the stories in the screen
 * 
 * 2. Reading session
 *  -> Only one control that is visible all the time
 *  -> Which is Go Back to List Stories screen
 * 
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {addAllStoriesToSelection, removeAllStoriesFromSelection, updateScreen} from './../actions';

class MainMenu extends Component {
    constructor(){
        super();
        this.selectAll = this.selectAll.bind(this);
        this.deselectAll = this.deselectAll.bind(this);
        this.openReadingSession = this.openReadingSession.bind(this);
        this.goBackToTopStories = this.goBackToTopStories.bind(this);
    }

    /*
     * 1. This method updates the current screen in our store to reading_session
     * 2. As a result we enter into reading session mode and a new screen is displayed
     * 3. The controls on the main menu also changes
     */
    openReadingSession(){
        this.props.updateScreen('reading_session');
    }

    /*
     * 1. This method adds all the stories in the screen in the selectedStories array in our store
     */
    selectAll(){
        this.props.addAllStoriesToSelection(true);
    }

    /*
     * 1. This method removes all the stories in the selectedStories array in our store
     */
    deselectAll(){
        this.props.removeAllStoriesFromSelection(true);
    }

    /*
     * 1. This method takes us back to the list stories screen 
     */
    goBackToTopStories(){
        this.props.updateScreen('list_stories');
        this.props.removeAllStoriesFromSelection(true); // Once we go back to our list screen, all the stories are removed from selection

    }
    render(){
        var containerClasses = classNames({
            'on-select-menu-container': true,
            'hidden': this.props.selectedStories.length > 0 ? false : true
        })
        return (
            <div className='mainMenu-container'>
                <span className='logo-container'>
                    ALGOLIA API
                </span>
                { this.props.currentScreen == 'list_stories' ? 
                    <div className={containerClasses}>
                        <span className='on-select-menu' onClick={this.openReadingSession}>
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                            Start Reading
                        </span>
                        <span className='on-select-menu' onClick={this.selectAll}>
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            Select All
                        </span>
                        <span className='on-select-menu' onClick={this.deselectAll}>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            Deselect All
                        </span>
                    </div>
                : 
                <div className={containerClasses}>
                    <span className='on-select-menu' onClick={this.goBackToTopStories}>
                        <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                        Go back to top stories
                    </span>
                </div> }
            </div>
        )
    }
}

const mapStateToProps = ({currentState}) => {
    const {selectedStories} = currentState;
    return {selectedStories};
}

export default connect(mapStateToProps, {addAllStoriesToSelection, removeAllStoriesFromSelection, updateScreen})(MainMenu);