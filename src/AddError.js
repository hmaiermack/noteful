import React, { Component } from 'react';

export default class AddError extends Component{

    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
      

    static getDerivedStateFromError(error){
        this.setState({
            hasError: true,
        })
    }

    render(){
                if (this.state.hasError) {      
                  return (
                    <h2>You need to add a name to your note!</h2>
                  );
                }
                return this.props.children;
    }

}