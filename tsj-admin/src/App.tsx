import { BrowserRouter as Router, } from "react-router-dom";
import { ProjectRoutes } from "./shared/ProjectRoutes/Routes";
import './styles/base.css';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ProjectRoutes />
        </Router>
      </PersistGate>
  </Provider>
)

export default App
