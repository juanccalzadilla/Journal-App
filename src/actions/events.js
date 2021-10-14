import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartNew = (e) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;
        try {
            const resp = await fetchWithToken('events/', e, 'POST');
            const body = await resp.json();
            console.log(body);

            if (body.ok) {
                e.id = body.eventSave.id;
                e.user = {
                    _id: uid,
                    name: name
                }
                console.log(e);
                dispatch(eventAddNew(e))

            }
        } catch (error) {
            console.log(error);
        }
    }
}



const eventAddNew = (e) => ({
    type: types.eventAddNew,
    payload: e
});

export const setActive = (e) => ({
    type: types.eventSetActive,
    payload: e
});

export const eventActiveClear = () => ({
    type: types.eventActiveClear
})

export const eventStartUpdate = (e) => {
    return async (dispatch) => {
        try {
            
            const resp = await fetchWithToken(`events/${e.id}`, e,'PUT')
            const body = await resp.json();

            if (body.ok) {
                dispatch(updateEvent(e))
            }else{
                Swal.fire('Error',body.msg,'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}
 const updateEvent = (e) => ({
    type: types.eventUpdate,
    payload: e
})

export const startDeleted = () => {
    return async (dispatch, getState) => {
        const {id} = getState().calendar.activeEvent;
        // console.log(activeEvent.id);
        try {
            const resp = await fetchWithToken(`events/${id}`,{},'DELETE')
            const body = await resp.json()
            if (body.ok) {
                dispatch(deletedEvent())
                Swal.fire('Deleted', 'Your event has been deleted','success')
            }else{
                Swal.fire('Error', body.msg,'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}





  const deletedEvent = () => ({
    type: types.eventDeleted
})


export const eventStartLoad = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken('events/')
            const body = await resp.json()
            const events = prepareEvents(body.events);
            dispatch(eventLoad(events));


        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoad = (events) => ({
    type: types.eventLoaded,
    payload: events
})