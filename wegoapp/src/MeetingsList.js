import React, { Component, Fragment } from 'react';

import firebase from './Firebase';
import { GoTrashcan, GoListUnordered } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';
import { navigate } from '@reach/router';

class MeetingsList extends Component {
    
    deleteMeeting = (evt, whichMeeting) => {
        evt.preventDefault();
        const ref = firebase.database()
        .ref(`meetings/${this.props.userID}/${whichMeeting}`);

        ref.remove();
    }

    render() {
        const { meetings } = this.props;
        const meetingslist = meetings.map( item => {
            return (
                <div className="list-group-item d-flex" key={item.meetingID}>
                    <section
                        className="btn-group align-self-center" 
                        role="group" 
                        aria-label="Meeting Options"
                    >
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            title="Delete Meeting"
                            onClick={e => this.deleteMeeting(e, item.meetingID)}
                        >
                            <GoTrashcan />
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            title="Check In"
                            onClick={() => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)}
                        >
                            <FaLink />
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            title="Attendees List"
                            onClick={() => navigate(`/attendees/${this.props.userID}/${item.meetingID}`)}
                        >
                            <GoListUnordered />
                        </button>
                        </section>
                    <section className="pl-3 text-left align-self-center">
                        {item.meetingName}
                    </section>
                </div>
            );
        });
        
        return (
            <Fragment>
                {meetingslist}
            </Fragment>
        );
    }
}

export default MeetingsList;
