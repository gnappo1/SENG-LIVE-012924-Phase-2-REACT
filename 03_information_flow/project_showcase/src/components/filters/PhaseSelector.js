import React from 'react'

const PhaseSelector = ({ handlePhaseSelection }) => {
    return (
        <div className="filter" onClick={handlePhaseSelection}>
            <button>All</button>
            <button>Phase 5</button>
            <button>Phase 4</button>
            <button>Phase 3</button>
            <button>Phase 2</button>
            <button>Phase 1</button>
        </div>
    )
}

export default PhaseSelector