import axios from 'axios'

const instance = axios.create({ baseURL: "http://localhost:5000" })

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