import axios from 'axios'

import dotenv from 'dotenv-defaults';
dotenv.config();

const instance = axios.create({ baseURL: process.env.SERVER_URL })

const sendMessage = async (type, url, message) => {
    console.log("SEND MESSAGE:", message)
    let res
    switch(type){
        case "post":
            try{
                res = await instance.post(url, message)
                console.log(res)
                return res
            }catch(e){
                console.log(e.response)
            }
            break
        case "get":
            try{
                res = await instance.get(url, message)
                console.log(res)
                return res
            }
            catch(e){
                console.log(e.response)
            }
            break
        default:
            return []
    }
}

export { sendMessage }  