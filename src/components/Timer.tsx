import { useState, useEffect, useRef } from "react";
import { Timer as TimerProps } from "../../store/timers-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ name, duration }: TimerProps) {
    const interval = useRef<null | number>(null);
    const [remainingTime, setRemainingTime] = useState(duration * 1000);

    if (remainingTime <= 0 && interval.current) {
        clearInterval(interval.current);
    }
    useEffect(() => {
        /** 
           NOTE: 
         * This method returns an interval ID which uniquely identifies the interval,
         * so you can remove it later by calling clearInterval()
         */
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 50);
        }, 50);
        interval.current = intervalId;
        return () => clearInterval(intervalId);
    }, []);

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    return (
        <Container as="article">
            <h2>{name}</h2>
            <p>
                <progress max={duration * 1000} value={remainingTime} />
            </p>
            <p>{formattedRemainingTime}</p>
        </Container>
    );
}
