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
            parent : store.getState()
        }
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
                autoHideDuration={4000}
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
                        longdivider
                        onTouchTap={()=>{
                            store.dispatch({
                                type : 'NEW_POLICY',
                                data : {
                                    value : res
                                }
                            });
                            if (window.formelo){
                                window.formelo.InAppBrowser('https://paystack.com/pay/insuredemo', {})
                                    .then(res=>{

                                    })
                                    .then(e => {

                                    });
                            } else {
                                let win = window.open('https://paystack.com/pay/insuredemo', '_blank');
                                win.focus();
                            }
                        }}
                        key={res.carrier_id}>
                        <div className='center'>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                <p>{res.carrier_display_name}</p>
                                <p style={{fontSize:'small', marginTop:'-2vh'}}>{res.carrier_description.substr(0, 200)+'...'}</p>
                            </div>
                        </div>
                        <div className='right'>
                            <div>
                                <p size="30" style={{fontSize:'30px',  color:'#2c3e50'}}>{res.monthly_estimate.toFixed(2)}</p>
                            </div>
                        </div>
                    </ListItem>
                })}
            </section>
            <div
                onClick={()=>{

                }}
                style={{position:'absolute', bottom:0, width:'100vw',
                alignItems:'center',
                height:'8vh', backgroundColor:'black', justifyContent:'center', display:'flex'}}>
                <p style={{textAlign:'center', color:'white'}}>Call to Get Free Quotes</p>
            </div>
        </Page>
    }
}

Select.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default Select;