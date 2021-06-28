import { useState } from 'react';
import { Button } from 'antd';

const Straw = () => {
    const [step, setStep] = useState(0);
    const [straw, setStraw] = useState({
        title: "",
        poem: "",
        content: ""
    });

    const getStraw = () => {
        setStraw({
            title: "第一籤",
            content: "日出便見風雲散 光明清淨照世間 一向前途通大道 萬事清吉保平安",
            discription: ""
        });
        setStep(2);
    }

    const toss = () => {
        let result = Math.floor(Math.random() * 4);
        if(result === 0 || result === 1) // 聖筊
            setStep(3);
        else if(result === 2) // 笑筊
            setStep(4);
        else if(result === 3) // 陰筊
            setStep(5);
    }

    return(
        <div className="vertical content Straw">
            {(() => {
                switch (step) {
                case 0: //開始求籤
                    return (
                        <>
                            <h1>抽籤步驟 : </h1>
                            <p>1.虔誠向神明稟報您的姓名、年歲、住址、求問事項。</p>
                            <p>2.開始求籤。</p>
                            <p>3.擲筊請示神明是否為此籤。</p>
                            <p>4.若為聖筊則可觀看詩籤內容。</p>
                            <p>5.若為笑筊或陰筊則需重新求籤。</p>
                            <Button size="large" type="primary" shape="round" onClick={() => setStep(1)}>開始求籤</Button>
                            <Button shape="round">我要投稿籤詩</Button>
                        </>
                    );
                case 1: //抽籤
                    return (
                        <>
                            <p>虔誠向神明稟報您的姓名、年歲、住址、求問事項。</p>
                            <Button size="large" type="primary" shape="round" onClick={getStraw}>求籤</Button>
                        </>
                    );
                case 2: //擲筊
                    return (
                        <>
                            <h1>{straw.title}</h1>
                            <p>擲筊請示神明是否為此籤。</p>
                            <Button size="large" type="primary" shape="round" onClick={toss}>擲筊</Button>
                        </>
                    );
                case 3: //聖筊 解籤
                    return (
                        <>
                            <h1>聖筊 ! </h1>
                            <p>表示神明允許、同意，或行事會順利。</p>
                            <h2>籤詩</h2>
                            {straw.content}
                            <h2>解曰</h2>
                            {straw.discription}
                            <Button size="large" type="primary" shape="round" onClick={() => setStep(0)}>返回</Button>
                        </>
                    );
                case 4: //笑筊 重新抽籤
                    return (
                        <>
                            <h1>笑筊</h1>
                            <p>表示神明一笑、不解，或者考慮中，行事狀況不明，可以重新再擲筊請示神明，或再次說清楚自己的祈求。</p>
                            <Button size="large" type="primary" shape="round" onClick={() => setStep(1)}>重新求籤</Button>
                        </>
                    );
                case 5: //陰筊 重新抽籤
                    return (
                        <>
                            <h1>陰筊</h1>
                            <p>表示神明否定、憤怒，或者不宜行事，可以重新再擲筊請示。</p>
                            <Button size="large" type="primary" shape="round" onClick={() => setStep(1)}>重新求籤</Button>
                        </>
                    );
                }
            })()}
        </div>
    );
}

export default Straw;