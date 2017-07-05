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
import ClaimView from './claim_view';
import ClaimAdd from './claim_add';


class ClaimList extends Component {
    constructor(props){
        super(props);
        this.state = {
            parent : store.getState()
        }
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidMount(){
        this.subscribe();
    }
    subscribe(){
        let that =  this;
        store.subscribe(()=>{
            that.setState({
                parent : store.getState()
            });
        })
    }
    claim_list = [
        {
            title : 'Auto Insurance claim',
            date : '2016/08/13',
            status : 'processing',
            stage : 3
        },
        {
            title : 'Life Insurance claim',
            date : '2008/08/13',
            status : 'error',
            stage : 2
        },
        {
            title : 'Life Insurance claim',
            date : '2009/08/13',
            status : 'error',
            stage : 4
        },
        {
            title : 'Bicycle Insurance claim',
            date : '2017/08/13',
            status : 'successful',
            stage : 5
        }
    ];
    claimColorMap = {
        'processing' : '#f39c12',
        'error' : '#e74c3c',
        'successful' : '#1abc9c'
    };
    render(){
        return <Page
                renderFixed={() => {
                    return <FloatingActionButton
                        onTouchTap={()=>{
                                this.props.navigator.pushPage({
                                    component : ClaimAdd
                                });
                            }
                        }
                        backgroundColor="#1abc9c" style={{marginRight: 20, position:'relative', top:'80vh', left:'80vw'}}>
                        <ContentAdd />
                    </FloatingActionButton>
                }}
                renderToolbar={() =>
                    <Toolbar>
                        <div className='left' style={{backgroundColor:'#1abc9c'}}>

                        </div>
                        <div className='center' style={{backgroundColor:'#1abc9c', color:''}}>
                        </div>
                        <div className='right' style={{backgroundColor:'#1abc9c'}}></div>
                    </Toolbar>
                }
                >
            <div style={{height:'5vh', backgroundColor:'#1abc9c', display:'flex', flexDirection:'column', padding:20, justifyContent:'center'}}>
                <h4 style={{color:'white'}}>My Claims</h4>
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
                {this.renderMode()}
            </section>
        </Page>
    }
    renderMode(){
        if (!this.state.parent.claims.length){
            return <div style={{height:'80vh', display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                <Icon icon ="ion-ios-medkit-outline" size = "40" style={{fontSize:40}} />
                <p>No Claims Available Yet</p>
            </div>
        } else {
            return <div>
            {this.state.parent.claims.map(res => {
                return <ListItem
                    style={{borderBottom:'1px solid #ecf0f1', margin:0}}
                    longdivider
                    onTouchTap={()=>{
                        this.props.navigator.pushPage({
                            component : ClaimView,
                            props : {
                                selected : res
                            }
                        });
                    }}
                    key={res.carrier_id}>
                    <div className='center'>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                            <p>{res.claim_type}</p>
                            <p style={{fontSize:'small', marginTop:'-2vh', color:'#7f8c8d'}}>{res.status}</p>
                        </div>
                    </div>
                    <div className='right'>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <Icon icon="ion-record" size = "20" style={{fontSize:20, color:this.claimColorMap[res.status]}} />
                        </div>
                    </div>
                </ListItem>
            })}
            </div>
        }
    }
}

ClaimList.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default ClaimList;