import { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { sendMessage } from '../api';

const Light = ({ name, hasLight, turnLight }) => {
    const [light_list, setLight_list] = useState([]);

    const getLightList = async() => {
        console.log("get light List id");
        try{
            const { data } = await sendMessage('get', 'light');
            setLight_list(data);
        }catch{
            console.log("the database is empty");
        }
        
    }

    const createLight = async() => {
        if(name === "匿名")
            message.error('請先登錄');
        else if(hasLight)
            message.error('您已經點過光明燈了');
        else
        {
            console.log('create light : ', name);
            turnLight();
            await sendMessage('post', 'light', {params:{name}});
            await getLightList();
        }
    }

    useEffect(() => {
        //use api to get data
        if(light_list.length === 0){
            console.log("get light list");
            getLightList();
        }
    }, [light_list]);

    return(
        <div className="vertical content Light">
            <div className="Header-space-box"/>
            <div className="light-panel">
                {light_list.map((light, i) => (
                    <div key={i} className="light vertical">
                        <h1>{light.name}</h1>
                    </div>
                ))}
            </div>
            <div className="light-bar vertical">
                <Button size="large" type="primary" shape="round" onClick={createLight}>我要點燈</Button>
            </div>
        </div>
    );
}

export default Light;