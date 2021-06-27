import axios from 'axios'

const instance = axios.create({ baseURL: "http://localhost:5000" })

const sendMessage = async (type, url, message) => {
    console.log(message)
    let res
    switch(type){
        case "post":
            res = await instance.post(url, message)
            console.log(res)
            return res
        case "get":
            res = await instance.get(url, message)
            console.log(res)
            return res
        default:
            return []
    }
}

export { sendMessage }  