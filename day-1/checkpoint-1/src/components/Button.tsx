type ButtonProps = {
    text: string;
    eventOnClick: () => void;
};

export function Button({text, eventOnClick}: ButtonProps) {
    return (
        <div>
            <button onClick={eventOnClick}>{text}</button>
        </div>
    )
}