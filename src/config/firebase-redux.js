import {combineReducers, createStore} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import firebase from 'firebase';

const rootReducer = combineReducers({
    firebase: firebaseReducer
});

const initialState={};
const store = createStore(rootReducer, initialState);
const rrfConfig={

};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
};

export function getReduxStore(){
    return store
}

export function getRrfProp(){
    return rrfProps
}