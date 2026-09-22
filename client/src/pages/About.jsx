import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const values = [
    {
        title: "Uncompromising Quality",
        description: "Every hotel and villa on our platform undergoes a rigorous vetting process to ensure exceptional standards of cleanliness, comfort, and service.",
        icon: "✨"
    },
    {
        title: "Guest-First Philosophy",
        description: "From seamless one-click booking to flexible cancellation policies and 24/7 travel assistance, your peace of mind is our highest priority.",
        icon: "🤝"
    },
    {
        title: "Authentic Local Immersion",
        description: "We connect travelers with authentic regional experiences and hidden gems that mainstream travel agencies often overlook.",
        icon: "🌍"
    },
    {
        title: "Empowering Hoteliers",
        description: "We provide boutique hotel owners with powerful tools, automated management dashboards, and global reach to grow their hospitality business.",
        icon: "📈"
    }
];

const team = [
    {
        name: "Alexander Hayes",
        role: "Founder & Chief Executive",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    {
        name: "Elena Rostova",
        role: "Head of Guest Experience",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
    },
    {
        name: "Marcus Vance",
        role: "VP of Hotel Partnerships",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    }
];

const About = () => {
    const navigate = useNavigate();
    const { setShowHotelReg, isOwner } = useAppContext();

    return (
        <div className="pt-28 md:pt-36 pb-20 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
            {/* Header / Hero */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide uppercase">
                    Our Story & Mission
                </span>
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-900 mt-4 leading-tight">
                    Redefining Modern Hospitality
                </h1>
                <p className="text-gray-600 text-base md:text-lg mt-4 font-light leading-relaxed">
                    QuickStay was founded on a simple vision: to transform how the world experiences travel by connecting discerning guests with extraordinary stays and passionate hoteliers.
                </p>
            </div>

            {/* Story & Image Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop"
                        alt="Luxury resort interior"
                        className="rounded-3xl shadow-xl w-full h-[440px] object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden sm:block">
                        <p className="font-playfair text-3xl font-bold text-indigo-600">500,000+</p>
                        <p className="text-gray-500 text-xs mt-1">Delighted Guests Hosted</p>
                    </div>
                </div>
                <div>
                    <h2 className="font-playfair text-3xl md:text-4xl text-gray-900 font-semibold mb-6">
                        Where Comfort Meets Unforgettable Memories
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed mb-4">
                        Founded by travel enthusiasts and hospitality veterans, QuickStay was created to cut through the noise of cluttered travel booking portals. We believe in simplicity, transparent pricing, and handpicked excellence.
                    </p>
                    <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed mb-8">
                        Whether you are planning a serene beach getaway, a family vacation in a bustling metropolis, or listing your own hotel to reach travelers worldwide, QuickStay provides the platform, trust, and support every step of the way.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate('/rooms')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-full text-sm font-medium transition-all cursor-pointer shadow-md"
                        >
                            Explore Our Rooms
                        </button>
                        <button
                            onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}
                            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-7 py-3 rounded-full text-sm font-medium transition-all cursor-pointer"
                        >
                            {isOwner ? 'Owner Dashboard' : 'Partner with Us'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="mb-24">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="font-playfair text-3xl md:text-4xl text-gray-900 font-semibold">
                        What Drives Us Forward
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mt-2 font-light">
                        The fundamental principles behind every hotel we curate and every feature we build.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v, i) => (
                        <div
                            key={i}
                            className="bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 flex flex-col items-start"
                        >
                            <span className="text-3xl mb-4 p-3 bg-white rounded-xl shadow-xs">{v.icon}</span>
                            <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-2">
                                {v.title}
                            </h3>
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                {v.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Showcase */}
            <div className="mb-20">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="font-playfair text-3xl md:text-4xl text-gray-900 font-semibold">
                        Leadership Team
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mt-2 font-light">
                        Meet the minds dedicated to crafting exceptional travel journeys.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {team.map((member, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="font-playfair text-lg font-semibold text-gray-900">
                                {member.name}
                            </h3>
                            <p className="text-indigo-600 text-xs md:text-sm font-light mt-1">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
