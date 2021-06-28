import { Modal, Form, Input } from 'antd';

const IncenseArticleModal = ({ isArticleModalVisible, setArticleModalVisible, createArticle }) => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
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
                        message: "主題不能為空",
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="content" label="內容"
                    rules={[{
                        required: true,
                        message: "內容不能為空",
                    },]}
                >
                    <TextArea rows={10} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default IncenseArticleModal;