import './style.css';

export const ProfilePicture = (data, pfp, setPfp) => {

    return(
        <div>
            <a onClick={setPfp(data)}>
                <img src={pfp}/>
            </a>
        </div>
    );
}