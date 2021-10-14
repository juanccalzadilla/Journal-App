
import { types } from "../types/types";


// {
//     id:new Date().getTime(),
//     title: 'BossDay',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'Buy a cake',
//     user: {
//         _id: '1231',
//         name: 'Fer'

//     }
// }
const initialState = {
    events:[],
    activeEvent: null
}


export const calendarReducer = (state = initialState, action) =>{
 
    switch (action.type) {
       
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return{
                ...state,
                events:[...state.events,action.payload]
                
            }
        case types.eventActiveClear:
            return{
                ...state,
                activeEvent:null
            }
        case types.eventUpdate:
            return{
                ...state,
                events:state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }
        case types.eventDeleted:
            return{
                ...state,
                events:state.events.filter(e => e.id !== state.activeEvent.id),
                activeEvent:null
            }

        case types.eventLoaded:
            return{
                ...state,
                events:[...action.payload]
            }

        case types.authLogoutClear:
            return{
                ...state,
                activeEvent: null
               
            }
            

    
        default:
            return state;
    }
}