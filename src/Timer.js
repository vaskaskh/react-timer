import { useState, useEffect } from 'react';
import  './timer.css';





const Timer=()=> {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);

    const [startAndPause, setStartAndPause] = useState(false)

    const [actualTime] = useState(120);
    useEffect(() => {
        
        const gap = setInterval(() => {
            if (startAndPause && seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (hours > 0 && minutes <= 0) {

                setHours(hours - 1);

                setMinutes(59);setSeconds(59);
                
            } else if(hours===0 && minutes===0 && seconds===0 ){

                setStartAndPause(false);
                setSeconds(0);
                setHours(0);
                setMinutes(0);

                alert('RING RING RING!!!');

                setStartAndPause(true);
                resetTimer();
         


            }else if (startAndPause && seconds === 0 && minutes >= 0 && hours >= 0) {

                if (minutes <= 0 && hours <= 0) {
                    setStartAndPause(false)
                    clearInterval(gap)
                };

                setMinutes(minutes - 1);
                setSeconds(59);
            }
        }, 1000);

        
        return () => {
            clearInterval(gap);
        };
    });

    const resetTimer=()=> {
        setHours(Math.round(actualTime / 3600))
        setMinutes(Math.round(actualTime % 3600 / 60))
        setSeconds((actualTime % 3600) % 60)
    }




    console.log(startAndPause);
    return (

        <>
            <div  style={{fontSize: "15rem"}}>
                {
                    <span>
                        {hours < 10 ? `0${hours}` : hours}
                        :
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                }

            </div>
            <div style={{display:"flex"}}>
            <div style={{width:"200px"}}  >
                <div  onClick={() => setStartAndPause(!startAndPause)}>
                   {
                       startAndPause? 
                       <button className="pause">
                           Pause
                       </button>
                        :
                        <button className="start">
                            Start
                        </button>

                   }
                </div>
            </div>
            
            <div >
                <button className="reset" disabled={startAndPause } onClick={resetTimer}>
                    Reset
                </button>
            </div>

            
            </div>

        </>
    );
}

export default Timer;