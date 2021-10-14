import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { CalendarApp } from './CalendarApp';
import { store } from './store/store';
import './styles.css'

console.log(process.env);
ReactDOM.render(
    <Provider store={store}>
    <CalendarApp/>
    </Provider>,
    document.getElementById('root')
);