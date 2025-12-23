import { useRef } from "react";

interface SongProps {
  label: string;
  fullName: string;
  audio: string;
  onPlay: (name: string) => void;
  deleteAudio: (name: string) => void;
}

export default function Song({ label, fullName, audio, onPlay, deleteAudio }: SongProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    onPlay(label);
    audioRef.current?.play();
  };
  const deleteSong = () => {
    deleteAudio(fullName);
  }


  return (
    <div id="seperateSong">
      <p>{label}</p>
      <audio ref={audioRef} src={audio} />
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={deleteSong}>Delete</button>
      </div>
    </div>
  );
}
