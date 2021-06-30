import { useState, useEffect } from 'react';
import { Input, Select, Divider, Tooltip, Comment, Pagination, Avatar, Button, Menu } from 'antd';
import IncenseArticleModal from '../components/IncenseArticleModal';
import IncenseModal from '../components/IncenseModal';
import NameBox from '../components/NameBox';
import { sendMessage } from '../api';
import { UserOutlined } from '@ant-design/icons';

const MAX_ARTICLE_A_PAGE = 15;
const { Option } = Select;
const { Search } = Input;

const Incense = ({ name }) => {
    //use api to get data
    const [articleListId, setArticleListId] = useState([]);
    const [page, setPage] = useState(1);
    const [articleList, setArticleList] = useState([]);

    const [queryType, setQueryType] = useState("IncenseArticle");
    const [query, setQuery] = useState("");

    const [pickedArticleId, setPickedArticleId] = useState();
    const [pickedArticle, setPickedArticle] = useState(
        {name: "", title: "", content: "", incense: []}
    );
    
    const [isArticleModalVisible, setArticleModalVisible] = useState(false);
    const [isIncenseModalVisible, setIncenseModalVisible] = useState(false);

    const onSearch = async(value) => {
        console.log("Search :", queryType, value);
        setQuery(value);
        await getIncenseArticleId(value);
    }

    const createArticle = async({ title, content }) => {
        setArticleModalVisible(false);
        console.log("new incense article ! :", name, title, content);
        await sendMessage('post', 'incenseArticle', {params:{name, title, content}});
        await getIncenseArticleId("");
        let ids = articleListId.slice((page - 1)*MAX_ARTICLE_A_PAGE, page*MAX_ARTICLE_A_PAGE);
        await getIncenseArticleBrief(ids);
    };

    const handleClick = (e) => {
        //console.log('click ', e.key);
        setPickedArticleId(e.key);
    };

    const createIncense = async({ content }) => {
        setIncenseModalVisible(false);
        console.log("new incense ! :", name, content);
        await sendMessage('post', 'incense', {params:{incenseArticle_id: pickedArticleId, name, content, time: Date.now()}});
        await getIncenseArticleDetail(pickedArticleId);
    };

    const getIncenseArticleId = async(query) => {
        let type = queryType;
        if (query === "")
            type = ""
        console.log("get articleList id", query);
        try{
            const { data } = await sendMessage('get', 'incenseArticle/id', {params:{queryType: type, query}});
            setArticleListId(data.incenseArticle_ids.reverse());
        }catch{
            console.log("the database is empty");
            setArticleListId([]);
        }
    }

    const getIncenseArticleBrief = async(ids) => {
        if(ids.length === 0)
            setArticleList([]);
        else{
            try{
                console.log("get article List brief");
                const { data } = await sendMessage('get', 'incenseArticle/brief', {params:{incenseArticle_ids: ids}});
                setArticleList(data.incense_brief);
            }catch{
                console.log("the database is empty");
                setArticleList([]);
            }
        }
    }

    const getIncenseArticleDetail = async(id) => {
        console.log("get article detail");
        const { data } = await sendMessage('get', 'incenseArticle/detail', {params:{incenseArticle_id: id}});
        setPickedArticle(data.incenseArticle);
    }

    useEffect(() => {
        if(articleListId.length === 0 && query === ""){
            //use api to get data
            console.log("get all article");
            getIncenseArticleId("");
        }
    }, [articleListId]);

    useEffect(() => {
        //use api to get data
        if(articleListId.length !== 0){
            console.log("get articleList");
            let ids = articleListId.slice((page - 1)*MAX_ARTICLE_A_PAGE, page*MAX_ARTICLE_A_PAGE);
            getIncenseArticleBrief(ids);
        }
        else
        {
            getIncenseArticleBrief([]);
        }
    }, [page, articleListId]);

    useEffect(() => {
        //use api to get data
        if(pickedArticleId !== undefined){
            console.log("get pickedArticle detail", pickedArticleId);
            getIncenseArticleDetail(pickedArticleId);
        }
    }, [pickedArticleId]);

    return(
        <div className="content">
            {/* <div className="Header-space-box"/> */}
            <div className="Incense-container">
                <div className="IncenseArticle-list vertical">
                    <Input.Group compact>
                        <Select style={{ width: "40%" }} defaultValue="IncenseArticle" onChange={(value) => setQueryType(value)}>
                            <Option value="IncenseArticle">上香文標題</Option>
                            <Option value="Initiator">發起者姓名</Option>
                        </Select>
                        <Search allowClear enterButton style={{ width: "60%" }} defaultValue="" onSearch={onSearch}/>
                    </Input.Group>
                    <div className="IncenseArticle-list-menu">
                        <Menu 
                            mode="vertical"
                            onClick={handleClick}
                            style={{ width: "20vw" }}
                        >
                            {articleList.map((article, i)=>(
                                <Menu.Item key={article.incenseArticle_ids}>
                                    <div className="IncenseArticleBox">
                                        {article.name === "匿名" ? 
                                            <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }} icon={<UserOutlined />} />
                                            : 
                                            <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }}>
                                                {article.name[0]}
                                            </Avatar>}
                                        {article.title}
                                    </div>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>
                    <div className="push-down"/>
                    <div className="IncenseArticle-list-panel vertical">
                        <Pagination current={page} onChange={(page) => setPage(page)} total={Math.ceil(articleListId.length / MAX_ARTICLE_A_PAGE)*10} />
                        <Button type="primary" onClick={()=>setArticleModalVisible(true)}>發上香文</Button>
                    </div>
                </div>
                <div className="IncenseArticle">
                    <div className="IncenseArticle-info-box vertical">
                        <div className="IncenseArticle-info-panel horizontal">
                            {pickedArticleId===undefined ? <></> :
                            <>
                                <div className="IncenseArticle-info vertical">
                                    <h1>{pickedArticle.title}</h1>
                                    <div className="push-right"/>
                                    <NameBox name={pickedArticle.name}/>
                                </div>
                                <div className="push-right"/>
                                上香數 : {pickedArticle.incense===undefined? 0 : pickedArticle.incense.length}
                                <Button shape="round" onClick={()=>setIncenseModalVisible(true)}>上香 \|/</Button>
                            </>
                            }
                        </div>
                        <div className="IncenseArticle-content">
                            <pre>{pickedArticle.content}</pre>
                        </div>
                    </div>
                    {pickedArticle.incense.length===0? <></> : 
                        <div className="Incense-list">
                        {pickedArticle.incense.map((incense)=> (
                            <>
                            <Comment
                                author={incense.name}
                                avatar={incense.name === "匿名" ? 
                                <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }} icon={<UserOutlined />} />
                                : 
                                <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }}>
                                    {incense.name[0]}
                                </Avatar>}
                                datetime= {
                                    <Tooltip title={Date(incense.time).toString()}>
                                      <span>{Date(incense.time).toString().slice(0,10).replace(/-/g,"")}</span>
                                    </Tooltip>
                                }
                                content={<pre>{incense.content}</pre>}
                            />
                            <Divider style={{ margin: 1 }}/>
                            </>
                        ))}
                    </div>}
                </div>
            </div>
            <IncenseArticleModal isArticleModalVisible={isArticleModalVisible} setArticleModalVisible={setArticleModalVisible} createArticle={createArticle}/>
            <IncenseModal isIncenseModalVisible={isIncenseModalVisible} setIncenseModalVisible={setIncenseModalVisible} createIncense={createIncense}/>
        </div>
    );
}

export default Incense;