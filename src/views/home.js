import React, {Component} from 'react';
import {Page, Toolbar,
    Icon, ToolbarButton, List, ListItem, Row, Col, Carousel, CarouselItem} from 'react-onsenui';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionIndex : 0,
            questions : [
                {
                    id : 0,
                    text : 'What gender are you?',
                    type : 'radio',
                    options : [
                        {id : 1, text : 'Male'},
                        {id : 2, text : 'Female'}
                    ],
                    icon : 'ion-ios-body-outline',
                    answer : 1
                },
                {
                    id : 1,
                    text : 'When were you born?',
                    type : 'date',
                    options : [
                        {id : 1, text : 'Male'},
                        {id : 2, text : 'Female'}
                    ],
                    icon : 'ion-ios-calendar-outline',
                    answer : 1
                },
                {
                    id : 2,
                    text : 'What gender are you?',
                    type : 'text',
                    options : [
                        {id : 1, text : 'Male'},
                        {id : 2, text : 'Female'}
                    ],
                    icon : 'ion-ios-speedometer-outline',
                    answer : 1
                },
                {
                    id : 3,
                    text : 'Are you currently insured? If yes, for how long?',
                    type : 'select',
                    options : [
                        {id : 1, text : 'Move than 3 years'},
                        {id : 2, text : '1 to 3 Years'},
                        {id : 3, text : '7 to 12 Years'},
                        {id : 4, text : '6 months or less'},
                        {id : 5, text : 'Not currently insured'},
                    ],
                    icon : 'ion-model-s',
                    answer : 1
                },
                {
                    id : 4,
                    text : 'Whats your credit score',
                    type : 'select',
                    options : [
                        {id : 1, text : 'Poor'},
                        {id : 2, text : 'Fair'},
                        {id : 3, text : 'Good'}
                    ],
                    icon : 'ion-card',
                    answer : 1
                },
                {
                    id : 5,
                    text : 'Whats your highest level of education?',
                    type : 'select',
                    options : [
                        {id : 1, text : 'No Diploma'},
                        {id : 2, text : 'Bachelors degree'},
                        {id : 3, text : 'Masters degree'},
                        {id : 3, text : 'Doctoral degree'}
                    ],
                    icon : 'ion-university',
                    answer : 1
                },
                {
                    id : 6,
                    text : 'Do you own a house or Condo',
                    type : 'radio',
                    options : [
                        {id : 1, text : 'Yes'},
                        {id : 2, text : 'No'}
                    ],
                    icon : 'ion-ios-home-outline',
                    answer : 1
                },
                {
                    id : 7,
                    text : 'Do you own a house or Condo',
                    type : 'radio',
                    options : [
                        {id : 1, text : 'Yes'},
                        {id : 2, text : 'No'}
                    ],
                    icon : 'ion-ios-home-outline',
                    answer : 1
                },
                {
                    id : 8,
                    text : 'Where do you park your car?',
                    type : 'text',
                    options : [
                        {id : 1, text : 'Yes'},
                        {id : 2, text : 'No'}
                    ],
                    icon : 'ion-map',
                    answer : 1
                },
                {
                    id : 9,
                    text : 'How Much coverage would you like',
                    type : 'select',
                    options : [
                        {id : 1, text : 'State Minimum $30k/$60k '},
                        {id : 2, text : 'Basic $30k/$60k'},
                        {id : 3, text : 'Better $30k/$60k'},
                        {id : 4, text : 'Best $30k/$60k'}
                    ],
                    icon : 'ion-ios-paper-outline',
                    answer : 1
                },
                {
                    id : 10,
                    text : 'Are you married',
                    type : 'radio',
                    options : [
                        {id : 1, text : 'Yes'},
                        {id : 2, text : 'No'}
                    ],
                    icon : 'ion-ios-heart-outline',
                    answer : 1
                },
                {
                    id : 11,
                    text : 'Any accidents, tickets, claims or violations in the past 3 years?',
                    type : 'radio',
                    options : [
                        {id : 1, text : 'Yes'},
                        {id : 2, text : 'No'}
                    ],
                    icon : 'ion-ios-clock-outline',
                    answer : 1
                }
            ]
        };
        this.renderLoader = this.renderLoader.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.renderRadio = this.renderRadio.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderDate = this.renderDate.bind(this);
    }
    handleChange = (event, index, value) => this.setState({value});
    renderLoader(id){
        let rows = [];
        for (let i = 0; i < this.state.questions.length; i++) {
            rows.push(
                <span style={{color: i <= id ? '#1abc9c' : '#ecf0f1', fontSize:20, marginRight:10}}>●</span>
            );
        }
        return (
            <div style={{height:'5vh', marginTop:'-10vh', display:'flex'}}>
                {rows}
            </div>
        );
    }
    renderQuestion(id){
        if (this.state.questions[id].type === 'select'){
            return this.renderSelect(id);
        } else if (this.state.questions[id].type === 'radio'){
            return this.renderRadio(id);
        } else if (this.state.questions[id].type === 'text'){
            return this.renderText(id);
        } else if (this.state.questions[id].type === 'date'){
            return this.renderDate(id);
        }
        return null;
    }
    answerQuestion(id, val){
        let question = this.state.questions[id];
        question.answer = val;
        let questions = this.state.questions;
        questions[id] = question;
        this.setState({
            questions
        })
    }
    renderSelect(id){
        let question = this.state.questions[id];
        return (
            <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                <Icon icon = {question.icon} size="80" style={{fontSize:80, color:'#3498db'}} />
                <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>{question.text}</h4>
                <SelectField
                    onChange={(event, index, val)=>{
                        this.answerQuestion(id, val);
                    }}
                    value={question.answer}
                >
                    {question.options.map(item => {
                        return (
                            <MenuItem value={item.id} primaryText={item.text} />
                        );
                    })}
                </SelectField>
            </div>
        );
    }
    renderRadio(id){
        let question = this.state.questions[id];
        return (
            <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                <Icon icon = {question.icon} size="80" style={{fontSize:80, color:'#3498db'}} />
                <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>{question.text}</h4>
                <div style={{display:'flex'}}>
                    {question.options.map(res => {
                       return <RaisedButton
                           label={res.text}
                           onTouchTap={()=>{
                                    this.answerQuestion(id, res.id);
                                }
                           }
                           style={{marginRight:2}}
                           primary={question.answer === res.id} />
                    })}
                </div>
            </div>
        );
    }
    renderText(id){
        let question = this.state.questions[id];
        return (
            <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                <Icon icon = {question.icon} size="80" style={{fontSize:80, color:'#3498db'}} />
                <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>{question.text}</h4>
                <div style={{display:'flex'}}>
                    <TextField
                        hintText="Start typing"
                    /><br />
                </div>
            </div>
        );
    }
    renderDate(id){
        let question = this.state.questions[id];
        return (
            <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                <Icon icon = {question.icon} size="80" style={{fontSize:80, color:'#3498db'}} />
                <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>{question.text}</h4>
                <div style={{display:'flex'}}>
                    <DatePicker hintText="Choose" />
                </div>
            </div>
        );
    }
    render(){
        return (
            <Page
                style={{backgroundColor:'white'}}
            >
                <div>
                    <div style={{height:'95vh', backgroundColor:'#ecf0f1', 'max-height' : '90vh', overflow:'scroll'}}>
                        <div style={{height:'50vh', padding:10, display:'flex'}}>
                            <Carousel index={0} swipeable  itemHeight={30} autoScrollRatio={0.4} autoScroll>
                                {this.state.questions.map(res =>{
                                   return (
                                       <CarouselItem key={res.id}>
                                           <Card style={{backgroundColor:'white', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                               <CardText style={{display:'flex', height:'50vh', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                                   {this.renderLoader(res.id)}
                                                   {this.renderQuestion(res.id)}
                                               </CardText>
                                           </Card>
                                       </CarouselItem>
                                   );
                                })}
                            </Carousel>
                        </div>
                        <div style={{padding:10,   display:'flex', justifyContent:'space-between'}}>
                            <Row>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>West Bend Mutual</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir', marginTop:-5}}>32</h2>
                                    </Paper>
                                </Col>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>West Bend Mutual</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir', marginTop:-5}}>32</h2>
                                    </Paper>
                                </Col>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>West Bend Mutual</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir', marginTop:-5}}>32</h2>
                                    </Paper>
                                </Col>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>West Bend Mutual</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir', marginTop:-5}}>32</h2>
                                    </Paper>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div style={{position:'absolute', bottom:0, width:'100vw',
                        alignItems:'center',
                        height:'8vh', backgroundColor:'#1abc9c', alignItems:'center', justifyContent:'center', display:'flex'}}>
                        <p style={{textAlign:'center', color:'white'}}>Call for Free Quotes</p>
                    </div>
                </div>
            </Page>
        );
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
}
Home.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default Home;