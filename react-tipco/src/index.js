import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { addLocaleData } from 'react-intl';
import locale_de from 'react-intl/locale-data/en';
import locale_en from 'react-intl/locale-data/de';

addLocaleData([...locale_de, ...locale_en]);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
