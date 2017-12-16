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
    openReadingSession(){
        this.props.updateScreen('reading_session');
    }
    selectAll(){
        this.props.addAllStoriesToSelection(true);
    }
    deselectAll(){
        this.props.removeAllStoriesFromSelection(true);
    }
    goBackToTopStories(){
        this.props.updateScreen('list_stories');
        this.props.removeAllStoriesFromSelection(true);

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