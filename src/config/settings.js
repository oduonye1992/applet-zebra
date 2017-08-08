const Settings  = {
    formatHeight : (number) => {
          let num = Math.floor(number/100 * 90);
          return num+'vh'
    },
    questions : [
        {
            title : 'Policy Details',
            items : [
                {
                    title : 'Type of Policy.',
                    key : 'policy_type',
                    placeholder : '',
                    type : 'select',
                    datasets : [
                        {
                            value : 'Comprehensive Auto Insurance Policy',
                            title : 'Comprehensive Auto Insurance Policy'
                        },
                        {
                            value : 'Third Party Insurance Policy',
                            title : 'Third Party Insurance Policy'
                        }
                    ]
                }
            ]
        },
        {
            title : 'Loss Details',
            items : [
                {
                    title : 'The accident happened on what date',
                    key : 'accident_happened_to',
                    placeholder : '',
                    type : 'date'
                },
                {
                    title : 'Time of Accident',
                    key : 'time_of_accident',
                    placeholder : '',
                    type : 'time'
                },
                {
                    title : 'Place of Accident',
                    key : 'place_of_accident',
                    placeholder : '',
                    type : 'text'
                },
                {
                    title : 'Short description of Accident',
                    key : 'description_of_accident',
                    placeholder : 'Keep it less than 200 words',
                    type : 'textarea'
                }
            ]
        },
        {
            title : 'Details of Driver at the time of accident',
            items : [
                {
                    title : 'I was the one driving',
                    key : 'i_was_driving',
                    placeholder : '',
                    type : 'toggle'
                },
                {
                    title : 'Gender',
                    key : 'driver_gender',
                    placeholder : '',
                    type : 'select',
                    datasets : [
                        {
                            value : 'Male',
                            title : 'Male'
                        },
                        {
                            value : 'Female',
                            title : 'Female'
                        }
                    ]
                },
                {
                    title : 'Drivers Licence NUmber',
                    key : 'drivers_licence_number',
                    placeholder : '',
                    type : 'text'
                },
                {
                    title : 'Valid Upto',
                    key : 'drivers_licence_valid_upto',
                    placeholder : '',
                    type : 'date'
                },
                {
                    title : 'Occupation',
                    key : 'occupation',
                    placeholder : '',
                    type : 'text'
                },
                {
                    title : 'Was the driver authorized to drive',
                    key : 'authorized_driver',
                    placeholder : '',
                    type : 'toggle'
                },
                {
                    title : 'Who drove the car',
                    key : 'who_drove_the_car',
                    placeholder : '',
                    type : 'select',
                    datasets : [
                        {
                            value : 'The Owner',
                            title : 'The Owner'
                        },
                        {
                            value : 'A Paid Driver',
                            title : 'A Paid Driver'
                        },
                        {
                            value: 'A Relative / Friend',
                            title: 'A Relative / Friend'
                        }
                    ]
                }
            ]
        },
        {
            title : 'Details of Injury and Police report',
            items : [
                {
                    title : 'Have you lodged a police report?',
                    key : 'lodged_police_report',
                    placeholder : '',
                    type : 'toggle'
                },
                {
                    title : 'Death / Injury to any occupant',
                    key : 'injury_to_any_occupant',
                    placeholder : 'Police report number',
                    type : 'toggle'
                }
            ]
        },
        {
            title: 'Additional Details',
            items: [
                {
                    title: ' Picture of Vehicle',
                    key: 'picture_of_vehicle',
                    placeholder: '',
                    type: 'image'
                },
                {
                    title: 'Police Report (if lodged)',
                    key: 'fir_no_picture',
                    placeholder: 'Police report number',
                    type: 'image'
                },
                {
                    title: 'Drivers Licence',
                    key: 'drivers_licence',
                    placeholder: '',
                    type: 'image'
                }
            ]
        }
    ]
};
export default Settings;
