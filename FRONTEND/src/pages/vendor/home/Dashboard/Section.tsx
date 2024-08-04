import React from 'react';
import DatePicker from './DatePicker';
import { useAppSelector } from '../../../../costumeHooks/costum';
import Booking from './Booking';
import { Wallet } from './Wallet';
import Billing from './Billing';

const Section: React.FC = () => {
  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);

  return (
    <div className="flex flex-col md:flex-row w-full mt-5">
      <div className="w-full md:w-1/4 p-4">
        <DatePicker vendorId={_id} />
        <Wallet />
      </div>
      <div className="w-full md:w-3/4 p-4">
        <Booking />
      </div>
    </div>
  );
};

export default React.memo(Section);
