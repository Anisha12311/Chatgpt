import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState();
   const [value,setValue] = useState();
   const [currentTitle, setCurrentTitle] = useState(null)
   const [previousChat, setPreviousChat] = useState([])
  const getMessage = async () => {
    try {
      const options = {
        method: "POST",
        headers: {        
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message : value
        }),
      };
      const data = await fetch("http://localhost:4000/completions", options);
      const response = await data.json();
      setMessage(response.choices[0].message)
    } catch (err) {
      console.log("err",err)
    }
  };

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleChat = (title) => {
    setCurrentTitle(title)
    setMessage(null)
    setValue("")
  }
  useEffect(() => {
    if(!currentTitle && value){
      setCurrentTitle(value)
    }

    if(currentTitle && value && message){
      setPreviousChat(prevState => [
       ...prevState, {
        title : currentTitle,
        role : "user",
        content : value
       },{
        title : currentTitle,
        role : message.role,
        content : message.content       
      }
      ])
    }
  },[message, currentTitle])
console.log('Prev', previousChat)
  const currentChat = previousChat.filter(previous => previous.title === currentTitle)

  const titleChat = Array.from(new Set(previousChat.map(previousChat => previousChat.title)))

  return (
    <div className="App">
      <section className="side-bar">
        <button onClick = {createNewChat}>+ New chat</button>
        <ul className="history">
         {titleChat?.map((title,i) => <li key = {i} onClick = {() => handleChat(title)}>{title}</li>)}
        </ul>
        <nav>
          <p>Made by Ani</p>
        </nav>
      </section>
      <section className="main">
        <div className = "scrollbar">
        <h1>Ani Gpt</h1>
        <ul className="feed">
          {currentChat?.map((chat,i) => <li key = {i}>
            <p className = "role">{chat.role}</p>
            <p >{chat.content}</p>
          </li>)}
        </ul>
        </div>
        <div className="bottom-section">
          <div className="input-container">
            <input value = {value} onChange = {(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessage}>
              <SendIcon />
            </div>
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts. ChatGPT August 3 Version
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
