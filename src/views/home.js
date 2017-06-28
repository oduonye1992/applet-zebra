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
import Select from './select';
import CircularProgress from 'material-ui/CircularProgress';
import store from '../redux/store';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionIndex : 0,
            parent : store.getState(),
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
                    id : 3,
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
                    id : 4,
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
                    id : 5,
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
                    id : 6,
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
                    id : 7,
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
                    id : 8,
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
                    id : 9,
                    text : 'Any accidents, tickets, claims or violations in the past 3 years?',
                    type : 'radio',
                    options : [
                        {id : 1, text : 'Yes'},
                        {id : 2, text : 'No'}
                    ],
                    icon : 'ion-ios-clock-outline',
                    answer : 1
                }
            ],
            zebra : null
        };
        this.renderLoader = this.renderLoader.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.renderRadio = this.renderRadio.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderDate = this.renderDate.bind(this);
        this.renderBottom = this.renderBottom.bind(this);
        this.update = this.update.bind(this);
        this.buildQueryString = this.buildQueryString.bind(this);
    }
    componentDidMount(){
        this.update();
    }
    parseResponse(response){
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
    async update(){
        try {
            let updatedResponse = await this.updateZebraRecord();
            let pollResult = await this.keepPolingUntilAResponseExists();
            let fetchResponse = await this.fetchZebraResponse();
        } catch (e){
            alert('Error: '+e.message);
        }
    }
    buildQueryString(paramsObj){
        let queryString = '?q=q';
        if (!paramsObj){
            return queryString;
        }
        for(let key in paramsObj) {
            if (paramsObj[key] !== undefined){
                queryString += '&'+key+'='+paramsObj[key];
            }
        }
        return queryString;
    }
    updateZebraRecord(){
        return new Promise((resolve, reject) => {
            let zebra = store.getState().zebra_questions;
            let url = 'https://www.thezebra.com/api/internal/v1/quote/'+zebra.id;//'?ad_src_id=f&_estimates=false&fetch=false';
            let pro = 'https://cors-anywhere.herokuapp.com/';
            let proxy = pro+"https://secret-cove-21526.herokuapp.com?url="+url+'&data='+JSON.stringify(zebra);
            fetch(proxy, {mode: 'cors'})
                .then(this.parseResponse)
                .then(res => {
                    console.log(res);
                    this.setState({
                        zebra : res
                    },resolve);
                })
                .catch(reject)
        });
    }
    keepPolingUntilAResponseExists(){
        let poll = (callback) => {
            let zebra = store.getState().zebra_questions;
            let proxy = "https://cors-anywhere.herokuapp.com/";
            let url = 'https://secret-cove-21526.herokuapp.com?mode=probe&sessionID='+zebra.session_id;
            console.log(url);
            fetch(proxy+url, {mode: 'cors'})
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        let error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }
                })
                .then(res => {
                    if(res && res.ready){
                        callback();
                    } else {
                        poll(callback);
                    }
                })
                .catch((e)=>{
                    console.error('Error '+e.message);
                    poll(callback);
                })
        };
        return new Promise((resolve, reject) => {
            poll(resolve);
        });
    }
    fetchZebraResponse(){
        return new Promise((resolve, reject) => {
            let zebra = store.getState().zebra_questions;
            let proxy = "https://cors-anywhere.herokuapp.com/";
            let url = 'https://secret-cove-21526.herokuapp.com?mode=fetch&sessionID='+zebra.session_id;
            console.log(url);
            fetch(proxy+url, {mode: 'cors'})
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        let error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }
                })
                .then(res => {
                    this.setState({
                        zebra : res
                    },resolve);
                })
                .catch((e)=>{
                    console.error('Error '+e.message);
                    reject(e);
                })
        });
    }
    fetchItem(){
        return new Promise((resolve, reject) => {

        });
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
        }, this.update);
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
    renderBottom(){
        if (this.state.questionIndex !== this.state.questions.length-1){
            return (<div style={{position:'absolute', bottom:0, width:'100vw',
                height:'8vh', backgroundColor:'#ecf0f1', alignItems:'center', justifyContent:'center', display:'flex'}}>
                <p style={{textAlign:'center', color:'#34495e', fontSize:'large'}}>Get Quotes</p>
            </div>)
        } else {
            return (
                <div
                    onClick={()=>{
                        this.props.navigator.pushPage({
                            component : Select
                        });
                    }}
                    style={{position:'absolute', bottom:0, width:'100vw',
                    height:'8vh', backgroundColor:'#1abc9c', alignItems:'center', justifyContent:'center', display:'flex'}}>
                    <p style={{textAlign:'center', color:'white', fontSize:'large'}}>Get Quotes</p>
                </div>
            )
        }
    }
    renderEstimates(){
        let zebra = this.state.zebra;
        if (!(zebra && zebra.estimates)){
            return <div style={{height:'30vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <CircularProgress color="black" />
            </div>
        }
        if (!zebra.estimates.length){
            return <div style={{height:'30vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <p>More info needed</p>
            </div>
        }
        return (
            <div style={{padding:10,   display:'flex', justifyContent:'space-between'}}>
                <Row>
                    {zebra.estimates.map(item => {
                        return <Col width="50">
                            <Paper zDepth={1} style={{ height:150, display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                <h4 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir'}}>{item.carrier_display_name}</h4>
                                <h2 style={{textAlign:'center', color:'#2c3e50', fontFamily:'Avenir', marginTop:-5}}>{item.monthly_estimate.toFixed(2)}</h2>
                            </Paper>
                        </Col>
                    })}
                </Row>
            </div>
        );
    }
    render(){
        return (
            <Page
                renderToolbar={() =>
                    <Toolbar>
                        <div className='left' style={{backgroundColor:'white'}}>
                            <ToolbarButton onClick={()=>{
                                this.props.navigator.popPage();
                            }}>
                                <Icon icon = "ion-chevron-left" style={{color:'#2c3e50'}} />
                            </ToolbarButton>
                        </div>
                        <div className='center' style={{backgroundColor:'white', color:'white'}}>

                        </div>
                        <div className='right' style={{backgroundColor:'white'}}></div>
                    </Toolbar>
                }
                style={{backgroundColor:'white'}}
            >
                <div>
                    <div style={{height:'95vh', backgroundColor:'white', 'max-height' : '90vh', overflow:'scroll'}}>
                        <div style={{height:'50vh', padding:10, display:'flex'}}>
                            <Carousel index={0} swipeable
                                      onPostChange = {(e)=>{
                                          this.setState({
                                              questionIndex : e.activeIndex
                                          }, this.update);
                                      }}
                                      itemHeight={30} autoScrollRatio={0.4} autoScroll>
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
                        {this.renderEstimates()}
                    </div>
                    {this.renderBottom()}
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