import React from 'react';
import { Link } from 'react-router-dom';

const DashBoardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/create-place" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i>Tạo khu mới</Link>
            <Link to="/create-place" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i>Tạo bàn mới</Link>
            <Link to="/create-place" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i>Tạo thức ăn</Link>
        </div>
    )
}

export default DashBoardActions;