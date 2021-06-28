import { Modal, Form, Input } from 'antd';

const StrawModal = ({ isModalVisible, setModalVisible, createStraw }) => {
    const [form] = Form.useForm();
    return(
        <Modal
            visible={isModalVisible}
            title="投稿籤詩"
            okText="確認" cancelText="取消"
            onCancel={()=>setModalVisible(false)}
            onOk={() => {
                form.validateFields().then((values) => {
                form.resetFields();
                createStraw(values);
                }).catch((e) => { window.alert(e); });
            }}>
            <Form form={form} layout="vertical" 
                name="form_in_modal">
                <Form.Item
                    name="title" label="標題"
                    rules={[{
                        required: true,
                        message: "標題不能為空！",
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="content" label="籤詩"
                    rules={[{
                        required: true,
                        message: "籤詩內容不能為空！",
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="description" label="解曰"
                    rules={[{
                        required: true,
                        message: "解曰內容不能為空！",
                    },]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default StrawModal;