import './style.css';
import io from 'socket.io-client';
import { Message } from './Message.jsx';
import { useEffect, useState } from 'react';
const socket = io.connect("https://ripcord-63sq.onrender.com");

function App() {
  
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");
  const [feed, setFeed] = useState([]);
  const [pfp, setPfp] = useState("");
  const [lobby, setLobby] = useState("");
  const [settingsDiv, setsettingsDiv] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();

    const user = socket.id;
    const messageData = {lobby: lobby, message: message, user: user, username: username, color: color, pfp: pfp};
    socket.emit("sendMsgToServer", messageData);
    setMessage("");
  }

  const joinLobby = (e) => {
    e.preventDefault();
    if(pfp == ""){
      alert("Select a profile picture!")
      return;
    }

    if(settingsDiv == true){
      setLobby("");
      setsettingsDiv(false);
      setFeed([]);
      return;
    }

    const user = socket.id;
    console.log(socket.id);
    const messageData = {lobby: lobby, message: message, user: user, username: username, color: color, pfp: pfp};
    setsettingsDiv(true)
    socket.emit("joinClientToServer", messageData);
  }

  useEffect(() => {
    const handleMessage = (fullMessage) => {
      setFeed(prevFeed => [...prevFeed, fullMessage]);
    };

    socket.on("sendMsgToClient", handleMessage);

    return () => {
      socket.off("sendMsgToClient", handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleJoin = (fullMessage) => {
      setFeed(prevFeed => [...prevFeed, fullMessage]);
    };

    socket.on("joinClientToLobby", handleJoin);

    return () => {
      socket.off("joinClientToLobby", handleJoin);
    };
  }, []);

  const renderMessageFeed = () => {
    return feed.map(item => (
      <Message message={item.message} username={item.username} timestamp={item.timestamp} color={item.color} pfp={item.pfp}/>
    ))
  }

  return (
    <>
      <div className='flexContainerColumn'>
        <div id='feedDiv'>
          {renderMessageFeed()}
        </div>

        <div id='taskbarDiv' className='flexContainerColumn'>
          <form onSubmit={e => sendMessage(e)}>
            <input disabled={!settingsDiv} required id='taskbarInput' type='text' value={message} onChange={e => setMessage(e.target.value)}></input>
            <button disabled={!settingsDiv} type='submit'>send</button>
          </form>
          <div id='lobbyDiv' className='flexContainerRow'>
          <form onSubmit={e => joinLobby(e)}>
              <label style={{fontSize: '12px'}}>lobby</label>
              <input disabled={settingsDiv} style={{height: '12px'}} required id='taskbarLobbyInput' type='text' value={lobby} onChange={e => setLobby(e.target.value)}></input>
              <label style={{fontSize: '12px'}}>username</label>
              <input disabled={settingsDiv} style={{height: '12px'}} required id='taskbarUsernameInput' type='text' value={username} onChange={e => setUsername(e.target.value)}></input>
              <input disabled={settingsDiv} type='color' value={color} onChange={e => setColor(e.target.value)}></input>
              <select disabled={settingsDiv} id="cars" name="cars" size="1" onChange={e => setPfp(e.target.value)}>
                  <option value="">Profile Picture</option>
                  <option value="/airplane.png">Airplane</option>
                  <option value="/astronaut.png">Astronaut</option>
                  <option value="/ball.png">Ball</option>
                  <option value="/beach.png">Beach</option>
                  <option value="/butterfly.png">Butterfly</option>
                  <option value="/car.png">Car</option>
                  <option value="/cat.png">Cat</option>
                  <option value="/chess.png">Chess</option>
                  <option value="/dirt bike.png">Dirt Bike</option>
                  <option value="/dog.png">Dog</option>
                  <option value="/drip.png">Drip</option>
                  <option value="/duck.png">Duck</option>
                  <option value="/fish.png">Fish</option>
                  <option value="/frog.png">Frog</option>
                  <option value="/guest.png">Guest</option>
                  <option value="/guitar.png">Guitar</option>
                  <option value="/horses.png">Horses</option>
                  <option value="/kick.png">Kick</option>
                  <option value="/lift off.png">Lift Off</option>
                  <option value="/palm tree.png">Palm Tree</option>
                  <option value="/pink flower.png">Pink Flower</option>
                  <option value="/red flower.png">Red Flower</option>
                  <option value="/skater.png">Skater</option>
                  <option value="/snowflake.png">Snowflake</option>
                </select>
                <button type='submit'>{settingsDiv ? "Leave" : "Join"}</button>
              </form> 
          </div>
        </div>
      </div>
    </>
  )
}

export default App
