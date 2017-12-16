import React, {Component} from 'react';
import classNames from 'classnames';

class SidebarCard extends Component {
    render(){
        var cssClasses = classNames({
            'sidebar-card': true,
            'active': this.props.isSelected
        });
        return (
            <div className={cssClasses} onClick={this.props.onClickHandler}>
                {this.props.title}
            </div>
        )
    }
}

export default SidebarCard;