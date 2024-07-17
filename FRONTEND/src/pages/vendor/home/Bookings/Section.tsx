import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { userBookings, cancelBooking, acceptBooking } from '../../../../API/services/vendor/services';
import { useNavigate } from 'react-router-dom';

interface Booking {
    _id: string;
    clientName: string;
    eventDate: string;
    event: string;
    advance: number;
    arrivalTime: string;
    email: string;
    endingTime: string;
    guests: number;
    location: string;
    phoneNumber: string;
    pincode: string;
    userId: string;
    vendorId: string;
    vendorName: string;
    accepted: boolean;
}

const Section: React.FC = () => {
    const { _id } = useAppSelector((state) => state.vendor.vendorDetails);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBookings = async () => {
            const datas = await userBookings(_id + "");
            const accepted = [];
            const pending = [];
            for (const item of datas) {
                if (item.accepted) {
                    accepted.push(item);
                } else {
                    pending.push(item);
                }
            }
            setAcceptedBookings(accepted);
            setBookings(pending);
        };

        fetchBookings();
    }, [_id]);

    const calculateDaysDifference = (eventDate: string) => {
        const currentDate = new Date();
        const eventDateObj = new Date(eventDate);
        const timeDiff = eventDateObj.getTime() - currentDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const handleCancelClick = (booking: Booking) => {
        const daysDifference = calculateDaysDifference(booking.eventDate);
        const refund = daysDifference >= 3 ? 50 : 25;
        console.log(`Refund amount: ${refund}`);
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    const handleAcceptClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowAcceptModal(true);
    };

    const handleDetailsClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowCancelModal(false);
        setShowAcceptModal(false);
        setShowDetailsModal(false);
        setSelectedBooking(null);
    };

    const handleConfirmCancel = async () => {
        if (selectedBooking) {
            await cancelBooking(selectedBooking._id);
            setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== selectedBooking._id));
            handleCloseModal();
        }
    };

    const handleConfirmAccept = async () => {
        if (selectedBooking) {
            const acceptedBooking = await acceptBooking(selectedBooking._id);
            setAcceptedBookings((prevAccepted) => [...prevAccepted, acceptedBooking]);
            setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== selectedBooking._id));
            handleCloseModal();
        }
    };

    return (
        <div>
            {acceptedBookings.length > 0 && (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Accepted Bookings</h1>
                    <div className="overflow-x-auto bg-gray-700 text-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SN</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booked Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">More Info</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-600 divide-y divide-gray-500">
                                {acceptedBookings.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(booking.eventDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.clientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-green-500 hover:text-red-300">Pending</button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-blue-500 hover:text-blue-300" onClick={() => handleDetailsClick(booking)}>More..</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {bookings.length > 0 && (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Bookings</h1>
                    <div className="overflow-x-auto bg-gray-700 text-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SN</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booked Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">More Info</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-600 divide-y divide-gray-500">
                                {bookings.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(booking.eventDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.clientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-500 hover:text-blue-300" onClick={() => handleAcceptClick(booking)}>Accept</button>
                                                <button className="text-red-500 hover:text-red-300" onClick={() => handleCancelClick(booking)}>Cancel</button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-blue-500 hover:text-blue-300" onClick={() => handleDetailsClick(booking)}>More..</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showCancelModal && selectedBooking && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11v2m0-8v2m9-1a9 9 0 11-18 0 9 9 0 0118 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to cancel this booking?</h3>
                                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleConfirmCancel}>Yes, I'm sure</button>
                                <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleCloseModal}>No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAcceptModal && selectedBooking && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11v2m0-8v2m9-1a9 9 0 11-18 0 9 9 0 0118 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to accept this booking?</h3>
                                <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleConfirmAccept}>Yes, I'm sure</button>
                                <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleCloseModal}>No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDetailsModal && selectedBooking && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Booking Details</h3>
                                <div className="text-left text-gray-500 dark:text-gray-400">
                                    <p><strong>Client Name:</strong> {selectedBooking.clientName}</p>
                                    <p><strong>Event Date:</strong> {new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
                                    <p><strong>Event:</strong> {selectedBooking.event}</p>
                                    <p><strong>Advance:</strong> {selectedBooking.advance}</p>
                                    <p><strong>Arrival Time:</strong> {selectedBooking.arrivalTime}</p>
                                    <p><strong>Email:</strong> {selectedBooking.email}</p>
                                    <p><strong>Ending Time:</strong> {selectedBooking.endingTime}</p>
                                    <p><strong>Guests:</strong> {selectedBooking.guests}</p>
                                    <p><strong>Location:</strong> {selectedBooking.location}</p>
                                    <p><strong>Phone Number:</strong> {selectedBooking.phoneNumber}</p>
                                    <p><strong>Pincode:</strong> {selectedBooking.pincode}</p>
                                </div>
                                <button type="button" className="mt-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => {
                                    navigate('/vendor/messages')
                                    handleCloseModal
                                }
                                }>Connect Client</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Section;
