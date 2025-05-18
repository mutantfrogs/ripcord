import './style.css';
import io from 'socket.io-client';
import { Message } from './Message.jsx';
import { useEffect, useState } from 'react';
//const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://ripcord-63sq.onrender.com");

function App() {
  
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [color, setColor] = useState(() => localStorage.getItem('color') || '');
  const [feed, setFeed] = useState([]);
  const [pfp, setPfp] = useState(() => localStorage.getItem('pfp') || '');
  const [lobby, setLobby] = useState("#room1");
  const [settingsDiv, setsettingsDiv] = useState(false);
  const [members, setMembers] = useState([]);

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
      localStorage.setItem('username', username);
      localStorage.setItem('color', color);
      localStorage.setItem('pfp', pfp);
    }, [username, color, pfp]);
    
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
              <select disabled={settingsDiv} size="1" value={lobby} onChange={e => setLobby(e.target.value)}>
                <option value="#room1">#room1</option>
                <option value="#room2">#room2</option>
                <option value="#room3">#room3</option>
              </select>
              <input placeholder='Username' disabled={settingsDiv} style={{height: '12px'}} required id='taskbarUsernameInput' type='text' value={username} onChange={e => setUsername(e.target.value)}></input>
              <input disabled={settingsDiv} type='color' value={color} onChange={e => setColor(e.target.value)}></input>
                <select disabled={settingsDiv} value={pfp} size="1" onChange={e => setPfp(e.target.value)}>
                  <option value="">Choose a Profile Picture</option>
                  <option value="/pfp/airplane.png">Airplane</option>
                  <option value="/pfp/astronaut.png">Astronaut</option>
                  <option value="/pfp/ball.png">Ball</option>
                  <option value="/pfp/beach.png">Beach</option>
                  <option value="/pfp/butterfly.png">Butterfly</option>
                  <option value="/pfp/car.png">Car</option>
                  <option value="/pfp/cat.png">Cat</option>
                  <option value="/pfp/chess.png">Chess</option>
                  <option value="/pfp/dirt bike.png">Dirt Bike</option>
                  <option value="/pfp/dog.png">Dog</option>
                  <option value="/pfp/drip.png">Drip</option>
                  <option value="/pfp/duck.png">Duck</option>
                  <option value="/pfp/fish.png">Fish</option>
                  <option value="/pfp/frog.png">Frog</option>
                  <option value="/pfp/guest.png">Guest</option>
                  <option value="/pfp/guitar.png">Guitar</option>
                  <option value="/pfp/horses.png">Horses</option>
                  <option value="/pfp/kick.png">Kick</option>
                  <option value="/pfp/lift off.png">Lift Off</option>
                  <option value="/pfp/palm tree.png">Palm Tree</option>
                  <option value="/pfp/pink flower.png">Pink Flower</option>
                  <option value="/pfp/red flower.png">Red Flower</option>
                  <option value="/pfp/skater.png">Skater</option>
                  <option value="/pfp/snowflake.png">Snowflake</option>
                </select>
                <button type='submit'>{settingsDiv ? "leave" : "join"}</button>
              </form> 
          </div>
        </div>
      </div>
    </>
  )
}

export default App
