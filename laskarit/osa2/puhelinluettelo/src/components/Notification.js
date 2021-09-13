import React from 'react'

const Notification = ({ message }) => {
    console.log(message)
    if (message === null) {
        return null
    }

    console.log(message)
     return (
        <div className={message.level}>
        {message.message}
        </div>
    )
}

export default Notification