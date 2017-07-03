import React, {Component} from 'react';
import {Page, Toolbar,Button, List,ListItem,ListHeader,
    Icon, ToolbarButton, Input, Modal, notification} from 'react-onsenui';
import store from '../redux/store';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Home from './home';

class ActionList extends Component {
    constructor(props){
        super(props);
        this.state = {
            total : 0,
            items : [],
            isOpen : false,
            visibleOption : null,
            parent : store.getState(),
            openSnackbar : false,
            snackBarMessage : '',
            openActionMessage : '',
            zip_code : '',
            current_number_of_users : 0,
            current_estimate_for : null,
            current_package_level : null,
            current_products : [],
            current_contract_type : null,
            current_discount_available : null,
            year : null,
            model : {},
            make : null,
            years : [],
            models : [],
            makes : [],
            zebra : null,
            zebra_questions : null
        };
        this.fetchRecords = this.fetchRecords.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.fetchYear = this.fetchYear.bind(this);
        this.fetchModel = this.fetchModel.bind(this);
        this.fetchMake = this.fetchMake.bind(this);
        this.logError = this.logError.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.fetchZipCodeStatus =  this.fetchZipCodeStatus.bind(this);
    }
    fetchZipCodeStatus(){
        return new Promise((resolve, reject) => {
            let url = "https://www.thezebra.com/api/v2/zipcodes/"+this.state.zip_code;
            fetch(this.proxy+url, {mode: 'cors'})
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
                    store.dispatch({
                        type : 'STUFF_CHANGED',
                        data : {
                            key : 'zebra_questions_meta',
                            value : res
                        }
                    });
                    resolve();
                })
                .catch(reject)
        });
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidMount(){
        this.fetchRecords();
        this.subscribe();
        this.fetchYear();
    }
    fetchYear(){
        this.setState({
            openSnackbar : true,
            snackBarMessage : 'Loading cars...'
        });
        let url = 'https://www.thezebra.com/api/v2/vehicles/years/';
        fetch(this.proxy+url, {mode: 'cors'})
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
                if(res && res.result){
                    this.setState({
                        years : res.result,
                        openSnackbar : false,
                        snackBarMessage : 'Loading cars...'
                    });
                }
            })
            .catch(this.logError)
    }
    fetchModel(){
        this.setState({
            openSnackbar : true,
            snackBarMessage : 'Loading cars...'
        });
        let url = 'https://www.thezebra.com/api/v2/vehicles/years/'+this.state.year+'/makes/'+this.state.make+'/models/';
        fetch(this.proxy+url, {mode: 'cors'})
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
                if(res && res.result){
                    this.setState({
                        models : res.result,
                        openSnackbar : false,
                        snackBarMessage : ''
                    });
                }
            })
            .catch(this.logError)
    }
    fetchMake(){
        this.setState({
            openSnackbar : true,
            snackBarMessage : 'Loading Models...'
        });
        let url = 'https://www.thezebra.com/api/v2/vehicles/years/'+this.state.year+'/makes/';
        fetch(this.proxy+url, {mode: 'cors'})
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
                if(res && res.result){
                    this.setState({
                        makes : res.result,
                        openSnackbar : false,
                        snackBarMessage : ''
                    });
                }
            })
            .catch(this.logError)
    }
    logError(e){
        this.setState({
            openSnackbar : true,
            snackBarMessage : 'An error has occured'
        });
        alert(e.message);
    }
    proxy = "https://cors-anywhere.herokuapp.com/";
    fetchRecords(){
        let url = 'https://www.thezebra.com/api/internal/v1/quote/session-based/?ad_src_id=f';
        fetch(this.proxy+url, {mode: 'cors'})
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
                });
            })
            .catch(this.logError)
    }
    submitForm(){
        let ze = this.state.zebra;
        ze['city'] = "Lamona";
        ze['zipcode'] = "99144";
        ze['serial_request_id'] = 1498835458270;
        ze['state'] = "WA";
        ze['vehicles'] = [{
            "collision": null,
            "comprehensive": null,
            "garaging_address": null,
            "has_alarm": null,
            "make": "Tesla",
            "miles_per_year": null,
            "model": "Model S",
            "ownership": null,
            "primary_use": null,
            "rental_limit": null,
            "submodel": "60 4dr Liftback",
            "towing_limit": null,
            "vehicle_display_name": null,
            "vehicle_id": 263017,
            "vin": null,
            "year": 2017
        }];
        let a = {"id":ze.id,"session_id":ze.session_id,"channel_id":"3ACF01","subid":null,"subid2":null,"subid3":null,"subid4":null,"subid5":null,"subid6":null,"subid7":null,"keyword":null,"medium":null,"source":null,"buy_quote_ref_id":null,"zipcode":"99144","city":"Lamona","state":"WA","credit_score":null,"currently_insured":null,"prior_carrier":null,"prior_carrier_coverage_months":null,"home_ownership":null,"coverage":0,"coverage_selected":null,"drivers":[{"age":null,"age_first_licensed":null,"dob":null,"driver_relationship":null,"drivers_training":null,"education":null,"employment":null,"excluded":null,"first_name":null,"gender":null,"good_student":null,"incidents":[],"incidents_selected":null,"is_student":false,"last_name":null,"marital_status":null,"other_applicable":null,"primary_driver":true,"uuid":null}],"vehicles":[{"year":"2016","make":"Acura","model":"MDX","submodel":"4dr SUV","vehicle_id":247652}],"is_mobile":true,"mobile_driver_count":1,"mobile_vehicle_count":1,"has_completed_mdv":false,"ip_address":"197.149.67.66","user_agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1","serial_request_id":1499076515930,"first_name":null,"last_name":null,"phone_number":null,"email":null,"address":null}
        store.dispatch({
            type : 'STUFF_CHANGED',
            data : {
                key : 'zebra_questions',
                value : a
            }
        });
        store.dispatch({
            type : 'STUFF_CHANGED',
            data : {
                key : 'zebra',
                value : ze
            }
        });
        this.props.navigator.pushPage({
            component : Home
        });
    }
    subscribe(){
        let that = this;
        store.subscribe(()=>{
            that.setState({
                parent : store.getState()
            });
        })
    }
    renderPackage(){
        return <ListItem
            key="asalamsallassa"
                >
            <div className='left'>
                <div>
                    <Icon icon = "ion-ios-time-outline" size="35" style={{color:'#2ECEAE', fontSize:'35px'}} />
                </div>
            </div>
            <div className='center'>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                    <p style={{fontSize:'smaller'}}>Vehicle Year </p>
                    <SelectField
                        value={this.state.year}
                        onChange={(event, key, payload)=>{
                            this.setState({
                                year : payload,
                                model : {},
                                make : null
                            }, ()=>{
                                this.fetchMake();
                            });
                        }}
                        style={{
                            marginTop:-20
                        }}
                        labelStyle={{
                            color:'#2c3e50',
                            fontFamily:'Avenir'
                        }}
                    >
                        {this.state.years.map(res => {
                            return <MenuItem value={res.year} primaryText={res.year} />
                        })}
                    </SelectField>
                </div>
            </div>
            <div className='right'>
                <div>
                    <Icon icon = "ion-ios-arrow-right" size="30" style={{fontSize:'30px',  color:'#bdc3c7'}} />
                </div>
            </div>
        </ListItem>
    }
    renderProducts(){
        return <ListItem
            key="adsdsdssa"
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-model-s" size="30" style={{color:'#bdc3c7', fontSize:'30px'}} />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p style={{fontSize:'smaller'}}>Vehicle Type </p>
                    <SelectField
                        value={this.state.make}
                        onChange={(a, b, c)=>{
                            this.setState({
                                make : c,
                                model : {}
                            },()=>{
                                this.fetchModel();
                            });
                        }}
                        style={{
                            marginTop:-20
                        }}
                        labelStyle={{
                            color:'#2c3e50',
                            fontFamily:'Avenir'
                        }}
                    >
                        {this.state.makes.map(res => {
                            return <MenuItem value={res.make} primaryText={res.make} />
                        })}
                    </SelectField>
                </div>
            </div>
            <div className='right'>
                <div>
                    <Icon icon = "ion-ios-arrow-right" size="30" style={{fontSize:'30px',  color:'#bdc3c7'}} />
                </div>
            </div>
        </ListItem>
    }
    renderContract(){
        return <ListItem
            key="asa"
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-ios-speedometer-outline" size="35" style={{color:'#9b59b6', fontSize:'35px'}} />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p style={{fontSize:'smaller'}}>Vehicle Model </p>
                    <SelectField
                        value={this.state.model}
                        onChange={(a, b, c)=>{
                            this.setState({
                                model : c
                            });
                        }}
                        style={{
                            marginTop:-20
                        }}
                        labelStyle={{
                            color:'#2c3e50',
                            fontFamily:'Avenir'
                        }}
                    >
                        {this.state.models.map(res => {
                            return <MenuItem value={JSON.stringify(res)} primaryText={res.model} />
                        })}
                    </SelectField>
                </div>
            </div>
            <div className='right'>
                <div>
                    <Icon icon = "ion-ios-arrow-right" size="30" style={{fontSize:'30px',  color:'#bdc3c7'}} />
                </div>
            </div>
        </ListItem>
    }
    renderFooter(){
        if (this.state.model && this.state.year && this.state.make){
            return <div
                onClick={()=>{
                    this.submitForm();
                }}
                style={{position:'absolute', bottom:0, width:'100vw',
                    alignItems:'center',
                    height:'8vh', backgroundColor:'black', justifyContent:'center', display:'flex'}}>
                <p style={{textAlign:'center', color:'white'}}>Get Quotes</p>
            </div>
        } else {
            return <div
                onClick={()=>{}}
                style={{position:'absolute', bottom:0, width:'100vw',
                    alignItems:'center',
                    height:'8vh', backgroundColor:'#ecf0f1', justifyContent:'center', display:'flex'}}>
                <p style={{textAlign:'center', color:'#2c3e50'}}>Get Quotes</p>
            </div>
        }
    }
    render(){
        return <Page
            renderToolbar={() =>
                <Toolbar>
                    <div className='left' style={{backgroundColor:'#9b59b6'}}></div>
                    <div className='center' style={{backgroundColor:'#9b59b6', color:'white'}}>

                    </div>
                    <div className='right' style={{backgroundColor:'#9b59b6'}}></div>
                </Toolbar>
            }
        >
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
            <section style={{maxHeight:'90vh', overflow:'scroll'}}>
                <div style={{height:'34vh', backgroundColor:'#9b59b6', display:'flex',
                    flexDirection:'column', alignItems:'flex-start', padding:20, justifyContent:'flex-end'}}>
                    <h3 style={{color:'white'}}>
                        First, some basic questions
                    </h3>
                </div>
                <div style={{padding:10}}>
                    {this.renderPackage()}
                    {this.renderProducts()}
                    {this.renderContract()}
                </div>
            </section>
            {this.renderFooter()}
        </Page>
    }
}

ActionList.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default ActionList;