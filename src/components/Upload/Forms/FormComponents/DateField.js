import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const requiredFieldDateOptions = {validateTrigger: [ 'onBlur' ], rules: [{required: true, message: 'Required' }]};
const optionalFieldDateOptions = {validateTrigger: [ 'onBlur' ], rules: [{required: false}]};

class DateField extends Component {
	
	disabledDate(current) {
	  return  current > moment().endOf('day');
	}
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		let fieldOptions = this.props.isRequired ? requiredFieldDateOptions : optionalFieldDateOptions;
		let placeholderText = undefined;
		if (this.props.additionalProps !== undefined) {
			placeholderText = this.props.additionalProps.placeholderText;
		}
		
		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} >
				{getFieldDecorator(this.props.fieldName, fieldOptions)(
					<DatePicker disabledDate={this.disabledDate} mode='date' format={'MM/DD/YYYY'} placeholder={placeholderText} name={this.props.fieldName}/>
				)}
			</Form.Item>		
		);
	}
	
}

DateField.propTypes = {
    fieldName: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default DateField;