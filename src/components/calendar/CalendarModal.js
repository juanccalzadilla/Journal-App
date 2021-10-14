import moment from 'moment';
import React, { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'moment/locale/es';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventActiveClear, eventStartNew, eventStartUpdate } from '../../actions/events';

moment.locale('es');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');

const nowEnd = now.clone().add(1, 'hours');
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowEnd.toDate(),

}
export const CalendarModal = () => {
    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)
    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowEnd.toDate())
    const [formValues, setFormValues] = useState(initEvent)

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent)
        } else {
            setFormValues(initEvent)
        }

    }, [activeEvent, setFormValues])


    const [titleValid, setTitleValid] = useState(true)
    const { title, notes, start, end } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(uiCloseModal())
        dispatch(eventActiveClear())
        setFormValues(initEvent)
    }

    const handleDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'End date must be high than start date', 'error')

        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {

            dispatch(eventStartNew(formValues))

        }
        setTitleValid(true)
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className='modal'
            closeTimeoutMS={200}
            overlayClassName='modal-fondo'
        >
            <h1>{(activeEvent) ? 'Editando evento' : 'Nuevo evento'}</h1>
            <hr />
            <form className="container"
                onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleDateChange}
                        value={dateStart}
                        className="form-control"
                    // locale={true}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className="form-control"
                        minDate={dateStart}
                    // locale={true}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
