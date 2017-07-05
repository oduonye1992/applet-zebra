const Settings  = {
    questions : [
        {
            title : 'Details Of Insured',
            items : [
                {
                    title : 'Vehicle Number',
                    key : 'vehicle_number',
                    placeholder : 'e.g 11223344',
                    type : 'number'
                },
                {
                    title : 'Chasis Number',
                    key : 'chasis_number',
                    placeholder : 'e.g 11223344',
                    type : 'number'
                }
            ]
        },
        {
            title : 'Loss Details',
            items : [
                {
                    title : 'Accident Happened to',
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
                    type : 'text'
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
                            title: 'The Owner'
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
                    title : 'FIR No',
                    key : 'police_report_number',
                    placeholder : 'Police report number',
                    type : 'number'
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
                    title: 'FIR Report (if lodged)',
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
    ],
    sendSMS : (number, message) => {
        return new Promise((resolve, reject) => {
            let url = "https://aqueous-sands-14811.herokuapp.com/api/sms/";
            fetch(url, {
                headers : {
                    'content-type': 'application/json'
                },
                method : 'POST',
                body : JSON.stringify({
                    'phone' : number,
                    'message' : message
                })
            })
                .then(function(response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        let error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }
                })
                .then(resolve)
                .catch(reject)
        })
    }
};
export default Settings;
