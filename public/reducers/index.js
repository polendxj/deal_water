import {combineReducers} from 'redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {changeTopMenu, changeLeftMenu} from '../reducers/MenuReducer'
import {changeSearch1Type} from '../reducers/SearchReducer'
import {login} from '../reducers/LoginReducer'
import {commonReducer, getMutipleConditoinList, getDetailSession} from '../reducers/CommonReducer'

import {reducer as reduxFormReducer} from 'redux-form'

const rootReducer = combineReducers({
    login,
    changeTopMenu,
    changeLeftMenu,
    changeSearch1Type,
    commonReducer,
    getMutipleConditoinList,
    getDetailSession,
    form: reduxFormReducer,
    routing: routerReducer
})

export default rootReducer