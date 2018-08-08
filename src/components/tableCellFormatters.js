import React from 'react';
import moment from 'moment';
import Api from '../helpers/Api';
const api = Api.getInstance();

let BASE_URL = 'http://localhost:3030';
if (process.env.REACT_APP_ENVIRONMENT === 'production') {
	BASE_URL = 'http://upload.kpmp.org:3030';
} else if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
	BASE_URL = 'http://141.214.4.23:3030';
}

export class DateFormatter extends React.Component {

    render() {
        const formattedDate = this.props.value ? moment.utc(this.props.value).format('YYYY-MM-DD') : "";
        return (
            <DefaultFormatter value={formattedDate} />
        );
    }
}

export class DateTimeFormatter extends React.Component {
    render() {
        const formattedDate = this.props.value ? moment.utc(this.props.value).format('YYYY-MM-DD, h:mm:ss A') : "";
        return (
            <DefaultFormatter value={formattedDate} />
        );
    }
}

export class DefaultFormatter extends React.Component {

    render() {
        return (
            <div>
                <div className="uploadCell">
                    <span title={this.props.value}>{this.props.value}</span>
                </div>
            </div>);
    }
}

export class DownloadFormatter extends React.Component {
	render () {
		return (
			<div><a href={BASE_URL + "/download/" + this.props.value}><i class="fa fa-download" aria-hidden="true"></i></a></div>
		)
	}
}