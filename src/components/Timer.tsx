import { useState, useEffect, useRef } from "react";
import {
    Timer as TimerProps,
    useTimersContext,
} from "../../store/timers-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ name, duration }: TimerProps) {
    const interval = useRef<null | number>(null);
    const [remainingTime, setRemainingTime] = useState(duration * 1000);
    const { isRunning } = useTimersContext();

    if (remainingTime <= 0 && interval.current) {
        clearInterval(interval.current);
    }
    useEffect(() => {
        /** 
           NOTE: 
         * This method returns an interval ID which uniquely identifies the interval,
         * so you can remove it later by calling clearInterval()
         */
        let intervalId: number;
        if (isRunning) {
            intervalId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) return prevTime;
                    else return prevTime - 50;
                });
            }, 50);
            interval.current = intervalId;
        } else if (interval.current) {
            clearInterval(interval.current);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

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
