
function SummaryCard({status, count}: {status: string, count: number}){

  return(
    <div className={`summary-card ${status}`}>
      <h4 >{status}</h4>
      <p >{count}</p>
    </div>
  )
}

export default SummaryCard