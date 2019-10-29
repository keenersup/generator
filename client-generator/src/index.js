import ReactDOM from 'react-dom';
import AppProvider from './AppProvider'
import * as serviceWorker from './serviceWorker';
import './index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(AppProvider, document.getElementById('root'));

serviceWorker.unregister();
