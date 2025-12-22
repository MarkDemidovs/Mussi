interface playProps{
    songName: string;
}

export default function PlayBar({songName}: playProps) {
    return (<div id="playBar">
        <p>{songName}</p>
    </div>);
}