import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/allStyles.scss'; // adres do głównego pliku SASS


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <>
            <App/>
        </>,
        document.getElementById('app')
    )
})

