import React, { Component } from 'react';
import WholeSlideImageForm from './UploadForms/WholeSlideImageForm';

class UploadPage extends Component {
	
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12">
						<nav class="navbar navbar-light bg-primary">
							<a class="navbar-brand" href="#">KPMP Data Lake Upload Tool</a>
						</nav>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8">
						<WholeSlideImageForm/>
					</div>
					<div className="col-sm-4">status</div>
				</div>
			</div>);
	}
}

export default UploadPage;