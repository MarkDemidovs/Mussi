interface songProps {
    label: string;
}

export default function Song({label}: songProps) {
    return (
        <div>
            <p>{label}</p>
        </div>
    )
}