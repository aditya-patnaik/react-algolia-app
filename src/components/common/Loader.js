import React, {Component} from 'react';
import {connect} from 'react-redux';

class Loader extends Component {
    render(){
        const cssClasses = `loader-container${this.props.currentState.loader ? '' : ' none'}`;
        return (
            <div className={cssClasses}>
                <img src='rings.svg' width="100" />
                <label>{this.props.currentState.loaderText}</label>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {currentState} = state;
    return {currentState};
}

export default connect(mapStateToProps, {})(Loader);