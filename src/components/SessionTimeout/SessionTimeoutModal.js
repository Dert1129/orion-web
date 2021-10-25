import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Countdown from 'react-countdown';
import { minutesToMilliseconds, getSessionLength } from "./sessionTimeoutHelpers";
class SessionTimeoutModal extends Component {

    welcomeURL = 'https://welcome.kpmp.org/shibds/?entityID=https%3A%2F%2Fqa-upload.kpmp.org%2Fshibboleth&return=https%3A%2F%2Fqa-upload.kpmp.org%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Fqa-upload.kpmp.org%252F';
    //timeoutInMinutes = 450; // minutes or 7.5 hours
    timeoutInMinutes = 4; // minutes or 7.5 hours

    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    handleSignin = () => {
        this.props.setSessionStart("");
        window.location = this.welcomeURL;
    };

    getTimeoutTime = () => {
        let sessionLength = getSessionLength(this.props.sessionStart);
        let timeLeft = minutesToMilliseconds(this.timeoutInMinutes) - sessionLength;
        return Date.now() + timeLeft;
    };

    componentDidMount() {
        if (!this.props.sessionStart) {
            this.props.setSessionStart(Date.now());
        }
    }

    rendererModal = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            return (
            <Modal zIndex={9999} isOpen={true} >
                <ModalHeader>Session timeout</ModalHeader>
                <ModalBody>
                    Your session is about to expire. Please login again.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => this.handleSignin()}>SIGN IN AGAIN</Button>{' '}
                </ModalFooter>
            </Modal>)
        } else {
            return (null);
        }
    };

    render() {
        return(
            <React.Fragment>
                <Countdown date={ this.getTimeoutTime() } renderer={this.rendererModal}/>
            </React.Fragment>
        );
    }
}

export default SessionTimeoutModal;
