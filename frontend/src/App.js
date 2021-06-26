import { useState } from 'react'
import { sendMessage } from './axios'

function App() {

  return (
    <div className="App">
      <button onClick={async (e) => {await sendMessage('get', 'incenseArticle/id')}}>get incenseArticle/id</button>
      <button onClick={async (e) => {await sendMessage('get', 'incenseArticle/brief', {params:{incenseArticle_id: [123]}})}}>get incenseArticle/brief</button>
    </div>
  );
}

export default App;
