import { useState } from 'react';
import { message, Button } from 'antd';

const Light = ({ name }) => {
    const [lights_list, setLights_list] = useState([
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
        {name: "香客 1"},
        {name: "香客 2"},
        {name: "香客 3"},
        {name: "香客 4"},
        {name: "香客 5"},
        {name: "香客 6"},
    ]);

    const createLight = () => {
        if(name === "匿名")
            message.error('請先登錄');
        else
            console.log('create light : ', name);
    }

    return(
        <div className="vertical content Light">
            <div className="light-panel">
                {lights_list.map((light, i) => (
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