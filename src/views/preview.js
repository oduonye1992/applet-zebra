import React, {Component} from 'react';
import {Page, Toolbar,Button, List,ListItem,ListHeader,
    Icon, ToolbarButton, Input, Modal, notification,  Carousel, CarouselItem} from 'react-onsenui';
import store from '../redux/store';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionList from './actions_list';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Home from './home';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto'
    },
    titleStyle: {
        color: 'red'
    },
};
const items = [
    {
        title : 'Open the door to your home and savings',
        items : [
            {
                icon : 'ion-ios-home-outline',
                title : 'Homeowners',
                color : '#1abc9c'
            },
            {
                icon : 'ion-ios-flag-outline',
                title : 'Renters',
                color : '#8e44ad'
            },
            {
                icon : 'ion-ios-home-outline',
                title : 'Flood',
                color : '#3498db'
            },
            {
                icon : 'ion-ios-flag-outline',
                title : 'Renters.',
                color : '#8e44ad'
            }
        ]
    },
    {
        title : 'Get your motor running and get a quote',
        items : [
            {
                icon : 'ion-model-s',
                title : 'Auto',
                color : '#e74c3c'
            },
            {
                icon : 'ion-android-bicycle',
                title : 'Motorcycle',
                color : '#2c3e50'
            },
            {
                icon : 'ion-ios-home-outline',
                title : 'ATV',
                color : '#27ae60'
            },
            {
                icon : 'ion-android-bicycle',
                title : 'Motorcycle.',
                color : '#2c3e50'
            }
        ]
    },
    {
        title : 'Open the door to your home and savings',
        items : [
            {
                icon : 'ion-ios-home-outline',
                title : 'Homeowners',
                color : '#1abc9c'
            },
            {
                icon : 'ion-ios-flag-outline',
                title : 'Renters',
                color : '#8e44ad'
            },
            {
                icon : 'ion-ios-home-outline',
                title : 'Flood',
                color : '#3498db'
            },
            {
                icon : 'ion-ios-flag-outline',
                title : 'Renters.',
                color : '#8e44ad'
            }
        ]
    },
    {
        title : 'Get your motor running and get a quote',
        items : [
            {
                icon : 'ion-model-s',
                title : 'Auto',
                color : '#e74c3c'
            },
            {
                icon : 'ion-android-bicycle',
                title : 'Motorcycle',
                color : '#2c3e50'
            },
            {
                icon : 'ion-ios-home-outline',
                title : 'ATV',
                color : '#27ae60'
            },
            {
                icon : 'ion-android-bicycle',
                title : 'Motorcycle.',
                color : '#2c3e50'
            }
        ]
    },
];
const featuredItems = [
    {
        icon : 'ion-model-s',
        color : '#1abc9c',
        title : 'What is Auto Insurance?',
        description : 'Basically you get paid whenever your car gets stolen',
        id : 0
    },
    {
        icon : 'ion-ios-body-outline',
        color : '#e74c3c',
        title : 'Why should I care?',
        description : 'Because we love your car as much as you do. In actual truth, we just need your money',
        id : 1
    },
    {
        icon : 'ion-ios-medical-outline',
        color : '#8e44ad',
        title : 'How does it work?',
        description : 'Simple, you answer a bunch of questions and we provide an amount you have to pay every year. If something goes wrong, we will compensate you with a huge amount also.',
        id : 2
    }
];
class Preview extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.fetchRecords = this.fetchRecords.bind(this);
    }
    update(obj){}
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidMount(){
        this.subscribe();
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
    renderFooter(){
        return <div
            onClick={()=>{
                this.props.navigator.pushPage({
                    component : ActionList
                });
            }}
            style={{position:'absolute', bottom:0, width:'100vw',
                alignItems:'center',
                height:'8vh', backgroundColor:'#2c3e50', justifyContent:'center', display:'flex'}}>
            <p style={{textAlign:'center', color:'white'}}>Get Started</p>
        </div>
    }
    render(){
        return <Page>
            <section style={{maxHeight:'100vh', overflow:'scroll'}}>
                <div style={{height:'92vh'}}>
                    <Carousel style={{height:'92vh'}} index={0} swipeable onPostChange = {(e)=>{}} itemHeight='30vh' autoScrollRatio={0.4} autoScroll >
                        {featuredItems.map(res => {
                           return <CarouselItem key={res.id}>
                               <img src={'https://unsplash.it/200/'+(100-Math.floor(Math.random()*50).toFixed(0))} style={{height:'92vh', width:'100vw'}}></img>

                               <div style={{ position:'absolute', top:0, height:'92vh', backgroundColor:res.color, opacity:0.9,
                                   width:'100vw'
                               }}>
                                   <div className='left' style={{ height:'5vh', padding:10}}>
                                       <ToolbarButton onClick={()=>{
                                           this.props.navigator.popPage();
                                       }}>
                                           <Icon icon = "ion-chevron-left" style={{color:'white'}} />
                                       </ToolbarButton>
                                   </div>
                                   <div style={{height:'82vh', backgroundColor:res.color, opacity:0.9,
                                       display:'flex', alignItems:'flex-start', flexDirection:'column', justifyContent:'space-between',
                                       width:'100vw'
                                   }}>
                                       <div style={{width:'60vw', display:'flex', paddingLeft:30, paddingRight:30, flexDirection:'column', alignItems:'flex-start'}}>
                                           <h1 style={{ color:'white'}}>Auto Insurance</h1>
                                       </div>
                                       <div style={{width:'80vw', display:'flex', paddingLeft:30, paddingRight:30, flexDirection:'column', alignItems:'flex-start'}}>
                                           <h3 style={{color:'white'}}>{res.title}</h3>
                                           <p style={{color:'white', marginTop:'-3vh', fontSize:'larger'}}>{res.description}</p>
                                       </div>
                                   </div>
                               </div>
                           </CarouselItem>
                        })}
                    </Carousel>
                </div>
                {this.renderFooter()}
            </section>
        </Page>
    }
}

Preview.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default Preview;