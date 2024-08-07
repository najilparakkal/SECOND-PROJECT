import React from 'react';
import Sidebar from '../../../../compounents/admin/Sidebar';
import Header from '../../../../compounents/admin/Header';
import UserTable from './UserTable';

const Dashboard: React.FC = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header name="Users List" />

        <UserTable />
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
