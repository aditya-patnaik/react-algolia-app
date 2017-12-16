import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import SidebarCard from './common/SidebarCard';
import Comments from './common/Comments';

class StoryMode extends Component {
    constructor(){
        super();
        this.generateSideBar = this.generateSideBar.bind(this);
        this.hideSpinner = this.hideSpinner.bind(this);
        this.changeCurrentStory = this.changeCurrentStory.bind(this);
        this.showReloadBtn = this.showReloadBtn.bind(this);
        this.state = {
            loader: true,
            reload: false,
            loaderText: 'Please wait while we load your story',
            currentStory: {}
        }
    }
    componentDidMount(){
        this.setState({
            currentStory: this.props.storyStore[this.props.selectedStories[0]]
        })
    }
    changeCurrentStory(storyIndex){
        console.log(this.props.storyStore[this.props.selectedStories[storyIndex]]);
        this.setState({
            currentStory: this.props.storyStore[this.props.selectedStories[storyIndex]],
            loader: true
        })
    }
    generateSideBar(){
        var cards = [];
        for(var i=0; i<this.props.selectedStories.length; i++){
            cards.push(<SidebarCard key={this.props.selectedStories[i]} /* onClickHandler={this.changeCurrentStory(this.props.storyStore[this.props.selectedStories[i]])} */
            onClickHandler={this.changeCurrentStory.bind(null, i)}
            title={this.props.storyStore[this.props.selectedStories[i]].title} 
            isSelected={this.props.selectedStories[i] == this.state.currentStory.id} />)
        }
        return cards;
    }
    showReloadBtn(){
        this.setState({
            loader: false
        })
    }
    hideSpinner(){
        this.setState({
            loader: false
        })
    }
    render() {
        var iframeClasses = classNames({
            'none': this.state.loader
        })
        return (
            <div className='storyMode-container'>
                <div className='storyMode'>
                    <div className='sidebar'>{this.generateSideBar()}</div>
                    <div className='storyMode-content'>
                        <h2>{this.state.currentStory.title}</h2>
                        <div className='story-details'>{this.state.currentStory.author} | {this.state.currentStory.created_at}</div>
                        {this.state.loader ? <div className='spinner-container'><img src='Spinner.svg' width='100' /><label>{this.state.loaderText}</label></div> : ''}
                        {this.state.reload ? <div className='reload-container'><img src='refresh.svg' width='100' /><label>Could not load the story. Click here to try again.</label></div> : ''}
                        <div className='iframe-container'>
                            <iframe className={iframeClasses} onLoad={this.hideSpinner} onCancel={this.showReloadBtn} src={this.state.currentStory.url}>
                                Could not load content    
                            </iframe>
                        </div>
                        <h3>Comments</h3>
                        {this.state.currentStory.children !== undefined && this.state.currentStory.children.length > 0 ? <Comments comments={this.state.currentStory.children.filter((  child) => {return child.type == 'comment'})} /> : 'No comments found'}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({currentState}) => {
    const { selectedStories, storyStore} = currentState;
    return {selectedStories, storyStore};
}

export default connect(mapStateToProps, {})(StoryMode);