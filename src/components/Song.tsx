import { useRef } from "react";

interface SongProps {
  label: string;
  audio: string;
  onPlay: (name: string) => void;
}

export default function Song({ label, audio, onPlay }: SongProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    onPlay(label);
    audioRef.current?.play();
  };

  return (
    <div id="seperateSong">
      <p>{label}</p>
      <audio ref={audioRef} src={audio} />
      <button onClick={handlePlay}>Play</button>
    </div>
  );
}
