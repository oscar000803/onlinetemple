import { useState } from 'react'
import { sendMessage } from './axios'

function App() {

  const [incenseArticle_ids, setIncenseArticle_ids] = useState([])
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [name2, setName2] = useState("")
  const [content2, setContent2] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  return (
    <div className="App">
      <div>
        <button onClick={async (e) => {await sendMessage('get', 'test')}}>get test</button>
        <button 
          onClick={async (e) => {
            const {data} = await sendMessage('get', 'incenseArticle/id')
            setIncenseArticle_ids(data.incenseArticle_ids)
          }}
        >get incenseArticle/id</button>
        <button onClick={async (e) => {await sendMessage('get', 'incenseArticle/detail', {params:{incenseArticle_id: incenseArticle_ids[0]}})}}>get incenseArticle/detail</button>
        <button onClick={async (e) => {await sendMessage('get', 'incenseArticle/brief', {params:{incenseArticle_ids}})}}>get incenseArticle/brief</button>
      </div>
      <div>
        <input onChange={(e) => setName(e.target.value)}/>
        <input onChange={(e) => setTitle(e.target.value)}/>
        <input onChange={(e) => setContent(e.target.value)}/>
        <button onClick={async (e) => {await sendMessage('post', 'incenseArticle', {params:{name, title, content}})}}>post incenseArticle</button>
      </div>
      <div>
        <input onChange={(e) => setName2(e.target.value)}/>
        <input onChange={(e) => setContent2(e.target.value)}/>
        <input type="date" onChange={(e) => setDate(e.target.value)}/>
        <input type="time" onChange={(e) => setTime(e.target.value)}/>
        <button onClick={async (e) => {
          const ds = date.split('-')
          const ts = time.split(':')
          const t = Date.UTC(ds[0], ds[1], ds[2], ts[0], ts[1])
          await sendMessage('post', 'incense', {params:{incenseArticle_id: incenseArticle_ids[0], name: name2, content: content2, time: t}})
        }}>post incenseArticle</button>
      </div>
    </div>
  );
}

export default App;
