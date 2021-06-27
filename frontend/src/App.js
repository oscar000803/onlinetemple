import { useState } from 'react'
import { sendMessage } from './axios'

function App() {

  const [incenseArticle_ids, setIncenseArticle_ids] = useState([])

  return (
    <div className="App">
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
  );
}

export default App;
