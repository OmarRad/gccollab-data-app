import React, {Component} from 'react';

import { Button, Input } from 'semantic-ui-react';

import './Content.css';

import moment from 'moment';

import {DatePicker, DatePickerInput} from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';



class Content extends Component {
    constructor (props) {
        super(props);
        // This should instead be passed down from props
        const date1 = new Date();
        const date2 = new Date();
        date1.setFullYear(date1.getFullYear() - 1);
        this.state = {
            startDate : null,
            endDate: null,
            focusedInput: null,
            currUrl: ''
        }
    }

    render() {
        return (
            <div style={{height: '50px', width: '95%', margin: '0 auto', marginBottom: '5px', marginTop: '10px'}}>
                <div style={{float: 'left', display: 'inline', width: '410px', paddingTop: '5px', verticalAlign: 'middle'}}>
                    <span style={{verticalAlign: 'middle'}}>
                    <DatePickerInput
                        displayFormat='DD/MM/YYYY'
                        returnFormat='YYYY-MM-DD'
                        className='my-react-component'
                        defaultValue={this.props.superState.startDate}
                        placeholder='Start Date'
                        iconClassName='calendar icon'
                        valueLink={{value: this.props.startDate, requestChange: (val) => {
                            //this.setState({startDate: val});
                            this.props.setStartDate(moment(val))
                        }}}
                        style={{width: '200px', float: 'left'}}
                        validationFormat="DD/MM/YYYY"
                        showOnInputClick={true}
                    />
                    <DatePickerInput
                        displayFormat='DD/MM/YYYY'
                        returnFormat='YYYY-MM-DD'
                        className='my-react-component'
                        defaultValue={this.props.superState.endDate}
                        placeholder='End Date'
                        iconClassName='calendar icon'
                        valueLink={{value: this.props.endDate, requestChange: (val) => {
                            this.props.setEndDate(moment(val));
                        }}}
                        style={{width: '200px', float: 'right'}}
                        validationFormat="DD/MM/YYYY"
                        showOnInputClick={true}
                    />
                    </span>
                </div>
                <Input action={ <Button content='Get stats'
                    onClick={ (event, data) => { 
                        this.props.setGroupUrl(this.state.currUrl);
                     } } />}
                    placeholder='Paste group URL here...'
                    style={{float: 'right', width: '500px'}}
                    onChange={(event, data) => {this.setState({currUrl: data.value})}}
                />
            </div>
        );
    }
}

export default Content;
/*
startDateId="your_unique_start_date_id"
endDateId="your_unique_end_date_id"*/
/*
<Input action='Get stats' placeholder='Paste group URL here...'
                    style={{float: 'right', width: '500px'}}
                />
*/