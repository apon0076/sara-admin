import React, { Component } from 'react';

class AllInfo extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render(){
        const { firstName, lastName, jobTitle, jobCompany, jobLocation } = this.props;
        return(
            <div style={{marginLeft: '50%'}}>
                <h2>Here is the information you entered:</h2>
                First Name: <b>{firstName}</b><br />
                Last Name: <b>{lastName}</b><br />
                Job: <b>{jobTitle}</b><br />
                Company: <b>{jobCompany}</b><br />
                Location: <b>{jobLocation}</b><br />
                <button className="Back" onClick={this.back}>
                    « Back
                </button>
            </div>
        );
    }
}

export default AllInfo;