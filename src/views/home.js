import React, {Component} from 'react';
import {Page, Toolbar,
    Icon, ToolbarButton, List, ListItem, Row, Col, Carousel, CarouselItem} from 'react-onsenui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.renderLoader = this.renderLoader.bind(this);
    }
    handleChange = (event, index, value) => this.setState({value});
    renderLoader(){
        return (
            <div style={{height:'5vh', marginTop:'-10vh', display:'flex'}}>
                <span style={{color:'#1abc9c', fontSize:20, marginRight:10}}>●</span>
                <span style={{color:'#ecf0f1', fontSize:20, marginRight:10}}>●</span>
                <span style={{color:'#ecf0f1', fontSize:20, marginRight:10}}>●</span>
                <span style={{color:'#ecf0f1', fontSize:20, marginRight:10}}>●</span>
                <span style={{color:'#ecf0f1', fontSize:20, marginRight:10}}>●</span>
            </div>
        );
    }
    render(){
        return (
            <Page
                style={{backgroundColor:'white'}}
            >
                <div>
                    <div style={{height:'95vh', backgroundColor:'#ecf0f1', 'max-height' : '90vh', overflow:'scroll'}}>
                        <div style={{height:'50vh', padding:10, display:'flex'}}>
                            <Carousel index={1} swipeable  itemHeight={30} autoScrollRatio={0.4} autoScroll>
                                <CarouselItem key={1}>
                                    <Card style={{backgroundColor:'white', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                        <CardText style={{display:'flex', height:'50vh', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                            {this.renderLoader()}
                                            <Icon icon = "ion-model-s" size="80" style={{fontSize:80, color:'#3498db'}} />
                                            <h4 style={{textAlign:'center', color:'#2c3e50'}}>Are you currently insured? If yes, for how long? </h4>
                                            <SelectField
                                                value={2}
                                            >
                                                <MenuItem value={1} primaryText="More than 3 years" />
                                                <MenuItem value={2} primaryText="1 to 3 years" />
                                                <MenuItem value={3} primaryText="7 to 12 Months" />
                                                <MenuItem value={4} primaryText="6 months or less" />
                                                <MenuItem value={5} primaryText="Not currently insured" />
                                            </SelectField>
                                        </CardText>
                                    </Card>
                                </CarouselItem>
                                <CarouselItem key={2}>
                                    <Card style={{backgroundColor:'white', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                        <CardText style={{display:'flex', height:'50vh', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                            {this.renderLoader()}
                                            <Icon icon = "ion-ios-stopwatch-outline" size="80" style={{fontSize:80, color:'#8e44ad'}} />
                                            <h4 style={{textAlign:'center', color:'#2c3e50'}}>Are you currently insured? If yes, for how long? </h4>
                                            <SelectField
                                                value={2}
                                            >
                                                <MenuItem value={1} primaryText="More than 3 years" />
                                                <MenuItem value={2} primaryText="1 to 3 years" />
                                                <MenuItem value={3} primaryText="7 to 12 Months" />
                                                <MenuItem value={4} primaryText="6 months or less" />
                                                <MenuItem value={5} primaryText="Not currently insured" />
                                            </SelectField>
                                        </CardText>
                                    </Card>
                                </CarouselItem>
                            </Carousel>
                        </div>
                        <div style={{padding:10,   display:'flex', justifyContent:'space-between'}}>
                            <Row>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50'}}>West Bend Mutual</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50'}}>32</h2>
                                    </Paper>
                                </Col>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50'}}>North Star Mutual</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50'}}>32</h2>
                                    </Paper>
                                </Col>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50'}}>Allied</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50'}}>32</h2>
                                    </Paper>
                                </Col>
                                <Col width="50">
                                    <Paper zDepth={1} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                        <h4 style={{textAlign:'center', color:'#2c3e50'}}>State Farm</h4>
                                        <h2 style={{textAlign:'center', color:'#2c3e50'}}>32</h2>
                                    </Paper>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div style={{position:'absolute', bottom:0, width:'100vw',
                        alignItems:'center',
                        height:'8vh', backgroundColor:'#1abc9c', alignItems:'center', justifyContent:'center', display:'flex'}}>
                        <p style={{textAlign:'center', color:'white'}}>Call for Free Quotes</p>
                    </div>
                </div>
            </Page>
        );
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
}
Home.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default Home;