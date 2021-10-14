import React from 'react'

export const CalendarEvent = ({ event }) => {
    
    const { title,user } = event;
    return (
        <div>
            <span>{title}</span>
            
            <strong> By - {user.name}</strong>
        </div>
    )
}
