type Props = {
    value: boolean,
    disable?: boolean,
    setTogle: (value: boolean) => void,
}

function Togle({ value, setTogle, disable = false }: Props) {
    const onTogleChange = () => {
        setTogle(!value);
    };
    const containerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block'
    };
    const inputStyle: React.CSSProperties = {
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        zIndex: -1,
        position: 'absolute',
        right: value ? -10 : 6,
        top: -8,
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.38)',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.3s 0.1s, transform 0.2s 0.1s',
    };
    const trackStyle: React.CSSProperties = {
        display: 'inline-block',
        margin: '5px 0 5px 10px',
        borderRadius: 7,
        width: 36,
        height: 14,
        backgroundColor: value ? '#D3BBA6' : 'rgba(0,0,0,0.38)',
        transition: 'background-color 0.2s, opacity 0.2s'
    };
    const thumbStyle: React.CSSProperties = {
        content: '""',
        position: 'absolute',
        top: 2,
        right: value ? 16 : 16,
        borderRadius: '50%',
        width: 20,
        height: 20,
        backgroundColor: value ? '#8C4E2D' : '#D3BBA6',
        boxShadow: '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
        transition: 'background-color 0.2s, transform 0.2s',
        transform: value ? 'translateX(16px)' : 'translateX(0)'
    };

    return (
        <div style={containerStyle}>
            <label style={{ position: 'relative', display: 'inline-block' }}>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onTogleChange}
                    style={inputStyle}
                    disabled={disable}
                />
                <span style={trackStyle}>
                    <span style={thumbStyle}></span>
                </span>
            </label>
        </div>
    );
}

export default Togle;
