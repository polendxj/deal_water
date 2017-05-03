/**
 * Created by Administrator on 2016/8/3.
 */
import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import App from './containers/App'
import LoginContainer from './containers/Login'
import Developing from './containers/Developing'
import source_panel_container from './containers/sourceService/source_panel_container'
import source_panel2_container from './containers/sourceService/source_panel2_container'
import SpeedDomaincontainer from './containers/sourceService/SpeedDomaincontainer'
import FusionContainer from './containers/fusion/FusionContainer'
import FinancialStatisticsContainer from './containers/financialStatistics/FinancialStatisticsContainer'
import SetBillInfoContainer from './containers/financialStatistics/SetBillInfoContainer'
import CreateBillInfoContainer from './containers/financialStatistics/CreateBillInfoContainer'
import source_main from './containers/source_main'
import PersonnalContainer from './containers/financialStatistics/PersonnalContainer'
import configureStore from './store/configureStore'

let store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={source_main}/>
                <Route path="/Developing" component={Developing}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/source" component={source_panel_container}/>
                <Route path="/source2" component={source_panel2_container}/>
                <Route path="/fastDomain" component={SpeedDomaincontainer}/>
                <Route path="/fusion" component={FusionContainer}/>
                <Route path="/financialStatistic" component={FinancialStatisticsContainer}/>
                <Route path="/setBillInfo" component={SetBillInfoContainer}/>
                <Route path="/createBillInfo" component={CreateBillInfoContainer}/>
                <Route path="/personal" component={PersonnalContainer}/>
                <Route path="/sourceMain" component={source_main}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('wrap')
)



