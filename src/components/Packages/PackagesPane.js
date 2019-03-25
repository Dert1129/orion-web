import React, { Component } from 'react';
import FilterControl from './FilterControl';
import PackageListContainer from '../Packages/PackageListContainer';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import institutions from '../institutions';
import * as filterActions from '../../actions/filterActions';

class PackagesPane extends Component {

	componentDidMount() {
		if(!this.isRemoteDataLoaded()) {
			this.props.loadRemoteData();
		}
	}

	isRemoteDataLoaded() {
		return Object.keys(this.props.users).length !== 0
			&& this.props.users.constructor === Object
			&& this.props.packageTypes.length > 0;
	}

	packageTypesToOptions(packageTypes) {
		let packageTypeOptions = packageTypes.map(value => {
			return { value: value, label: value }
		});

		packageTypeOptions.sort((option1, option2) => {
			let returnVal = 0;
			let label1 = option1.label.toUpperCase();
			let label2 = option2.label.toUpperCase();

			if (label1 < label2) {
				returnVal = -1;
			}

			if (label1 > label2) {
				returnVal = 1;
			}

			return returnVal;
		});

		packageTypeOptions.push({ value: "Other", label: "Other"});
		return packageTypeOptions;
	}

	usersToOptions = (users) => {
		let userOptions = [];
		users.sort((user1, user2) => {
			let returnVal = 0;
			let user1Upper = user1.firstName.toUpperCase();
			let user2Upper = user2.firstName.toUpperCase();
			if (user1Upper < user2Upper) {
				returnVal = -1;
			}
			if (user1Upper > user2Upper) {
				returnVal = 1;
			}
			return returnVal;
		});
		users.map((user, index) => {
			let label = user.firstName + " " + user.lastName;
			return userOptions.push( {value: user.id, label: label});
		});
		return userOptions;
	}
	
    render() {
    	let userOptions = this.usersToOptions(this.props.users);
		let packageTypeOptions = [];
		if (this.props.packageTypes.length) {
			packageTypeOptions = this.packageTypesToOptions(this.props.packageTypes);
		}

        return (
    		<article id="packages-pane" className="container">
    			<header id="packages-filter-controls" className="container-fluid fixed-top-subnav pt-3">
					<Row noGutters>
						<Col xs={12} md={"auto"} className="mx-sm-auto ml-md-0 mr-md-1">
							<FilterControl className="filter-control" placeholder="Filter by institution" options={institutions.options} type={filterActions.filterTypes.INSTITUTION} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
						</Col>
						<Col xs={12} md={"auto"} className="mx-sm-auto ml-md-0 mr-md-1">
							<FilterControl className="filter-control" placeholder="Filter by package type" options={packageTypeOptions} type={filterActions.filterTypes.PACKAGE_TYPE} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
						</Col>
						<Col xs={12} md={"auto"} className="mx-sm-auto ml-md-0 mr-md-0">
							<FilterControl className="filter-control" placeholder="Filter by submitter" options={userOptions} type={filterActions.filterTypes.SUBMITTER} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
						</Col>
						<Col xs={12} md={"auto"} className="mx-sm-auto ml-md-auto mr-md-0">
							<Link to="/upload">
								<Button id="packages-button-add-new"
										color="primary"
										className="float-md-right btn-sm"
										>Add new package</Button>
							</Link>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<i class="text-secondary">Search results are displayed in reverse chronological order</i>
						</Col>
					</Row>
				</header>
				<Row>
					<PackageListContainer />
				</Row>
			</article>
		);
	}
}

export default PackagesPane;
