import { type ReactNode, createContext, useContext } from "react";

type Timer = {
    name: string;
    duration: number;
};

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
};

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void;
    startTimers: () => void;
    stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export const useTimersContext = () => {
    const timersCtx = useContext(TimersContext);
    if (timersCtx === null) {
        throw new Error("Timers context is null- that should not be the case!");
    }
    return timersCtx;
};

type TimersContextProviderProps = {
    children: ReactNode;
};

const TimersContextProvider = ({ children }: TimersContextProviderProps) => {
    const ctx: TimersContextValue = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {
            // ...
        },
        startTimers() {
            // ...
        },
        stopTimers() {
            // ...
        },
    };
    return (
        <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
    );
};

export default TimersContextProvider;
