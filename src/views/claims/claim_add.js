import React, {Component} from 'react';
import {Page, Toolbar,Button, List,ListItem,ListHeader,
    Icon, ToolbarButton, Input, Modal, notification} from 'react-onsenui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class ClaimAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0
        }
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 4 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
    }
    render(){
        return <Page
            renderToolbar={() =>
                <Toolbar>
                    <div className='left' style={{backgroundColor:'rgb(0, 188, 212)'}}>
                        <ToolbarButton onClick={()=>{
                            this.props.navigator.popPage();
                        }}>
                            <Icon icon = "ion-chevron-left" style={{color:'white'}} />
                        </ToolbarButton>
                    </div>
                    <div className='center' style={{backgroundColor:'rgb(0, 188, 212)', color:''}}>
                    </div>
                    <div className='right' style={{backgroundColor:'rgb(0, 188, 212)'}}></div>
                </Toolbar>
            }
        >
            <div style={{height:'5vh', backgroundColor:'rgb(0, 188, 212)', display:'flex', flexDirection:'column', padding:20, justifyContent:'center'}}>
                <h4 style={{color:'white'}}>File a Claim</h4>
            </div>
            <Snackbar
                open={this.state.openSnackbar}
                message={this.state.snackBarMessage}
                contentStyle={{
                    fontFamily : 'Avenir'
                }}
                action={this.state.openActionMessage}
                autoHideDuration={4000}
                onRequestClose={()=>{
                    this.setState({
                        openSnackbar : false
                    });
                }
                }
            />
            <section>
                <Stepper activeStep={this.state.stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Details Of Insured</StepLabel>
                        <StepContent>
                            <div>
                                <TextField
                                    hintText="e.g 332001"
                                    floatingLabelText="Vehicle Number"
                                    floatingLabelFixed={true}
                                /><br />
                                <TextField
                                    hintText="e.g 1122113344223"
                                    floatingLabelText="Chasis Number"
                                    floatingLabelFixed={true}
                                /><br />
                            </div>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel style={styles.step}>Loss Details</StepLabel>
                        <StepContent>
                            <div>
                                <DatePicker
                                    onChange={()=>{}}
                                    floatingLabelFixed={true}
                                    floatingLabelText="Accident happened on"
                                />
                                <TimePicker
                                    onChange={()=>{}}
                                    floatingLabelFixed={true}
                                    floatingLabelText="Time of accident"
                                />
                                <TextField
                                    hintText="Place of Accident"
                                    floatingLabelText="Place of Accident"
                                    floatingLabelFixed={true}
                                /><br />
                                <TextField
                                    hintText="Keep it less than 200 words"
                                    floatingLabelText="Short description of Accident"
                                    multiLine={true}
                                    floatingLabelFixed={true}
                                /><br />
                            </div>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Details of Driver at the time of Accident</StepLabel>
                        <StepContent>
                            <Toggle
                                name="disableYearSelection"
                                value="disableYearSelection"
                                label="Same as User"
                                toggled={false}
                                onToggle={()=>{}}
                            />
                            <div>
                                <SelectField
                                    floatingLabelText="Gender"
                                    value={1}
                                    onChange={()=>{}}
                                >
                                    <MenuItem value={1} primaryText="Male" />
                                    <MenuItem value={2} primaryText="Female" />
                                </SelectField>
                                <TextField
                                    hintText="Driving licence number"
                                    floatingLabelText="Driving licence number"
                                    floatingLabelFixed={true}
                                /><br />
                                <DatePicker
                                    hintText="Valid upto "
                                    floatingLabelText="Driving licence number"
                                    floatingLabelFixed={true}
                                /><br />
                                <TextField
                                    hintText=""
                                    floatingLabelText="Occupation"
                                    floatingLabelFixed={true}
                                /><br />
                                <Toggle
                                    name="disableYearSelection"
                                    value="disableYearSelection"
                                    label="Was the driver authorized to drive?"
                                    toggled={true}
                                    onToggle={()=>{}}
                                />
                                <SelectField
                                    floatingLabelText="Who drove the car?"
                                    value={1}
                                    onChange={()=>{}}
                                >
                                    <MenuItem value={1} primaryText="The Owner" />
                                    <MenuItem value={2} primaryText="A Paid Driver" />
                                    <MenuItem value={3} primaryText=" A Relative / Friend" />
                                </SelectField>
                            </div>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Details of Injury and Police report</StepLabel>
                        <StepContent>
                            <div>
                                <Toggle
                                    name="disableYearSelection"
                                    value="disableYearSelection"
                                    label="Have you lodged a police report?"
                                    toggled={true}
                                    onToggle={()=>{}}
                                />
                                <div>
                                    <TextField
                                        hintText="Police report number"
                                        floatingLabelText="FIR No"
                                        floatingLabelFixed={true}
                                    /><br />
                                    <TextField
                                        hintText="Police report number"
                                        floatingLabelText="PS"
                                        floatingLabelFixed={true}
                                    /><br />
                                </div>
                                <Toggle
                                    name="disableYearSelection"
                                    value="disableYearSelection"
                                    label="Death/Injury to any occupant?"
                                    toggled={false}
                                    onToggle={()=>{}}
                                />
                            </div>
                            {this.renderStepActions(3)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Additional details</StepLabel>
                        <StepContent>
                            <div>
                                <div style={{display:'flex'}}>
                                    <div style={{height:'10vh', width:'30vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <p style={{color:'#2c3e50', textAlign:'center'}}> Picture of Vehicle </p>
                                    </div>
                                    <div style={{height:'10vh', width:'70vw', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #ecf0f1'}}>
                                        <p style={{color:'#bdc3c7', fontFamily:'small', fontSize:'x-large'}}> + </p>
                                    </div>
                                </div>
                                <br/>
                                <div style={{display:'flex'}}>
                                    <div style={{height:'10vh', width:'30vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <p style={{color:'#2c3e50', textAlign:'center'}}> FIR Report (if lodged) </p>
                                    </div>
                                    <div style={{height:'10vh', width:'70vw', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #ecf0f1'}}>
                                        <p style={{color:'#bdc3c7', fontFamily:'small', fontSize:'x-large'}}> + </p>
                                    </div>
                                </div>
                                <br/>
                                <div style={{display:'flex'}}>
                                    <div style={{height:'10vh', width:'30vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <p style={{color:'#2c3e50', textAlign:'center'}}> Driving licence </p>
                                    </div>
                                    <div style={{height:'10vh', width:'70vw', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #ecf0f1'}}>
                                        <p style={{color:'#bdc3c7', fontFamily:'small', fontSize:'x-large'}}> + </p>
                                    </div>
                                </div>
                            </div>
                            {this.renderStepActions(4)}
                        </StepContent>
                    </Step>
                </Stepper>
            </section>
        </Page>
    }
}
const styles = {
    radioButton : {
        marginBottom: 16
    },
    step : {
        fontFamily:'Avenir',
        color:'#2c3e50'
    }
}
ClaimAdd.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default ClaimAdd;