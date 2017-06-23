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
            current_number_of_users : 0,
            current_estimate_for : null,
            current_package_level : null,
            current_products : [],
            current_contract_type : null,
            current_discount_available : null,
            year : 2017,
            model : null,
            make : null
        };
        this.fetchRecords = this.fetchRecords.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }
    update(obj){}
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidMount(){
        this.subscribe();
        // this.fetchRecords();
    }
    fetchRecords(){
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let url = 'https://www.thezebra.com/api/internal/v1/quote/session-based/?fetch=false&ad_src_id=f';
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
                store.dispatch({
                    type : 'STUFF_CHANGED',
                    data : {
                        key : 'zebra',
                        value : res
                    }
                });
            })
            .catch(e => {
                console.error(e.message);
            })
    }
    subscribe(){
        let that = this;
        store.subscribe(()=>{
            that.setState({
                parent : store.getState()
            });
        })
    }
    convertObjToArray(obj){
        let returnArray = [];
        for (let key in obj){
            returnArray.push(obj[key]);
        }
        return returnArray;
    }
    convertArrayToObj(arr, identifier){
        let returnObj = {};
        for (let i = 0; i < arr.length; i++){
            returnObj[arr[i][identifier]] = arr[i];
        }
        return returnObj
    }

    renderEstimate(){
        return <ListItem
            longdivider
            onTouchTap={()=>{
                this.setState({
                    isOpen : true,
                    visibleOption : 'estimate'
                });
            }}
            key="ssasa"
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-ios-personadd-outline" size="40" style={{color:'#91acb9', fontSize:'40px'}} />
                </div>
            </div>
            <div className='center'>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                    <p style={{fontSize:'smaller'}}>Customize quote for </p>
                    <TextField
                        hintText="Firstname Lastname"
                        hintStyle={{fontFamily:'Avenir', color:'#2c3e50'}}
                        inputStyle={{fontFamily:'Avenir', color:'#2c3e50'}}
                        style={{marginTop:-20}}
                    /><br />
                </div>
            </div>
            <div className='right'>
                <div>
                    <Icon icon = "ion-ios-arrow-right" size="30" style={{fontSize:'30px',  color:'#bdc3c7'}} />
                </div>
            </div>
        </ListItem>
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
                                year : payload
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
                        {store.getState().lists.years.map(res => {
                            return <MenuItem value={res.id} primaryText={res.title} />
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
                                make : c
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
                        {store.getState().lists.makes.map(res => {
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
    renderNumberOfUsers(){
        return <ListItem
            key="askmdsdsa"
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-ios-navigate-outline" size="40" style={{color:'#53adde', fontSize:'40px'}} />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p style={{fontSize:'smaller'}}>Enter your ZIP code </p>
                    <TextField
                        hintText=""
                        style={{marginTop:-20}}
                    /><br />
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
                        {store.getState().lists.models.map(res => {
                            return <MenuItem value={res.model} primaryText={res.model} />
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
    renderDiscount(){
        return null;
        return <ListItem
            onTouchTap={()=>{
                this.setState({
                    isOpen : true,
                    visibleOption : 'discount'
                });
            }}
            key="212212"
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-ios-pricetags-outline" size="35" style={{color:'#8e44ad', fontSize:'35px'}} />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p style={{fontSize:'smaller'}}>Discount Available </p>
                    <p style={{ marginTop:-10, fontSize:'15px'}}>{this.state.current_discount_available ? this.state.current_discount_available.title : 'Please Specify'}</p>
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
                    this.props.navigator.pushPage({
                        component : Home
                    });
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