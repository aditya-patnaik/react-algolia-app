import React, {Component} from 'react';
import classNames from 'classnames';

import Comments from './Comments';

class SidebarCard extends Component {
    constructor(){
        super();
        this.viewSubCards = this.viewSubCards.bind(this);
        this.state = {
            isExpanded: false
        }
    }
    viewSubCards(){
        if(this.props.children.length > 0){
            this.setState({
                isExpanded: true
            })
        }
    }
    render(){
        var cssClasses = classNames({
            'comment-card': true,
            'active': this.props.isSelected
        });
        return (
            <div className={this.state.isExpanded ? 'commentCard-container expanded' : 'commentCard-container'}>
                <div className='comment-header'>{this.props.author}</div>
                { this.props.children.length > 0 && !this.state.isExpanded ? <div className='comment-footer' onClick={this.viewSubCards}>View replies</div> : '' }
                <div className={cssClasses} dangerouslySetInnerHTML={{__html: this.props.title}}></div>
                <div className='replies-container'>
                    <Comments comments={this.props.children} />
                </div>
            </div>
        )
    }
}

export default SidebarCard;