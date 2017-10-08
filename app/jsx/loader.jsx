import ReactDOM from 'react-dom';
import Routes from './routes';
import {browserHistory} from 'react-router';
let translate = require('counterpart');
translate.registerTranslations('jp', require('./locales/jp'));

if (localStorage.locale == null) {
  localStorage.setItem('locale', 'jp');
  translate.setLocale('jp');
} else {
  translate.setLocale(localStorage.locale);
}


$(document).on('ready page:load', function () {
  ReactDOM.render(<Routes history={browserHistory}/>,
    document.getElementById('root'));
});
