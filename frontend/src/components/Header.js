import { useState } from 'react';
import { message, Menu, Modal, Button, Form, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Mode_List from '../hooks/Mode_List';
import NameBox from './NameBox';

const Header = ({mode, changePage, name, signIn, signOut}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = ({ newName }) => {
        setIsModalVisible(false);
        signIn(newName);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [form] = Form.useForm();

    return(
        <>
            <div className="Header horizontal">
                {mode === "Home" ? 
                <></>
                :
                <Menu mode="horizontal" defaultSelectedKeys={mode} theme="dark">
                    {Mode_List.map((mode) => (
                        <Menu.Item key={mode.modeName} onClick={() => {changePage(mode.modeName)}}>{mode.title}</Menu.Item>
                    ))}
                </Menu>
                }
                
                <div className="push-right"/>
                {name!=="匿名" ? 
                    <div className="horizontal">
                        <div className="nameBox horizontal">
                            <NameBox name={name}/>
                        </div>
                        <Button shape="round" onClick={signOut}>登出</Button>
                    </div>
                    :
                    <Button shape="round" onClick={() => setIsModalVisible(true)}>登入</Button>
                }
                <Button shape="circle" icon={<HomeOutlined />} onClick={() => {changePage("Home")}}/>
            </div>
            <Modal
                visible={isModalVisible}
                title="輸入您的名字"
                okText="確認" cancelText="取消"
                onCancel={handleCancel}
                onOk={() => {
                    form.validateFields().then((values) => {
                        form.resetFields();
                        if(values.newName === "匿名")
                            message.error("您不能取名叫匿名");
                        else
                            handleOk(values);
                        }).catch((e) => { window.alert(e); });
                }}>
                <Form form={form} layout="vertical" 
                    name="form_in_modal">
                    <Form.Item
                        name="newName" label="姓名"
                        rules={[{
                            required: true,
                            message: "您的姓名不能為空！",
                        },]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Header;