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
            current_discount_available : null
        }
    }
    update(obj){}
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidMount(){
        this.subscribe();
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
                        value={1}
                        onChange={()=>{}}
                        style={{
                            marginTop:-20
                        }}
                        labelStyle={{
                            color:'#2c3e50',
                            fontFamily:'Avenir'
                        }}
                    >
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
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
                        value={1}
                        onChange={()=>{}}
                        style={{
                            marginTop:-20
                        }}
                        labelStyle={{
                            color:'#2c3e50',
                            fontFamily:'Avenir'
                        }}
                    >
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
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
                        value={1}
                        onChange={()=>{}}
                        style={{
                            marginTop:-20
                        }}
                        labelStyle={{
                            color:'#2c3e50',
                            fontFamily:'Avenir'
                        }}
                    >
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
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

    render(){
        return <Page
            renderToolbar={() =>
                <Toolbar>
                    <div className='left' style={{backgroundColor:'white'}}></div>
                    <div className='center' style={{backgroundColor:'white', color:'#2c3e50'}}>
                        Compare Insurance
                    </div>
                    <div className='right' style={{backgroundColor:'white'}}></div>
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
            <section style={{padding:10, maxHeight:'80vh', overflow:'scroll'}}>
                {this.renderEstimate()}
                {this.renderNumberOfUsers()}
                {this.renderPackage()}
                {this.renderProducts()}
                {this.renderContract()}
                {this.renderDiscount()}
            </section>
            <div
                onClick={()=>{
                    this.props.navigator.pushPage({
                        component : Home
                    });
                }}
                style={{position:'absolute', bottom:0, width:'100vw',
                alignItems:'center',
                height:'8vh', backgroundColor:'#1abc9c', justifyContent:'center', display:'flex'}}>
                <p style={{textAlign:'center', color:'white'}}>Get Quotes</p>
            </div>
        </Page>
    }
}

ActionList.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default ActionList;