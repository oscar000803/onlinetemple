import { Modal, Form, Input } from 'antd';

const IncenseModal = ({ isIncenseModalVisible, setIncenseModalVisible, createIncense }) => {
    const [form] = Form.useForm();
    return(
        <Modal
            visible={isIncenseModalVisible}
            title="上香"
            okText="確認" cancelText="取消"
            onCancel={()=>setIncenseModalVisible(false)}
            onOk={() => {
                form.validateFields().then((values) => {
                form.resetFields();
                createIncense(values);
                }).catch((e) => { window.alert(e); });
            }}>
            <Form form={form} layout="vertical" 
                name="form_in_modal">
                <Form.Item
                    name="content" label="留言"
                    rules={[{
                        required: true,
                        message: "留言內容不能為空！",
                    },]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default IncenseModal;