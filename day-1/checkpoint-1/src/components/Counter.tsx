type CounterProps = {
    text: number;
};

export function Counter({text}: CounterProps) {
    return <p>Nilai Counter : {text}</p>
}
