
type Props = {
    name: string,
    value: number | null,
    valueUnit: string,
    usage?: number | null,
    total?: number | null,
    unit?: string,
    is_table?: boolean
}

function Card({ name, value, valueUnit, usage, total, unit, is_table = false }: Props) {
    return (
        <div className="card">
            <h4 className="card-title">{name}</h4>
            <div className="card-body">
                <p>{value !== null ? value : "--"} {valueUnit}</p>
                <p>
                    {is_table ? "Table" : 
                    total !== undefined && <>Total {usage !== null ? usage : "--"} / {total !== null ? total : "--"} {unit && <span>{unit}</span>}
                    </>
                    }
                </p>
                {}
            </div>
        </div>
    )
}

export default Card