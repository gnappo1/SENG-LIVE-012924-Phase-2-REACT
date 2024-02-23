import {useState, useEffect} from 'react'

const Timer = () => {
    const [timer, setTimer] = useState(0);
    console.log("I rendered!")
    useEffect(() => {
        const intervalId = setInterval(
          () => setTimer((currentTimerVal) => currentTimerVal + 1),
          1000
        );
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>Timer: {timer}</div>
    )
}

export default Timer