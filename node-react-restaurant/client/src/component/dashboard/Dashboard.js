import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardAction from './DashBoardAction';
import Place from './Place';
import Food from './Food';

import { getCurrentProfile } from '../../actions/profile';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    console.log(profile);
    return loading && profile == null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Quản lý bàn hàng</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Xin chào {profile.tbl_User.name}
        </p>
        <Fragment>
            <DashboardAction />
            <Place />
            <Food />
        </Fragment>
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);