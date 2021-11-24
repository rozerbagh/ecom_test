import reducer from './reducer';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const saveToLocalStorage = (state, nameOfState) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem(`state`, serializedState);
    } catch (error) {

    }
}

const loadFromLocalStorage = () => {
    try {
        let serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined
    }
}

const persistedState = loadFromLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    reducer,
    persistedState: persistedState,
})

const finalReducer = (state, action) => {
    return rootReducer(state, action);
};

const appStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

appStore.subscribe(() => saveToLocalStorage(appStore.getState()))

export default appStore;