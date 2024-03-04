import { useProgress } from "app/progress";
import { Bar } from "./Bar";
import { Container } from "./Container";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { routePath } from "app/router/router";

const config = {
    0: {
        transition: 0,
        delay: 10,
    },
    10: {
        transition: 400,
        delay: 300,
    },
    20: {
        transition: 300,
        delay: 600,
    },
    30: {
        transition: 400,
        delay: 300,
    },
    40: {
        transition: 400,
        delay: 300,
    },
    50: {
        transition: 400,
        delay: 300,
    },
    60: {
        transition: 400,
        delay: 300,
    },
    70: {
        transition: 2500,
        delay: 4000,
    },
    80: {
        transition: 5000,
        delay: 400,
    },
    100: {
        transition: 100,
        delay: 400,
    },
};

export const ProgressBar = () => {
    const { active, progress, setProgress } = useProgress();
    const { pathname } = useLocation();

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { delay, transition } = config[progress as keyof typeof config];

    useEffect(() => {
        if (active) {
            timerRef.current = setTimeout(() => {
                if (progress < 80) {
                    setProgress(progress + 10);
                }
            }, delay);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [active, progress, setProgress, delay]);

    if (pathname.includes(routePath.login)) return null;

    return (
        <Container active={active}>
            <Bar progress={progress} active={active} transition={transition} />
        </Container>
    );
};
