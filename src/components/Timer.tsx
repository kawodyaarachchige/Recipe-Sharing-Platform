import {useState, useEffect, useRef} from 'react';

interface TimerProps {
    initialTime: number;
    onComplete?: () => void;
}

export const Timer = ({initialTime, onComplete}: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(initialTime * 60);
    const [isActive, setIsActive] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = 0.3;
        audioRef.current.preload = 'auto';
        audioRef.current.src = 'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3';
        audioRef.current.load();
        audioRef.current.onerror = () => {
            if (audioRef.current) {
                audioRef.current.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
                audioRef.current.load();
            }
        };
        audioRef.current.style.display = 'none';
        document.body.appendChild(audioRef.current);
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeAttribute('src');
                document.body.removeChild(audioRef.current);
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playSound = () => {
        if (!audioEnabled || !audioRef.current) return;

        try {
            audioRef.current.currentTime = 0;
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Audio play failed:', error);
                    playWebAudioBeep();
                });
            }
        } catch (error) {
            console.warn('Audio error:', error);
            playWebAudioBeep();
        }
    };

    const playWebAudioBeep = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            audioContextRef.current = new AudioContext();
            const osc = audioContextRef.current.createOscillator();
            const gain = audioContextRef.current.createGain();

            osc.type = 'sine';
            osc.frequency.value = 800;
            gain.gain.value = 0.1;

            osc.connect(gain);
            gain.connect(audioContextRef.current.destination);

            osc.start();
            osc.stop(audioContextRef.current.currentTime + 0.2);
        } catch (error) {
            console.warn('Web Audio failed:', error);
        }
    };

    const toggleTimer = () => {
        if (!isActive && !audioEnabled) {
            setAudioEnabled(true);
        }
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(initialTime * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            playSound();
            onComplete?.();
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, timeLeft, onComplete]);

    return (
        <div className="bg-orange-50 dark:bg-gray-600 p-4 rounded-lg">
            <div className="text-2xl font-bold text-center mb-3 text-orange-600 dark:text-orange-300">
                {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center gap-3">
                <button
                    onClick={toggleTimer}
                    className={`px-4 py-2 rounded-md ${
                        isActive
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={resetTimer}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                    Reset
                </button>
            </div>
            {!audioEnabled && (
                <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                    Sound will be enabled when you start the timer
                </p>
            )}
        </div>
    );
};