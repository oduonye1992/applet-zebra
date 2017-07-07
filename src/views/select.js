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
import Splash from './splash';
import MainPage from '../tabs';

class Select extends Component {
    constructor(props){
        super(props);
        this.state = {
            results : [
                {
                    id : 1,
                    image : 'https://unsplash.it/200/300',
                    title : 'AllState',
                    description : 'Stop overpaying for your Auto insurance',
                    amount : '$186'
                },
                {
                    id : 2,
                    image : 'https://unsplash.it/210/300',
                    title : 'State Farm',
                    description : '',
                    amount : '$201'
                },
                {
                    id : 3,
                    image : 'https://unsplash.it/220/300',
                    title : 'Nationwide',
                    description : '',
                    amount : '$210'
                },
                {
                    id : 4,
                    image : 'https://unsplash.it/240/300',
                    title : 'General Casualty',
                    description : '',
                    amount : '$238'
                },
                {
                    id : 5,
                    image : 'https://unsplash.it/250/300',
                    title : 'Farmers Union Insurance',
                    description : '',
                    amount : '$250'
                },
                {
                    id : 6,
                    image : 'https://unsplash.it/260/300',
                    title : 'American Family',
                    description : '',
                    amount : '$238'
                },
                {
                    id : 7,
                    image : 'https://unsplash.it/260/300',
                    title : 'West bend Mutual',
                    description : '',
                    amount : '$296'
                }
            ],
            parent : store.getState(),
            openSnackbar : false,
            openActionMessage : ''
        };
        this.payWithPayStack = this.payWithPayStack.bind(this);
    }
    payWithPayStack(amount){
        let container = this;
        let handler = window.PaystackPop.setup({
            key: 'pk_test_ba97dfac0baea6f0ae4201cb30bf84bebf0c9f54',
            email: 'adegoke.taofeek@gmail.com',
            amount: amount*100,
            ref: Math.floor((Math.random() * 10000) + 10000001),
            metadata: {
                custom_fields: []
            },
            callback: function(response){
                // alert('success. transaction ref is ' + response.reference);
                container.sendSMS(amount);
            },
            onClose: function(){
                alert('window closed');
            }
        });
        handler.openIframe();
    }
    renderFooter(){
        return <div
            onClick={()=>{

            }}
            style={{position:'absolute', bottom:0, width:'100vw',
                alignItems:'center',
                height:'8vh', backgroundColor:'black', justifyContent:'center', display:'flex'}}>
            <p style={{textAlign:'center', color:'white'}}>Call to Get Free Quotes</p>
        </div>
    }
    sendSMS(amt){
        let container = this;
        let phoneNumber = '2348098168509';// '2349068972583';//8039774040
        let message = 'Hello Emmanuel, Your purchase of the Mutual Benefit Auto Insurance Policy for '+amt+' was successful';
        fetch('https://aqueous-sands-14811.herokuapp.com/api/sms/?phone='+phoneNumber+'&message='+encodeURIComponent(message))
            .then()
            .catch(e => {
                //alert(e.message);
            });
        this.setState({
            openSnackbar : true,
            snackBarMessage : 'Creating Policy....',
            openActionMessage : 'Cancel'
        }, ()=>{
            setTimeout(()=>{
                this.setState({
                    openSnackbar : true,
                    snackBarMessage : 'Policy Created!',
                    openActionMessage : 'OK '
                }, ()=>{
                    setTimeout(()=>{
                        container.props.navigator.pushPage({
                            component : MainPage
                        });
                    }, 1000);
                })
            }, 2000)
        });
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    render(){
        return <Page
                    renderToolbar={() =>
                        <Toolbar>
                            <div className='left' style={{backgroundColor:'#8e44ad'}}>
                                <ToolbarButton onClick={()=>{
                                    this.props.navigator.popPage();
                                }}>
                                    <Icon icon = "ion-chevron-left" style={{color:'white'}} />
                                </ToolbarButton>
                            </div>
                            <div className='center' style={{backgroundColor:'#8e44ad', color:''}}>
                            </div>
                            <div className='right' style={{backgroundColor:'#8e44ad'}}></div>
                        </Toolbar>
                    }
                >
            <div style={{height:'5vh', backgroundColor:'#8e44ad', display:'flex', flexDirection:'column', padding:20, justifyContent:'center'}}>
                <h4 style={{color:'white'}}>Select a Quote</h4>
            </div>
            <Snackbar
                open={this.state.openSnackbar}
                message={this.state.snackBarMessage}
                contentStyle={{
                    fontFamily : 'Avenir'
                }}
                action={this.state.openActionMessage}
                autoHideDuration={5000}
                onRequestClose={()=>{
                        this.setState({
                            openSnackbar : false
                        });
                    }
                }
            />
            <section style={{paddingLeft:10, paddingRight:10, maxHeight:'80vh', overflow:'scroll'}}>
                {this.state.parent.temp_zebra.estimates.map(res => {
                    return <ListItem
                        style={{borderBottom:'1px solid #ecf0f1'}}
                        longdivider
                        onTouchTap={()=>{
                            store.dispatch({
                                type : 'NEW_POLICY',
                                data : {
                                    value : res
                                }
                            });
                            this.setState({
                                openSnackbar : true,
                                snackBarMessage : 'Please Wait...',
                                openActionMessage : 'Cancel'
                            });
                            this.payWithPayStack(3 * (res.monthly_estimate.toFixed(0) + 1));
                        }}
                        key={res.carrier_id}>
                        <div className='center'>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                <p>{res.carrier_display_name}</p>
                            </div>
                        </div>
                        <div className='right'>
                            <div>
                                <p size="30" style={{fontSize:'30px',  color:'#2c3e50'}}>N{3 * (res.monthly_estimate.toFixed(0) + 1)}/Yr</p>
                            </div>
                        </div>
                    </ListItem>
                })}
            </section>
        </Page>
    }
}

Select.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default Select;