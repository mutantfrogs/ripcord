import './style.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

export const Message = ({message, username, timestamp, color, pfp}) => {

    const date = new Date(timestamp);
    //const updatedDate = date.getHours()+":"+date.getMinutes();
    const updatedDate = dayjs(date).fromNow();

    return(
        <div className='flexContainerRowNoCenter' style={{marginBottom: '10px' }}>
            <div>
                <img src={pfp} id='profilePicture'/>
            </div>
            <div className='flexContainerColumnNoCenter' style={{ marginBottom: '10px' }}>
                <div className='flexContainerRowNoCenter'>
                    <p style={{color}} id='msgUsername'>{username}</p>
                    <p id='msgTimestamp'>{updatedDate}</p>
                </div>
                <div className='flexContainerColumnNoCenter'>
                    <p id='msgContent'>{message}</p>
                </div>
            </div>
        </div>
    );
}