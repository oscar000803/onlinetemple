import Mode_List from '../hooks/Mode_List';

const Home = ({changePage}) => (
    <div>
        <div className="wallpaper vertical">
            <h1>線上宮廟系統</h1>
            <h3>拉近神明與人的距離</h3>
        </div>
        <div className="function-panel">
            
            {Mode_List.map((mode, i) => (
                <div className="function-box vertical" key={i}>
                    <button key={`${i}-button`} onClick={() => {changePage(mode.modeName)}}>
                    <h1>{mode.title}</h1>
                </button>
                {mode.discription}
                </div>
                
            ))}
        </div>
    </div>
);

export default Home;