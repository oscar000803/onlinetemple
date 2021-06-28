import { Button } from 'antd';
import Mode_List from '../hooks/Mode_List';
import Particles from 'react-particles-js';

const Home = ({changePage}) => (
    <div>
        <div className="wallpaper vertical">
            <h1>線上宮廟系統</h1>
            <h3>拉近神明與人的距離</h3>
        </div>
        <div className="function-panel">
            
            {Mode_List.map((mode, i) => (
                <div className="function-box vertical">
                    <button key={i} onClick={() => {changePage(mode.modeName)}}>
                    <h1>{mode.title}</h1>
                </button>
                {mode.discription}
                </div>
                
            ))}
        </div>
    </div>
);

export default Home;