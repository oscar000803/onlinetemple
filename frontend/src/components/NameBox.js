import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const NameBox = ({ name }) => (
    <div className="nameBox">
        {name === "匿名" ? 
        <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }} icon={<UserOutlined />} />
        : 
        <Avatar size={30} gap={5} style={{ backgroundColor: '#6699CC' }}>
            {name[0]}
        </Avatar>}
        {name}
    </div>
)

export default NameBox;