import {STUFF_CHANGED} from './actions';

const reducer = function(state, action) {
    if (state === undefined){
        return  {
            lists : {
                'Enterprise' : {
                    products : [
                        {
                            id : 1,
                            title : 'Cloud Hosted API Middleware',
                            price : 184,
                            description : ''
                        },
                        {
                            id : 2,
                            title : 'On Premise Installation',
                            price : 168,
                            description : ''
                        },
                        {
                            id : 3,
                            title : '2 years software Support',
                            price : 10,
                            description : ''
                        },
                        {
                            id : 4,
                            title : 'Hardware Provision',
                            price : 73,
                            description : ''
                        }
                    ],
                    contract_types : [
                        {
                            id : 1,
                            title : 'Annual Subscription',
                            description : ''
                        },
                        {
                            id : 2,
                            title : 'Monthly Subscription',
                            description : ''
                        },
                        {
                            id : 3,
                            title : 'One off Payment',
                            description : ''
                        }
                    ],
                    discount_types : [
                        {
                            id : 1,
                            title : 'Over 500 Users',
                            discount : 5,
                            description : ''
                        },
                        {
                            id : 2,
                            title : 'Over 2000 Users',
                            discount : 7,
                            description : ''
                        },
                        {
                            id : 3,
                            title : 'Over 20,000 Users',
                            discount : 9,
                            description : ''
                        },
                        {
                            id : 4,
                            title : 'One off payment',
                            discount : 13,
                            description : ''
                        }
                    ]
                },
                'Mega Corporation' : {
                    products : [
                        {
                            id : 4,
                            title : 'Big hosted corporation',
                            price : 3000
                        }
                    ],
                    contract_type : [
                        {
                            id : 2,
                            title : 'Monthly',
                        }
                    ]
                },
                'Small Business' : {},
                'Consortium' : {}
            }
        };
    }
    if(action.type === STUFF_CHANGED){
        let newState = state;
        if (newState[action.data.key]){
            newState[action.data.key] =  action.data.value;
        }
        return newState;
    }
    return state;
};
export default reducer;