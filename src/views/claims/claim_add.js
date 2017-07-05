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
import Settings from '../../config/settings';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import store from '../../redux/store';
let moment = require('moment');

class ClaimAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            answers : {},
            openSnackbar : false,
            snackBarMessage : ''
        };
        this.answerQuestion = this.answerQuestion.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }
    componentDidMount(){
        let editData = this.props.selected;
        let answers = {};
        this.questions.forEach(cat => {
            cat.items.forEach(question => {
                answers[question.key] = editData && editData[question.key] ? editData[question.key] : null;
            });
        });
        this.setState({
            answers
        });
    }
    answerQuestion(key, val){
        let answers = this.state.answers;
        answers[key] = val;
        this.setState({
            answers
        });
    }
    questions = Settings.questions;
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    handleNext = () => {
        const {stepIndex} = this.state;
        const container = this;
        let question_length = this.questions.length;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= question_length,
        }, ()=>{
            if (stepIndex === question_length-1){
                // finished
                let ans = this.state.answers;
                ans['claim_type'] = "Auto Insurance Quotes";
                ans['status'] = 'processing';
                ans['stage'] = 4;
                store.dispatch({
                    type : 'NEW_CLAIM',
                    data : {
                        value : this.state.answers
                    }
                });
                let phoneNumber = '2349068972583';
                let message = 'Hello Adegoke, You claim for the Auto Insurance Policy is processing';
                Settings.sendSMS(phoneNumber,message)
                    .then()
                    .catch(e => {});

                console.log(this.state.answers);
                container.setState({
                    openSnackbar : true,
                    snackBarMessage : 'Submitting...'
                }, () => {
                    setTimeout(()=>{
                        container.props.navigator.popPage();
                    }, 1000)
                })
            }
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
                    label={stepIndex === this.questions.length-1 ? 'Finish' : 'Next'}
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
    renderText(data){
        return (<TextField
            onChange={(e, val)=>{
                this.answerQuestion(data.key, val)
            }}
            value = {this.state.answers[data.key]}
            hintText={data.placeholder}
            floatingLabelText={data.title}
            floatingLabelFixed={true}
        />)
    }
    renderToggle(data){
        return (
            <Toggle
                name={data.key}
                value = {this.state.answers[data.key]}
                label={data.title}
                toggled={false}
                onToggle={()=>{
                    this.answerQuestion(data.key, !this.state.answers[data.key])
                }}
            />
        );
    }
    renderSelect(data){
        return (
            <SelectField
                floatingLabelText={data.title}
                onChange={(e, val, c)=>{
                    this.answerQuestion(data.key, c);
                }}
                value = {this.state.answers[data.key]}
            >
                {data.datasets.map(dataset => {
                    return <MenuItem value={dataset.value} primaryText={dataset.title} />
                })}
            </SelectField>
        );
    }
    renderDate(data){
        return (
            <DatePicker
                onChange={(e, val)=>{
                    this.answerQuestion(data.key, JSON.stringify(val))
                }}
                formatDate={(date)=>{
                    return moment(date).format('DD/MM/YYYY');
                }}
                value = {this.state.answers[data.key]}
                floatingLabelFixed={true}
                floatingLabelText={data.title}
            />
        )
    }
    renderTime(data){
        return (
            <TimePicker
                onChange={(e, val)=>{
                    this.answerQuestion(data.key, val)
                }}
                value = {this.state.answers[data.key]}
                floatingLabelFixed={true}
                floatingLabelText={data.title}
            />
        );
    }
    renderTextarea(data){
        return <TextField
                onChange={(e, val)=>{
                    this.answerQuestion(data.key, JSON.stringify(val))
                }}
                value = {this.state.answers[data.key]}
                hintText={data.placeholder}
                floatingLabelText={data.title}
                multiLine={true}
                floatingLabelFixed={true}
            />
    }
    renderImage(data){
        return (
            <div style={{display:'flex'}}>
                <div style={{height:'10vh', width:'30vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <p style={{color:'#2c3e50', textAlign:'center'}}> {data.title} </p>
                </div>
                <div style={{height:'10vh', width:'70vw', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #ecf0f1'}}>
                    <p style={{color:'#bdc3c7', fontFamily:'small', fontSize:'x-large'}}> + </p>
                </div>
            </div>
        );
    }
    renderMode(data){
        if (data.type === 'text' ||  data.type === 'number') {
            return this.renderText(data);
        } else if (data.type === 'date') {
            return this.renderDate(data);
        } else if (data.type === 'time') {
            return this.renderTime(data);
        } else if (data.type === 'toggle') {
            return this.renderToggle(data);
        } else if (data.type === 'select') {
            return this.renderSelect(data);
        } else if (data.type === 'image') {
            return this.renderImage(data);
        } else if (data.type === 'textarea') {
            return this.renderTextarea(data);
        } else {
            return null;
        }
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
                    {this.questions.map((res, i) => {
                       return <Step>
                           <StepLabel>{res.title}</StepLabel>
                           <StepContent>
                               <div>
                                   {res.items.map(question => {
                                       return this.renderMode(question)
                                   })}
                               </div>
                               {this.renderStepActions(i)}
                           </StepContent>
                       </Step>
                    })}
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