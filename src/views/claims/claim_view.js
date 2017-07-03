import React, {Component} from 'react';
import {Page, Toolbar,Button, List,ListItem,ListHeader,
    Icon, ToolbarButton, Input, Modal, notification} from 'react-onsenui';
import store from '../../redux/store';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Home from '../home';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        color:'white'
    },
};

class ClaimView extends Component {
    constructor(props){
        super(props);
        this.state = {
            parent : store.getState()
        }
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});
    };
    claimColorMap = {
        'processing' : '#f39c12',
        'error' : '#e74c3c',
        'successful' : '#1abc9c'
    };
    render(){
        let selected = this.props.selected;
        return <Page
            renderToolbar={() =>
                <Toolbar>
                    <div className='left' style={{backgroundColor:this.claimColorMap[selected.status]}}>
                        <ToolbarButton onClick={()=>{
                            this.props.navigator.popPage();
                        }}>
                            <Icon icon = "ion-chevron-left" style={{color:'white'}} />
                        </ToolbarButton>
                    </div>
                    <div className='center' style={{backgroundColor:this.claimColorMap[selected.status]}}>
                    </div>
                    <div className='right' style={{backgroundColor:this.claimColorMap[selected.status]}}>

                    </div>
                </Toolbar>
            }
        >
            <div style={{height:'5vh', backgroundColor:this.claimColorMap[selected.status], display:'flex', flexDirection:'column', padding:20, justifyContent:'space-around'}}>
                <h4 style={{color:'white'}}>Auto Insurance Claim</h4>
                <p style={{color:'white', marginTop:'-3vh'}}>{selected.status}</p>
            </div>
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Status" value="b" style={{backgroundColor:this.claimColorMap[selected.status], textTransform:'inherit'}}>
                    <div>
                        <ListItem
                            longdivider
                            key="das">
                            <div className='left'>
                                <div>
                                    <Icon size="30" icon ="ion-ios-copy-outline" style={{fontSize:30, color:'#7f8c8d'}} />
                                </div>
                            </div>
                            <div className='center'>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                    <p>File claim committed</p>
                                </div>
                            </div>
                            <div className='right'>
                                <div>
                                    <Icon size="20" icon ="ion-checkmark" style={{fontSize:20, color:'#1abc9c'}} />
                                </div>
                            </div>
                        </ListItem>
                        <ListItem
                            longdivider
                            key="dass">
                            <div className='left'>
                                <div>
                                    <Icon size="30" icon ="ion-ios-printer-outline" style={{fontSize:30, color:'#8e44ad'}} />
                                </div>
                            </div>
                            <div className='center'>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                    <p>Approve Fiscal Manipulation</p>
                                </div>
                            </div>
                            <div className='right'>
                                <div>
                                    <Icon size="20" icon ="ion-checkmark" style={{fontSize:20, color:'#1abc9c'}} />
                                </div>
                            </div>
                        </ListItem>
                        <ListItem
                            longdivider
                            key="dgfsasas">
                            <div className='left'>
                                <div>
                                    <Icon size="30" icon ="ion-ios-search" style={{fontSize:30, color:'#e74c3c'}} />
                                </div>
                            </div>
                            <div className='center'>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                    <p>Verify Supporting documents</p>
                                </div>
                            </div>
                            <div className='right'>
                                <div>
                                    <Icon size="20" icon ="ion-load-a" style={{fontSize:20, color:'#7f8c8d'}} />
                                </div>
                            </div>
                        </ListItem>
                        <ListItem
                            longdivider
                            key="dgssdfgfas">
                            <div className='left'>
                                <div>
                                    <Icon size="30" icon ="ion-ios-chatboxes-outline" style={{fontSize:30, color:'#1abc9c'}} />
                                </div>
                            </div>
                            <div className='center'>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                    <p>Verify Owner</p>
                                </div>
                            </div>
                            <div className='right'>
                                <div>
                                    <Icon size="20" icon ="ion-load-a" style={{fontSize:20, color:'#7f8c8d'}} />
                                </div>
                            </div>
                        </ListItem>
                        <ListItem
                            longdivider
                            key="dewegssdfas">
                            <div className='left'>
                                <div>
                                    <Icon size="30" icon ="ion-ios-monitor-outline" style={{fontSize:30, color:'#3498db'}} />
                                </div>
                            </div>
                            <div className='center'>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                    <p>Provide Claim</p>
                                </div>
                            </div>
                            <div className='right'>
                                <div>
                                    <Icon size="20" icon ="ion-load-a" style={{fontSize:20, color:'#7f8c8d'}} />
                                </div>
                            </div>
                        </ListItem>
                    </div>
                </Tab>
                <Tab label="Details" value="a" style={{backgroundColor:this.claimColorMap[selected.status], textTransform:'inherit'}}>
                    <div style={{backgroundColor:'#ecf0f12', height:'80vh', maxHeight:'70vh', overflow:'scroll'}}>
                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                                title="Details of Insured"
                                actAsExpander={true}
                            />
                            <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
                            <CardText expandable={true}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                        </Card>
                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                                title="Loss details"
                                actAsExpander={true}
                            />
                            <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
                            <CardText expandable={true}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                        </Card>
                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                                title="Details of Driver at the time of accident"
                                actAsExpander={true}
                            />
                            <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
                            <CardText expandable={true}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                        </Card>
                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                                title="Details of Injury and Police report"
                                actAsExpander={true}
                            />
                            <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
                            <CardText expandable={true}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                        </Card>
                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                                title="Additional details"
                                actAsExpander={true}
                            />
                            <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
                            <CardText expandable={true}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                        </Card>
                    </div>
                </Tab>
            </Tabs>
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
        </Page>
    }
}

ClaimView.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default ClaimView;