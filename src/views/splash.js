import React, {Component} from 'react';
import {Page, Toolbar,Button, List,ListItem,ListHeader,
    Icon, ToolbarButton, Input, Modal, notification,  Carousel, CarouselItem} from 'react-onsenui';
import store from '../redux/store';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
        title : 'Auto',
        description : 'Every dollar counts. Get protected for less',
        id : 0
    },
    {
        icon : 'ion-ios-body-outline',
        color : '#e74c3c',
        title : 'Life',
        description : 'Think bout your family. Insure your life now',
        id : 1
    },
    {
        icon : 'ion-ios-medical-outline',
        color : '#8e44ad',
        title : 'Medical',
        description : 'Malaria? No Problem. We got you covered',
        id : 2
    }
];
const tilesData = [
    {
        img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/vegetables-790022_640.jpg',
        title: 'Vegetables',
        author: 'jill111',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
];
class Splash extends Component {
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

    render(){
        return <Page>
            <section style={{maxHeight:'100vh', overflow:'scroll'}}>
                <div style={{height:'30vh'}}>
                    <Carousel style={{height:'30vh'}} index={0} swipeable onPostChange = {(e)=>{}} itemHeight='30vh' autoScrollRatio={0.4} autoScroll >
                        {featuredItems.map(res => {
                           return <CarouselItem key={res.id}>
                               <div style={{height:'30vh', backgroundColor:res.color,
                                   display:'flex', alignItems:'center', justifyContent:'space-between',
                                   paddingLeft:30, paddingRight:30
                               }}>
                                   <Icon icon = {res.icon} size="80" style={{fontSize:80, color:'white'}} />
                                   <div style={{width:'60vw', display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                                       <h1 style={{color:'white'}}>{res.title}</h1>
                                       <p style={{color:'white', marginTop:'-3vh', textAlign:'right'}}>{res.description}</p>
                                   </div>
                               </div>
                           </CarouselItem>
                        })}
                    </Carousel>
                </div>
                <div style={{padding:5}}>
                    {items.map(res => {
                       return <div style={{marginBottom:'-12vh'}}>
                           <div style={{paddingLeft:10}}>
                               <h5>{res.title}</h5>
                           </div>
                           <GridList style={styles.gridList} cols={2.2}>
                               {res.items.map((item) => (
                                   <GridTile
                                       key={item.title}
                                       titleStyle={styles.titleStyle}
                                       titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                   >
                                       <div
                                           onClick={()=>{
                                               this.props.navigator.pushPage({
                                                   component : Home
                                               });
                                            }
                                           }
                                           style={{height:100, width:100, display:'flex',
                                           flexDirection:'column',
                                           alignItems:'center', justifyContent:'center'}}>
                                           <Icon icon = {item.icon} size="80" style={{fontSize:60, color:item.color}} />
                                           <p style={{textAlign:'center', fontSize:'small', color:'#2c3e50'}}>{item.title}</p>
                                       </div>
                                   </GridTile>
                               ))}
                           </GridList>
                       </div>
                    })}
                </div>
            </section>
        </Page>
    }
}

Splash.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default Splash;