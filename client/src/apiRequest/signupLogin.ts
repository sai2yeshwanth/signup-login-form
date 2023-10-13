import axios from "axios";
import config from "./config";

export const createUser = async (data: any) => {

    const reqData = JSON.stringify(data)

    try {
        const response = await axios({
            method: 'post',
            url: `${config.API_DOMAIN_URL}/api/v1/auth/signup`,
            headers: {
                //  'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
            ,
            data: reqData
        });

        const responseData = await response.data;
        return responseData



    } catch (error) {
        return error
    }

}
//login api request
export const loginUser = async (data: any) => {

    const reqData = JSON.stringify(data)

    try {
        const response = await axios({
            method: 'post',
            url: `${config.API_DOMAIN_URL}/api/v1/auth/login`,
            headers: {
                //  'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
            ,
            data: reqData
        });

        const responseData = await response.data;
        return responseData



    } catch (error) {
        return error
    }

}