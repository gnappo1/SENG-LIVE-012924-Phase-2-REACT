import {useEffect} from 'react'

const Notification = ({ error, updateError }) => {
    useEffect(() => {
        setTimeout(() => updateError(""), 5000)
    }, [updateError]);

    return (
        <div>{error}</div>
    )
}

export default Notification