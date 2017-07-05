import React from 'react';
import {Navigator, Tabbar, Tab, Page, Button, Toolbar, BackButton} from 'react-onsenui';
import Splash from './views/splash';
import ActionList from './views/actions_list';
import Home from './views/home';
import Preview from './views/preview';
import ClaimAdd from './views/claims/claim_add';
import ClaimView from './views/claims/claim_view';
import ClaimList from './views/claims/claim_list';
import store from './redux/store';
import PolicyList from './views/policy/policy_list';
import App from './App';
class MainPage extends React.Component {
    renderTabs() {
        return [
            {
                key : 1,
                content: <Splash navigator={this.props.navigator} />,
                tab: <Tab label='Quotes' icon='ion-android-apps'/>
            },
            {
                key : 2,
                content: <PolicyList navigator={this.props.navigator} />,
                tab: <Tab label='Policies' icon='ion-ios-cart-outline'/>
            },
            {
                key : 2,
                content: <ClaimList navigator={this.props.navigator} />,
                tab: <Tab label='Claims' icon='ion-ios-medkit-outline'/>
            }
        ];
    }
    renderPage(route, navigator) {
        const props = route.props || {};
        props.navigator = navigator;
        return React.createElement(route.component, props);
    }
    render() {
        return (
            <Page>
                <Tabbar
                    initialIndex={1}
                    renderTabs={this.renderTabs.bind(this)}
                />
            </Page>
        );
    }
}

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canShow : false,
            mode : 'single'
        }
    }
    componentDidMount(){
        window.formelo.Profile.getUserProfile()
            .then(profile => {
                let email = profile.email_address;
                let mode = (email === 'rd@pmglobaltechnology.com' || email === 'demo@formelo.com') ? 'private' : 'public';
                this.setState({
                    mode,
                    canShow:true
                });
                store.dispatch({
                    type : 'APPLET_MODE' ,
                    data : {
                        value : mode
                    }
                });
            })
            .catch(e=>{
                alert('To continue, kindly grant the app access to your server');
            })
    }
    renderPage(route, navigator) {
        const props = route.props || {};
        props.navigator = navigator;
        return React.createElement(route.component, props);
    }
    render() {
        if (!this.state.canShow){
            return null;
        }
        if (this.state.mode === 'public'){
            return <App/>;
        }
        return (
            <Navigator
                initialRoute={{component: MainPage, props: {key: 'main'}}}
                renderPage={this.renderPage}
            />
        );
    }
}