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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
            pageState : 'default',
            openActionMessage : '',
            modalOpen : true,
            selectedPolicy : null,
            paymentType : null, // card, ussd
        };
        this.payWithPayStack = this.payWithPayStack.bind(this);
        this.payWithUSSD = this.payWithUSSD.bind(this);
        this.triggerPaymentTypeModal = this.triggerPaymentTypeModal.bind(this);
        this.makePayment = this.makePayment.bind(this);
        this.selectPolicy = this.selectPolicy.bind(this);
        this.confirmModeOfPayment = this.confirmModeOfPayment.bind(this);
        this.sendSMS = this.sendSMS.bind(this);
    }
    handleClose(){}
    confirmModeOfPayment(){
        const actions = [
            <FlatButton
                label="Pay With USSD"
                primary={true}
                onTouchTap={()=>{
                    this.setState({
                        paymentType : 'ussd',
                        modalOpen : false
                    }, this.makePayment);
                }}
            />,
            <FlatButton
                label="Pay with ATM Card."
                primary={false}
                onTouchTap={()=>{
                    this.setState({
                        paymentType : 'card',
                        modalOpen : false
                    }, this.makePayment);
                }}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Choose Payment Method"
                    actions={actions}
                    modal={true}
                    open={this.state.modalOpen}
                >
                </Dialog>
            </div>
        );
    }
    renderSuccess(){
        return <Page>
            <div style={{display:'flex', height:'100vh', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <Icon size="100" icon = "ion-android-checkmark-circle" style={{fontSize:100, color:'#1abc9c'}} />
                <h2>Payment Successful</h2>
                <FlatButton
                    label="Return to Main Page"
                    primary={true}
                    onTouchTap={()=>{
                        this.props.navigator.pushPage({
                            component : MainPage
                        });
                    }}
                />
            </div>
        </Page>
    }
    payWithPayStack(amount){
        return new Promise((resolve, reject) => {
            let container = this;
            let handler = window.PaystackPop.setup({
                key: 'pk_test_ba97dfac0baea6f0ae4201cb30bf84bebf0c9f54',
                email: 'adegoke.taofeek@gmail.com',
                amount: amount*100,
                ref: Math.floor((Math.random() * 10000) + 10000001),
                metadata: {
                    custom_fields: []
                },
                callback: async function(response){
                    this.setState({
                        openSnackbar : true,
                        snackBarMessage : 'Creating policy...',
                        openActionMessage : ''
                    });
                    try {
                        let a = await container.payWithUSSD(amount, "card");
                        resolve();
                    } catch (e){
                        resolve();
                    }
                },
                onClose: function(e){
                    reject(e);
                }
            });
            handler.openIframe();
        })
    }
    payWithUSSD(amount, mode) {
        return new Promise((resolve, reject) => {
            let url = "https://insuredemo.formelo.com/api/records";
            let body = {
                "data": {
                    "address": "Block 28, Festac Extension",
                    "agent_code": "self",
                    "agent_group": {
                        "id": "lagos",
                        "name": "Lagos"
                    },
                    "car_manufacturer": "Hummer",
                    "car_model": "H2",
                    "car_usage": {
                        "id": "0.0000000",
                        "name": "Private"
                    },
                    "end_date": "2017-07-21",
                    "first_name": "Daniel",
                    "last_name": "Oduonye",
                    "night_parking": {
                        "id": "0.00",
                        "name": "Inside locked gate"
                    },
                    "payment_type": {
                        "id": mode == "card" ? "card" : "ussd",
                        "name": mode == "card" ? "Card" : "Mobile USSD"
                    },
                    "phone_number": "09097358418",
                    "premium": "50000",
                    "start_date": "2017-07-21",
                    "sum_assured": "10000",
                    "tracker": {
                        "id": "-5",
                        "name": "Yes"
                    },
                    "transaction_status": {
                        "id": "408",
                        "name": "Pending"
                    },
                    "type_of_policy_cover": {
                        "id": "tpft",
                        "name": "Third Party Fire and Theft"
                    },
                    "year_of_manufacture": {
                        "id": "2003",
                        "name": "2003"
                    }
                },
                "model": {
                    "id": "8rd413rx"
                }
            };
            let headers = {
                'Content-Type': 'application/json',
                Authorization : 'bearer atok_jKX6jd7ABgslq76J6l8XTRBrQ3NG77uBdElbDBOkcq9kr2z8yqID9mkjdNQoiJbBgG9kdnT5NVWG'
            };
            let options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            };
            fetch(url, options)
                .then(res => {
                    if (!(res.status == 200 || res.status == 201)){
                        throw new Error(res);
                    }
                    return res;
                })
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e.message);
                })
        })
    }
    async makePayment(amount){
        let container = this;
        let amt = 3 * (this.state.selectedPolicy.monthly_estimate.toFixed(0) + 1)
        this.setState({
            openSnackbar : true,
            snackBarMessage : 'Creating Policy....',
            openActionMessage : 'Cancel'
        });
        try {
            if (this.state.paymentType === 'ussd'){
                const a = await this.payWithUSSD(amt);
            } else {
                const a = await this.payWithPayStack(amt);
            }
            //const b = await this.sendSMS(amt);
            this.setState({
                openSnackbar : true,
                snackBarMessage : 'Policy Created!',
                openActionMessage : 'OK '
            }, ()=>{
                setTimeout(()=>{
                    container.setState({
                        pageState : 'successful'
                    });
                }, 1000);
            });
        } catch (e) {
            this.setState({
                openSnackbar : true,
                snackBarMessage : 'An error has occured',
                openActionMessage : 'OK'
            }, ()=>{
                alert(e.message);
            });
        }
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
        return new Promise((resolve, reject) => {
            let container = this;
            let phoneNumber = '2349068972583';// '2349068972583';//8039774040
            let message = 'Hello Emmanuel, Your purchase of the Mutual Benefit Auto Insurance Policy for '+amt+' was successful';
            fetch('https://aqueous-sands-14811.herokuapp.com/api/sms/?phone='+phoneNumber+'&message='+encodeURIComponent(message))
                .then(res => {
                    return res
                })
                .then(res => {
                    resolve();
                })
                .catch(e => {
                    resolve();
                });
        });
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    selectPolicy(res){
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
        this.makePayment(3 * (res.monthly_estimate.toFixed(0) + 1));
    }
    triggerPaymentTypeModal(res){
        this.setState({
            selectedPolicy : res,
            modalOpen : true
        });
    }
    render(){
        if (this.state.pageState === 'successful'){
            return this.renderSuccess();
        }
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
                {this.confirmModeOfPayment()}
                {this.state.parent.temp_zebra.estimates.map(res => {
                    return <ListItem
                        style={{borderBottom:'1px solid #ecf0f1'}}
                        longdivider
                        onTouchTap={()=>{
                            this.triggerPaymentTypeModal(res);
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