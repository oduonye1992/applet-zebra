import React, {Component} from 'react';
import {Page, Toolbar,Button, List,ListItem,ListHeader,Fab,
    Icon, ToolbarButton, Input, Modal, notification} from 'react-onsenui';
import store from '../../redux/store';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Home from '../home';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
const moment = require('moment');


class PolicyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            parent : store.getState()
        }
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    claim_list = [
        {
            title : 'Auto Insurance claim',
            date : '2016/08/13',
            status : 'processing',
            amount : 'N13,120'
        },
        {
            title : 'Life Insurance claim',
            date : '2008/08/13',
            status : 'error',
            amount : 'N10,000'
        },
        {
            title : 'Phone Insurance',
            date : '2009/08/13',
            status : 'error',
            amount : 'N2,000'
        },
        {
            title : 'Bicycle Insurance claim',
            date : '2017/08/13',
            status : 'successful',
            amount : 'N1050'
        }
    ];
    claimColorMap = {
        'processing' : '#f39c12',
        'error' : '#e74c3c',
        'successful' : '#1abc9c'
    };
    convertUnicode(input) {
        return input.replace(/\\u(\w\w\w\w)/g,function(a,b) {
            var charcode = parseInt(b,16);
            return String.fromCharCode(charcode);
        });
    }
    render(){
        return <Page
                renderToolbar={() =>
                    <Toolbar>
                        <div className='left' style={{backgroundColor:'#3498db'}}>
                            <ToolbarButton onClick={()=>{

                            }}>
                            </ToolbarButton>
                        </div>
                        <div className='center' style={{backgroundColor:'#3498db', color:''}}>
                        </div>
                        <div className='right' style={{backgroundColor:'#3498db'}}></div>
                    </Toolbar>
                }
                >
            <div style={{height:'5vh', backgroundColor:'#3498db', display:'flex', flexDirection:'column', padding:20, justifyContent:'center'}}>
                <h4 style={{color:'white'}}>My Policies</h4>
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
                {this.claim_list.map(res => {
                    return <ListItem
                        style={{borderBottom:'1px solid #ecf0f1', margin:0}}
                        longdivider
                        onTouchTap={()=>{

                        }}
                        key={res.carrier_id}>
                        <div className='center'>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                <p>{res.title}</p>
                                <p style={{fontSize:'small', marginTop:'-1vh', color:'#7f8c8d'}}>{moment(res.date).format('LLLL')}</p>
                            </div>
                        </div>
                        <div className='right'>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'center'}}>
                                <p size="30" style={{fontSize:'25px',  color:'#2c3e50'}}>{res.amount}</p>
                                <p style={{fontSize:'small', marginTop:'-3vh', color:'#7f8c8d'}}>Per month</p>
                            </div>
                        </div>
                    </ListItem>
                })}
            </section>
        </Page>
    }
}

PolicyList.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default PolicyList;