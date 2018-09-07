import React, { Component } from 'react';
import { Formik } from 'formik';
import TextField from './TextField';
import DateField from './DateField';
import SelectBox from './SelectBox';
import { ControlLabel, Col, Row } from 'react-bootstrap';
import protocolList from './protocols';
import institutionList from './institutions';
import { validate } from './v1StyleFormValidator';


class UploadForm extends Component {
	render() {
		const {
			values, touched, errors, handleChange, setFieldValue, handleBlur
		} = this.props;
		return(
			<form id="uploadPackageInfoForm">
			    <div id="uploadInfo">
			    		<div className="header">
			    			Submitted by
			    		</div>
			        <Row>
			        		<Col md="4">
			        			<TextField name="submitterFirstName" label="First Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterFirstName} touched={touched.submitterFirstName} error={errors.submitterFirstName}/>
			        		</Col>
			        		<Col md="4" >
			        			<TextField name="submitterLastName" label="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterLastName} touched={touched.submitterLastName} error={errors.submitterLastName}/>
			        		</Col>
			        </Row>
			        <Row>
			        		<Col md="4">
			        			<SelectBox name="institutionName" label="Site Name" options={institutionList.institutions} onChange={handleChange} onBlur={handleBlur} error={errors.institutionName} setFieldValue={setFieldValue}/>
			        		</Col>
			        	</Row>
			        	<Row>
			        		<Col md="12">
					        	<div className="header" id="packageInformationSection">
					        		Package Information
					        	</div>
				        	</Col>
			        	</Row>
			        <Row >
			        		<Col md="4">
			        			<SelectBox name="protocol" label="Associated Protocol" options={protocolList.protocols} onChange={handleChange} onBlur={handleBlur} error={errors.protocol} setFieldValue={setFieldValue}/>

			        		</Col>
			        		<Col md="4">
			        			<TextField name="subjectId" label="Subject/Sample ID" onChange={handleChange} onBlur={handleBlur} value={values.subjectId} touched={touched.subjectId} error={errors.subjectId}/>
			        		</Col>
			        	</Row>
			        <Row>
			        		<Col md="4">
			        			<DateField name="experimentDate" label="Experiment Date (optional)" onChange={handleChange} onBlur={handleBlur} value={values.experimentDate} touched={touched.experimentDate} error={errors.experimentDate}/>
			        		</Col>
			        	</Row>
					<Row>
						<Col md="8">
							<ControlLabel>Description</ControlLabel>
							<div>
								<textarea name="description" type="text" />
							</div>
						</Col>
					</Row>
				</div>
		    </form>
		);
	}
}

const Form = (props) => {
	

	return (
		<div>
			<Formik component={UploadForm} validate={validate}/>
		</div>
	);
}

export default Form;