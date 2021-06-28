import { useState, useEffect } from 'react';
import { Comment, Pagination, Avatar, Button, Menu } from 'antd';
import IncenseArticleMadal from '../components/IncenseArticleMadal';
import IncenseMadal from '../components/IncenseMadal';
import NameBox from '../components/NameBox';

const Incense = ({ name }) => {
    //use api to get data
    const [articleListId, setArticleListId] = useState([]);
    const [page, setPage] = useState(0);
    const [articleList, setArticleList] = useState([]);

    const [pickedArticleId, setPickedArticleId] = useState("0");
    const [pickedArticle, setPickedArticle] = useState(
        {name: "", title: "", content: "", incense: []}
    );
    
    const [isArticleModalVisible, setArticleModalVisible] = useState(false);
    const [isIncenseModalVisible, setIncenseModalVisible] = useState(false);

    const createArticle = ({ title, content }) => {
        setArticleModalVisible(false);
        console.log("new incense ! :", name, title, content);
    };

    const handleClick = (e) => {
        //console.log('click ', e.key);
        setPickedArticleId(e.key);
    };

    const createIncense = ({ title, content }) => {
        setIncenseModalVisible(false);
        console.log("new incense ! :", name, title, content);
    };

    useEffect(() => {
        if(articleListId.length === 0){
            //use api to get data
            console.log("get articleList id");
            setArticleListId([1]);
        }
    }, [articleListId]);

    useEffect(() => {
        //use api to get data
        if(articleListId.length !== 0){
            console.log("get articleList");
            setArticleList([
                {name: "香客 1", title: "上香文 1", content: "", incenseCount: 0},
                {name: "香客 2", title: "上香文 2", content: "", incenseCount: 0},
                {name: "香客 3", title: "上香文 3", content: "", incenseCount: 0},
            ]);
        }
    }, [page, articleListId]);

    useEffect(() => {
        //use api to get data
        console.log("get pickedArticle detail", pickedArticleId);
        setPickedArticle({name: "香客 1", title: "上香文 1", content: "", incenses: [
            {name:"香客 1", content:"加油", time:0},
            {name:"香客 2", content:"你好啊", time:0},
            {name:"香客 3", content:"嗨!", time:0}
        ]});
    }, [pickedArticleId]);


    return(
        <>
            <div className="Incense-container">
                <div className="IncenseArticle-list vertical">
                    <Menu 
                        mode="vertical"
                        onClick={handleClick}
                        style={{ width: 300 }}
                        defaultSelectedKeys={[pickedArticleId]}
                    >
                        {articleList.map((article, i)=>(
                            <Menu.Item key={i}>
                                <div>
                                    <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }}>
                                        {article.name[0] }
                                    </Avatar>
                                    {article.title}
                                </div>
                            </Menu.Item>
                        ))}
                    </Menu>
                    <div className="push-down"/>
                    <div className="IncenseArticle-list-panel vertical">
                        <Pagination defaultCurrent={1} total={(articleListId.length / 16) + 1} />
                        <Button type="primary" onClick={()=>setArticleModalVisible(true)}>發上香文</Button>
                    </div>
                </div>
                <div className="IncenseArticle">
                    <div className="IncenseArticle-info-panel horizontal">
                        <div className="IncenseArticle-info vertical">
                            <h1>{pickedArticle.title}</h1>
                            <div className="push-right"/>
                            <NameBox name={pickedArticle.name}/>
                            {pickedArticle.content}
                        </div>
                        <div className="push-right"/>
                        上香數 : {pickedArticle.incenses===undefined? 0 : pickedArticle.incenses.length}
                        <Button shape="round" onClick={()=>setIncenseModalVisible(true)}>上香 \|/</Button>
                    </div>
                    <div className="Incense-list">
                        {pickedArticle.incenses===undefined? <></> : pickedArticle.incenses.map((incense)=> (
                            <Comment
                                author={incense.name}
                                avatar={
                                    <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }}>
                                        {incense.name[0] }
                                    </Avatar>
                                }
                                content={incense.content}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <IncenseArticleMadal isArticleModalVisible={isArticleModalVisible} setArticleModalVisible={setArticleModalVisible} createArticle={createArticle}/>
            <IncenseMadal isIncenseModalVisible={isIncenseModalVisible} setIncenseModalVisible={setIncenseModalVisible} createIncense={createIncense}/>
        </>
    );
}

export default Incense;