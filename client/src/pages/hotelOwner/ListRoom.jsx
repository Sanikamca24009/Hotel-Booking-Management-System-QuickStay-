import React, { useEffect } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListRoom = () => {

    const { axios, getToken, user } = useAppContext()
    const [rooms, setRooms] = React.useState([])

    // Fetch Rooms of the Hotel Owner
    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms/owner', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setRooms(data.rooms)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Toggle Availability of the Room
    const toggleAvailability = async (roomId) => {
        const { data } = await axios.post("/api/rooms/toggle-availability", { roomId }, { headers: { Authorization: `Bearer ${await getToken()}` } })
        if (data.success) {
            toast.success(data.message)
            fetchRooms()
        } else {
            toast.error(data.message)
        }
    }

    // Delete Room
    const deleteRoom = async (roomId) => {
        try {
            const { data } = await axios.delete(`/api/rooms/${roomId}`, { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                toast.success(data.message)
                fetchRooms()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Fetch Rooms when user is logged in
    useEffect(() => {
        if (user) {
            fetchRooms()
        }
    }, [user])

    return (
        <div>
            <Title align='left' font='outfit' title='Room Listings' subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.' />
            <p className='text-gray-500 mt-8'>Total Hotels</p>
            {/* Table with heads User Name, Room Name, Amount Paid, Payment Status */}
            <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
                <table className='w-full' >
                    <thead className='bg-gray-50 '>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Price / night</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {
                            rooms.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.roomType}</td>
                                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden'>{item.amenities.join(', ')}</td>
                                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>{item.pricePerNight}</td>
                                    <td className='py-3 px-4 border-t border-gray-300 text-center text-sm'>
                                        <div className='flex items-center justify-center gap-4'>
                                            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                                <input type="checkbox" className="sr-only peer" onChange={() => toggleAvailability(item._id)} checked={item.isAvailable} />
                                                <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                                <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                            </label>
                                            <button onClick={() => deleteRoom(item._id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition-colors" title="Delete Room">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRoom