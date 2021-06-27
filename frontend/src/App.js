import { useState } from 'react'
import { sendMessage } from './axios'

function App() {

  const [incenseArticle_ids, setIncenseArticle_ids] = useState([])
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

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
    </div>
  );
}

export default App;
