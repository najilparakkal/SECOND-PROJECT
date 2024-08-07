import React from 'react'
import ProfileHeader from '../../../../compounents/user/ProfileHeader'
import Bookings from './Bookings'
import Notification from '../../../../compounents/user/Notification'

const BookingSection = () => {
  return (
    <div>
      <ProfileHeader/>
      <Notification/>
      <Bookings/>

    </div>
  )
}

export default React.memo(BookingSection)
