//API NOTIFICATION MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : 'Loading....',
        message : 'Data is being Loaded,Please wait'
    },
    success : {
        title : 'Success',
        message : 'Data Successfully loaded'
    },
    responseFailure : {
        title : 'Error',
        message : 'An error occured while fetching up request from server. Please try again'
    },
    requestFailue : {
        title : 'Error',
        message : 'An error occured while parsing request data'
    },
    networkError : {
        title : 'Error',
        message : 'Unable to connect with the server. Check internet connectivity and try again'
    }
}


//API SERVICE CALLS
//SAMPLE REQUEST
//NEED SERVICE CALLS : {url:'/',method : 'POST/GET/PUT/DELETE', params : true/false,query : true/false}

export const SERVICE_URL = {
    usersignup : {url : `/signup`,method:'POST'}
}