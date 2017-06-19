import React, {Component} from 'react';
import {Page, Toolbar,Button, List,ListItem,ListHeader,
    Icon, ToolbarButton, Input, Modal, notification} from 'react-onsenui';
import store from '../redux/store';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
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
    calculateQuotes(){
        let total = 0;
        // Add products
        this.state.current_products.forEach((item)=>{
            total += item.price
        });
        // Multiply by number of users
        if (this.state.current_number_of_users !== 0){
            total *= this.state.current_number_of_users;
        }
        // Add discount
        if (this.state.current_discount_available){
            total -= (this.state.current_discount_available.discount / 100) * total;
        }
        this.setState({
            total : total
        });
    }
    update(obj){
        this.setState(obj, ()=>{
            this.calculateQuotes();
        });
    }
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
                <div>
                    <p style={{fontSize:'smaller'}}>Customize quote for </p>
                    <p style={{ marginTop:-10, fontSize:'15px'}}>{this.state.current_estimate_for || 'Please Specify'}</p>
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
            onTouchTap={()=>{
                this.setState({
                    isOpen : true,
                    visibleOption : 'package'
                });
            }}
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-ios-time-outline" size="35" style={{color:'#2ECEAE', fontSize:'35px'}} />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p style={{fontSize:'smaller'}}>Vehicle Year </p>
                    <p style={{ marginTop:-10, fontSize:'15px'}}>{this.state.current_package_level ? this.state.current_package_level : 'Please Specify'}</p>
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
            onTouchTap={()=>{
                this.setState({
                    isOpen : true,
                    visibleOption : 'products'
                });
            }}
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-model-s" size="30" style={{color:'#bdc3c7', fontSize:'30px'}} />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p style={{fontSize:'smaller'}}>Vehicle Type </p>
                    <p style={{display: this.state.current_products.length ? 'none' : 'block', marginTop:-10, fontSize:'15px'}}>Choose</p>
                    {this.state.current_products.map((item)=>{
                        return <p style={{ marginTop:-10, fontSize:'15px'}}>{item.title}
                            <hr style={{border:'dashed #a0b7c1 1px'}}/>
                        </p>
                    })}
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
            onTouchTap={()=>{
                this.setState({
                    isOpen : true,
                    visibleOption : 'users'
                });
            }}
        >
            <div className='left'>
                <div>
                    <Icon icon = "ion-ios-navigate-outline" size="40" style={{color:'#53adde', fontSize:'40px'}} />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p style={{fontSize:'smaller'}}>Enter your ZIP code </p>
                    <p style={{ marginTop:-10, fontSize:'15px'}}>{this.state.current_number_of_users}</p>
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
            onTouchTap={()=>{
                this.setState({
                    isOpen : true,
                    visibleOption : 'contract'
                });
            }}
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
                    <p style={{ marginTop:-10, fontSize:'15px'}}>{this.state.current_contract_type ? this.state.current_contract_type.title : 'Please Specify'}</p>
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

    renderPackageOptions(){
        let key = 'Enterprise';
        return <section style={{padding:10}}>
            <List
                dataSource={Object.keys(store.getState().lists)}
                renderHeader={() => <ListHeader style={{color:'#bdc3c7'}}>Packages</ListHeader>}
                renderRow={(item)=>{
                    return <ListItem
                        onTouchTap={()=>{
                            this.update({
                                current_package_level : item,
                                isOpen : false
                            });
                        }}
                        key={item} tappable>
                        <div className='center' style={{color:'white', paddingLeft:6, display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p>{item}</p>
                        </div>
                        <div className='right'>
                            <div>
                                <Icon icon = "ion-chevron-right" size="20" style={{fontSize:'20px',  color:'white'}} />
                            </div>
                        </div>
                    </ListItem>
                }}
        /></section>
    }
    renderNumberOfUsersOptions(){
        return <section>
                <TextField
                    floatingLabelStyle={{
                        color : 'white',
                        fontSize :'20px',
                        fontFamily :'Avenir',
                        paddingBottom:'5vh'
                    }}
                    inputStyle={{
                        color : 'white',
                        fontSize :'30px',
                        fontFamily :'Avenir'
                    }}
                    hintText=""
                    type="number"
                    onChange={(e, val)=>{
                        this.update({
                            current_number_of_users : val
                        });
                    }}
                    value = {this.state.current_number_of_users}
                    floatingLabelText="Estimated For"
                    floatingLabelFixed={true}
                /><br />
        </section>
    }
    renderProductsOptions(){
        let key = 'Enterprise';
        return <section style={{padding:10}}>
            <List
                dataSource={store.getState().lists[key].products}
                renderHeader={() => <ListHeader style={{color:'#bdc3c7'}}>Products</ListHeader>}
                renderRow={(item)=>{
                    let items =  this.convertArrayToObj(this.state.current_products, 'id');
                    return <ListItem
                        key={item.id}>
                        <div className='left'>
                            <Input
                                inputId={`checkbox-${item.id}`}
                                type='checkbox'
                                checked = {items[item.id]}
                                onChange={(val)=>{
                                    if (items[item.id]){
                                        delete items[item.id];
                                    } else {
                                        items[item.id] = item;
                                    }
                                    this.update({
                                        current_products : this.convertObjToArray(items)
                                    });
                                }}
                            />
                        </div>
                        <div className='center' style={{color:'white', paddingLeft:6, display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p>{item.title}</p>
                            <p style={{fontSize:'x-small', color:'#ecf0f1', marginTop:'-12px'}}>{item.description}</p>
                        </div>
                        <div className='right'>
                            <div>
                                <Icon icon = "ion-chevron-right" size="20" style={{fontSize:'20px',  color:'white'}} />
                            </div>
                        </div>
                    </ListItem>
                }}
            /></section>
    }
    renderContractOptions(){
        let key = 'Enterprise';
        return <section style={{padding:10}}>
            <List
                dataSource={store.getState().lists[key].contract_types}
                renderHeader={() => <ListHeader style={{color:'#bdc3c7'}}>Contract Types</ListHeader>}
                renderRow={(item)=>{
                    return <ListItem
                        onTouchTap={()=>{
                            this.update({
                                current_contract_type : item,
                                isOpen : false
                            });
                        }}
                        key={item.id} tappable>
                        <div className='center' style={{color:'white', paddingLeft:6, display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p>{item.title}</p>
                            <p style={{fontSize:'x-small', color:'#ecf0f1', marginTop:'-12px'}}>{item.description}</p>
                        </div>
                        <div className='right'>
                            <div>
                                <Icon icon = "ion-chevron-right" size="20" style={{fontSize:'20px',  color:'white'}} />
                            </div>
                        </div>
                    </ListItem>
                }}
            /></section>
    }
    renderDiscountOptions(){
        let key = 'Enterprise';
        return <section style={{padding:10}}>
            <List
                dataSource={store.getState().lists[key].discount_types}
                renderHeader={() => <ListHeader style={{color:'#bdc3c7'}}>Discounts</ListHeader>}
                renderRow={(item)=>{
                    return <ListItem
                        onTouchTap={()=>{
                            this.update({
                                current_discount_available : item,
                                isOpen : false
                            });
                        }}
                        key={item.id} tappable>
                        <div className='center' style={{color:'white', paddingLeft:6, display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p>{item.title}</p>
                            <p style={{fontSize:'x-small', color:'#ecf0f1', marginTop:'-12px'}}>{item.description}</p>
                        </div>
                        <div className='right'>
                            <div>
                                <Icon icon = "ion-chevron-right" size="20" style={{fontSize:'20px',  color:'white'}} />
                            </div>
                        </div>
                    </ListItem>
                }}
            /></section>
    }
    renderEstimateOptions(){
        return <section>
            <p>
                <TextField
                    floatingLabelStyle={{
                        color : 'white',
                        fontSize :'20px',
                        fontFamily :'Avenir',
                        paddingBottom:'5vh'
                    }}
                    inputStyle={{
                        color : 'white',
                        fontSize :'25px',
                        fontFamily :'Avenir'
                    }}
                    hintText=""
                    onChange={(e, val)=>{
                        this.update({
                            current_estimate_for : val
                        });
                    }}
                    type = "email"
                    value = {this.state.current_estimate_for}
                    floatingLabelText="Send proposal to "
                    floatingLabelFixed={true}
                /><br />
            </p>
        </section>
    }
    renderOptionsMode(){
        if(this.state.visibleOption === 'package'){
            return this.renderPackageOptions();
        } else if (this.state.visibleOption === 'users'){
            return this.renderNumberOfUsersOptions();
        } else if (this.state.visibleOption === 'products'){
            return this.renderProductsOptions();
        } else if (this.state.visibleOption === 'contract'){
            return this.renderContractOptions();
        } else if (this.state.visibleOption === 'estimate'){
            return this.renderEstimateOptions();
        } else if (this.state.visibleOption === 'discount'){
            return this.renderDiscountOptions();
        }
    }

    sendEstimate(){
        let that = this;
        this.setState({
            openSnackbar : true,
            snackBarMessage : 'Sending Proposal',
            openActionMessage : 'cancel'
        }, ()=>{
            setTimeout(()=>{
                that.setState({
                    openSnackbar : true,
                    snackBarMessage : 'Proposal Sent',
                    openActionMessage : ''
                }, ()=>{
                    setTimeout(()=>{

                    }, 1000);
                });
            }, 2000)
        });
    }
    render(){
        return <Page
            renderToolbar={() =>
                <Toolbar>
                    <div className='left' style={{backgroundColor:'#1abc9c'}}></div>
                    <div className='center' style={{backgroundColor:'#1abc9c', color:'white'}}>
                        Compare Insurance
                    </div>
                    <div className='right' style={{backgroundColor:'#1abc9c'}}></div>
                </Toolbar>
            }
            renderModal={() => (
                <Modal
                    isOpen={this.state.isOpen}
                >
                    <section>
                        <div>
                            {this.renderOptionsMode()}
                        </div>
                        <br/>
                        <p>
                            <Button onClick={() => this.setState({isOpen: false})}>
                                Done
                            </Button>
                        </p>
                    </section>
                </Modal>
            )}
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
            <section style={{position:'absolute',bottom:0, width:'100%',
                padding:10, display:'flex', backgroundColor:'white',
                flexDirection:'row', justifyContent:'space-between', alignItems:'space-around'}}>
                <div>
                    <p style={{fontSize:'12px'}}></p>
                    <p></p>
                </div>
                <Button
                    onClick={()=>{
                        this.props.navigator.pushPage({
                            component : Home
                        });
                    }}
                    modifier='cta' style={{margin: '20px', fontSize:'15px', height:'20px', padding:10,
                    paddingLeft:40,
                    paddingRight:40,
                    backgroundColor:'#1abc9c'}}>Get Quotes</Button>
            </section>
        </Page>
    }
}

ActionList.childContextTypes = {
    muiTheme: getMuiTheme(baseTheme)
};
export default ActionList;