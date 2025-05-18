import './style.css';

const pfps = [
  "/pfp/airplane.png",
  "/pfp/astronaut.png",
  "/pfp/ball.png",
  "/pfp/beach.png",
  "/pfp/butterfly.png",
  "/pfp/car.png",
  "/pfp/cat.png",
  "/pfp/chess.png",
  "/pfp/dirt bike.png",
  "/pfp/dog.png",
  "/pfp/drip.png",
  "/pfp/duck.png",
  "/pfp/fish.png",
  "/pfp/frog.png",
  "/pfp/guest.png",
  "/pfp/guitar.png",
  "/pfp/horses.png",
  "/pfp/kick.png",
  "/pfp/lift off.png",
  "/pfp/palm tree.png",
  "/pfp/pink flower.png",
  "/pfp/red flower.png",
  "/pfp/skater.png",
    "/pfp/yukko3.png",
  "/pfp/snowflake.png",
    "/pfp/chikawa1.jpg",
  "/pfp/chikawa2.jpg",
  "/pfp/chikawa3.jpg"
];

export const ProfilePicture = ({setPfp,setPfpSelectorOpen}) => {

    return(
        <div id='pfpSelector' className='flexContainerRow' style={{width:'288px'}}>
            {pfps.map((pfp) => (
                <div id='pfpIcon' key={pfp} onClick={() => {setPfp(pfp); setPfpSelectorOpen(false)}}>
                    <img style={{width:`48px`, height:`48px`}} src={pfp} />
                </div>
            ))}
        </div>
    );
}