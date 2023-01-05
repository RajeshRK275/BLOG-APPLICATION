import axios from 'axios';
import  { API_NOTIFICATION_MESSAGES, SERVICE_URL }  from '../constants/config';

const API_URL = `http://localhost:8000`;

const axiosInstance = axios.create({
    baseURL:API_URL,
    timout : 10000,
    header:{
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        //stop global loader here
        return processResponse(response);
    },
    function (error){
        //stop global loader here
        return Promise.reject(processError(error));
    }
)

// if success -> return {isSuccess:true, data:object}
// if fail -> return { isFailure : true, status : stirng, msg : string, code : int}

const processResponse = () => {
    if (Response?.status === 200 ){
        return {
            isSuccess : true,
            data : Response?.data
        }
    } else {
        return {
            isFailure : true,
            status : Response?.status,
            msg : Response?.msg,
            code : Response?.code
        }
    }

}

const processError = (error) => {
    if(error.response) {
        //request made and server responds with a status other than 200
        console.log('ERROR IN RESPONSE :',error.toJSON());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.responseFailure,
            code : error.response.status
        }

    }else if (error.request) {
        // request made but response isn't received
        console.log('ERROR IN REQUEST :',error.toJSON());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.requestFailure,
            code : ""
        }


    }else {
        //something else happen in setting up request
        console.log('ERROR IN NETWORK :',error.toJSON());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.networkFailure,
            code : ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)){
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method : value.method,
            url : value.url,
            data : body,
            responseType : value.responseType,
            onUploadProgress : function (progressEvent) {
                if (showUploadProgress) {
                    let percentageComplete = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageComplete);
                }
            },
            onDownloadProgress : function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageComplete = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(percentageComplete);
                }
            },
        })  
}
export { API };