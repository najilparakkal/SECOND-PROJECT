import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/user/authentications/Signup";
import Otp from "../pages/user/authentications/Otp";
import Login from "../pages/user/authentications/Login";
import ForgotPass from "../pages/user/authentications/ForgotPass";
import User from "../routeAuth/User";
import Home from "../pages/user/homePage/Home";
import Vendors from "../pages/user/vendorsPage/Vendors";
import Vendor from "../pages/user/vendorProfile/Vendor";
import MessageSection from "../pages/user/profileSection/messages/MessageSection";
import BookingSection from "../pages/user/profileSection/bookings/BookingSection";
import { useAppSelector } from "../costumeHooks/costum";
import ProfileSection from "../pages/user/profileSection/profile/ProfileSection";
import WishlistSection from "../pages/user/profileSection/wishlist/WishlistSection";
import { useEffect, useState } from "react";
import { useSocket } from "../API/services/outer/SocketProvider";
import { fetchUserRoomIds, fetchVendorNotification } from "../API/services/user/Services";
import toast from "react-hot-toast";

const UserRouter: React.FC = () => {
    const userDetails = useAppSelector((state) => state.user.userDetails._id);
   

    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/login" element={userDetails ? <Navigate to="/home" /> : <Login />} />
            <Route path="/forgot" element={<ForgotPass />} />
            <Route path="" element={<User />}>
                <Route path="/home" element={<Home />} />
                <Route path="/vendors/:service" element={<Vendors />} />
                <Route path="/vendorProfile/:id" element={<Vendor />} />
                <Route path="/wishlist" element={<WishlistSection />} />
                <Route path="/messages" element={<MessageSection />} />
                <Route path="/bookings" element={<BookingSection />} />
                <Route path="/profile" element={<ProfileSection />} />
            </Route>
        </Routes>
    );
};

export default UserRouter;
