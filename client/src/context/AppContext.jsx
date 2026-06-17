import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth()

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [searchedCities, setSearchedCities] = useState([]); // max 3 recent searched cities

    const facilityIcons = {
        "Free WiFi": assets.freeWifiIcon,
        "Free Breakfast": assets.freeBreakfastIcon,
        "Room Service": assets.roomServiceIcon,
        "Mountain View": assets.mountainIcon,
        "Pool Access": assets.poolIcon,
    };

    const fetchUser = async (retryCount = 0) => {
        try {
            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities)
            } else if (retryCount < 3) {
                // Retry max 3 times (for new email/password signups needing DB sync)
                setTimeout(() => fetchUser(retryCount + 1), 2000);
            }
        } catch (error) {
            console.error("fetchUser error:", error.message);
        }
    }

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms')
            if (data.success) {
                // Extra safety: filter out any rooms with a null/missing hotel reference
                const validRooms = (data.rooms || []).filter(room => room && room.hotel && room._id);
                setRooms(validRooms)
            } else {
                console.error("fetchRooms failed:", data.message);
            }
        } catch (error) {
            console.error("fetchRooms error:", error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const value = {
        currency, navigate,
        user, getToken,
        isOwner, setIsOwner,
        axios,
        showHotelReg, setShowHotelReg,
        facilityIcons,
        rooms, setRooms,
        searchedCities, setSearchedCities
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );

};

export const useAppContext = () => useContext(AppContext);