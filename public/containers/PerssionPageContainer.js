/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import PerssionPageComponent from '../components/right/PerssionPageComponent'
import {savePermission, getPermissionList} from '../actions/SystemManagerPermissionAction'

export default class PerssionPageContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '用户中心', link: ''},
            {text: '权限管理', link: ''}
        ]
        this.operation = []
        this._changeRole = this._changeRole.bind(this)
        this._save = this._save.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(getPermissionList('SV'))
    }

    _changeRole(permissionId) {
        this.props.dispatch(getPermissionList(permissionId))
    }

    _save(type) {
        switch (type) {
            case 'SV':
                this.props.dispatch(savePermission(this.props.form.AdminPermissionForm.values))
                break;
            case 'MSO_OP':
                this.props.dispatch(savePermission(this.props.form.MSOPermissionForm.values))
                break;
            case 'SO_OP':
                this.props.dispatch(savePermission(this.props.form.SOPermissionForm.values))
                break;
            case 'GU':
                this.props.dispatch(savePermission(this.props.form.GUPermissionForm.values))
                break;

        }
    }

    render() {
        const {form, fetching, data} =this.props

        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <PerssionPageComponent data={data} fetching={fetching} _changeRole={this._changeRole}
                                                   _save={this._save}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, getSysManagerPermissionList}=state
    return {
        form: form,
        fetching: getSysManagerPermissionList.fetching,
        data: getSysManagerPermissionList.data
    }
}


export default connect(mapStateToProps)(PerssionPageContainer)