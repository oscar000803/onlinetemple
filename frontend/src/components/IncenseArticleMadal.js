import { Modal, Form, Input } from 'antd';

const IncenseArticleMadal = ({ isArticleModalVisible, setArticleModalVisible, createArticle }) => {
    const [form] = Form.useForm();
    return(
        <Modal
            visible={isArticleModalVisible}
            title="輸入上香文內容"
            okText="確認" cancelText="取消"
            onCancel={()=>setArticleModalVisible(false)}
            onOk={() => {
                form.validateFields().then((values) => {
                form.resetFields();
                createArticle(values);
                }).catch((e) => { window.alert(e); });
            }}>
            <Form form={form} layout="vertical" 
                name="form_in_modal">
                <Form.Item
                    name="title" label="上香主題"
                    rules={[{
                        required: true,
                        message: "寫個主題吧！",
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="content" label="內容"
                    rules={[{
                        required: false,
                    },]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default IncenseArticleMadal;