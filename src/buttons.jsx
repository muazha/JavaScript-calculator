export default function BUTTONS({id,value,className,onclick}) {
    return (
        <button onClick={onclick} id={id} className={className}>
            {value}
        </button>
    )
}