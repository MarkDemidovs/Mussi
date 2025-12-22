import { forwardRef, useRef } from "react";


interface songProps {
    label: string;
    audio: string;
}

export default function Song({label, audio}: songProps) {
    return (
        <div id="seperateSong">
            <p id="songTitle">{label}</p>
            <audio controls src={audio} />
        </div>
    )
}