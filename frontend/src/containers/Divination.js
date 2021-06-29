import { useState } from 'react';
import { message, DatePicker, Input, Button } from 'antd';
import { sendMessage } from '../api';

const Divination = ({ name }) => {
    const [realName, setRealName] = useState(name);
    const [birthday, setBirthday] = useState("");
    const [divination, setDivination] = useState({content: ""});

    const onInputName = (e) => {
        setRealName(e.target.value);
    }

    const onPickDate = (date, dateString) => {
        setBirthday(dateString);
    }

    const startDivinate = async() => {
        if(realName === "匿名" || birthday === "")
            message.error('請輸入真實姓名');
        else
        {
            try{
                console.log("startDivinate :", realName, birthday);
                const { data } = await sendMessage('get', 'divination', {params:{name, birthday}})
                setDivination(data);
            }catch{
                message.error("請確認是否有正確連網");
            }
        }
    }

    const endDivinate = () => {
        setDivination({content: ""});
        setBirthday("");
        setRealName("");
    }

    return(
        <div className="vertical content Divination">
            {divination.content !== "" ? 
                <div className="Divination-result vertical">
                    <div className="vertical">
                        <h1>算命結果</h1>
                        <pre>{divination.content}</pre>
                    </div>
                    <Button type="primary" shape="round" onClick={endDivinate}>返回</Button>
                </div>
            :
                <div className="Divination-panel vertical">
                    <div className="vertical">
                        <h1>姓名</h1>
                        <Input placeholder="輸入真實姓名" value={realName} onChange={onInputName}/>
                    </div>
                    <div className="vertical">
                        <h1>出生日期</h1>
                        <DatePicker onChange={onPickDate} />
                    </div>
                    <Button type="primary" shape="round" onClick={startDivinate}>開始算命</Button>
                </div>
            }
            
        </div>
    );
}

export default Divination;