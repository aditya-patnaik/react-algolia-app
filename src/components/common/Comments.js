import React, {Component} from 'react';

import CommentCard from './CommentCard';

class Comments extends Component {
    constructor(){
        super();
        this.generateComments = this.generateComments.bind(this);
    }
    generateComments(){
        var markup = [];
        for(var i = 0; i < this.props.comments.length; i++){
            markup.push(<CommentCard key={this.props.comments[i].id}
            title={this.props.comments[i].text} 
            children={this.props.comments[i].children.filter((child) => { return child.type === 'comment' })}
            author={this.props.comments[i].author}
            isSelected='false'/>)
        }
        return markup;
    }
    render(){
        return (
            <div className='comments-container'>
                {this.generateComments()}
            </div>
        )
    }
}

export default Comments;