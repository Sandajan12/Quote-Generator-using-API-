import { useState } from 'react'
import './App.css'
import.meta.env

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [isloading, setIsloading] = useState(false);


  const fetchData = async () => {
    setIsloading(true)

    try{
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: 'GET', 
        headers: { 'X-Api-Key': import.meta.env.VITE_QUOTE_GENERATOR_API_KEY, }, }); 
      
      if (!response.ok){
        throw new Error("Network Response was not ok");
      }

      const data = await response.json();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
      setCategory(data[0].category);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return(
    <div className="container">
      <div className="header">
        <h1>Random Quote Generator</h1>
      </div>
      <div className="btn">
        <button onClick={fetchData}>Generate</button>
      </div>
      <div className="result">
        {isloading && <p style={{color: 'gray'}}>Loading...</p>}
        {quote && <p><strong>Quote:</strong> "{quote}"</p>}
        {author && <p><strong>Author:</strong> "{author}"</p>}
        {category && <p><strong>Category:</strong> "{category}"</p>}
      </div>
    </div>
  );
}

export default App;