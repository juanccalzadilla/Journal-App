import React, { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NavBar } from '../ui/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers/calendar-es';
import { CalendarEvent } from './CalendarEvent';
import moment from 'moment'
import 'moment/locale/es';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventActiveClear, eventStartLoad, setActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/deleteEventFab';


moment.locale('es');
const localizer = momentLocalizer(moment);
// ------------------------------------------------Component -------------------------------->>
export const CalendarScreen = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    useEffect(() => {
        dispatch(eventStartLoad())
        
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }
    const onSelectEvent = (e) => {
        dispatch(setActive(e))

    }
    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {

        dispatch(eventActiveClear())
    }



    const evenetStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor:(uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'

        }
        return {
            style
        }
    };
    return (
        <div className="calendar-screen animate__animated animate__fadeIn">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={evenetStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            <CalendarModal />

            {
                (activeEvent !== null) && <DeleteEventFab />
            }
        </div>
    )
}
