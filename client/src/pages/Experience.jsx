import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const experiences = [
    {
        title: "Fine Dining & Culinary Journeys",
        description: "Savor exquisite multi-course meals prepared by world-renowned chefs, paired with sommelier-selected vintage wines in breathtaking settings.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
        badge: "Gastronomy"
    },
    {
        title: "Holistic Wellness & Spa Sanctuaries",
        description: "Recharge your mind and body with rejuvenating thermal baths, restorative oceanfront massages, and personalized holistic therapies.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
        badge: "Wellness"
    },
    {
        title: "Private Yacht & Island Excursions",
        description: "Charter private catamaran yachts to secluded turquoise coves, indulge in sunset champagne cruises, and explore untouched marine life.",
        image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop",
        badge: "Adventure"
    },
    {
        title: "Bespoke Concierge & Butler Service",
        description: "Experience effortless luxury with 24/7 dedicated butler service, priority reservations, and seamless luxury airport chauffeur transfers.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        badge: "VIP Service"
    },
    {
        title: "Infinity Pools & Private Cabanas",
        description: "Unwind in heated panoramic infinity pools overlooking majestic mountain vistas and azure coastlines with full cocktail service.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
        badge: "Leisure"
    },
    {
        title: "Intimate Celebrations & Galas",
        description: "Host unforgettable destination weddings, milestone celebrations, and private executive retreats tailored down to the finest detail.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
        badge: "Events"
    }
];

const highlights = [
    { number: "500+", label: "Handpicked Luxury Hotels" },
    { number: "99%", label: "Guest Satisfaction Rate" },
    { number: "24/7", label: "VIP Personal Concierge" },
    { number: "150+", label: "Destinations Worldwide" },
];

const Experience = () => {
    const navigate = useNavigate();
    const { setShowHotelReg, isOwner } = useAppContext();

    return (
        <div className="pt-28 md:pt-36 pb-20 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide uppercase">
                    The QuickStay Signature
                </span>
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-900 mt-4 leading-tight">
                    Unforgettable Experiences, Crafted for You
                </h1>
                <p className="text-gray-600 text-base md:text-lg mt-4 font-light leading-relaxed">
                    Beyond luxury accommodations, QuickStay curates immersive stays where every moment is designed with precision, elegance, and warm hospitality.
                </p>
            </div>

            {/* Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {experiences.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
                    >
                        <div className="relative h-60 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                                {item.badge}
                            </span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-playfair text-xl text-gray-900 font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm font-light leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/rooms')}
                                className="mt-6 text-sm text-indigo-600 font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer"
                            >
                                Explore Hotels <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Metrics Counter */}
            <div className="bg-gray-900 text-white rounded-3xl p-10 md:p-14 mb-20 shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
                    {highlights.map((stat, index) => (
                        <div key={index} className="pt-4 md:pt-0">
                            <p className="font-playfair text-4xl md:text-5xl font-bold text-indigo-400">
                                {stat.number}
                            </p>
                            <p className="text-gray-400 text-xs md:text-sm mt-2 font-light">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action Banner */}
            <div className="text-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-3xl p-10 md:p-14 shadow-lg flex flex-col items-center">
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold max-w-xl">
                    Ready to Embark on Your Next Luxury Getaway?
                </h2>
                <p className="text-indigo-100 text-sm md:text-base mt-3 max-w-md font-light">
                    Browse our collection of handpicked rooms and suites or list your property with QuickStay.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                    <button
                        onClick={() => navigate('/rooms')}
                        className="bg-white text-indigo-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-full transition-all shadow cursor-pointer text-sm"
                    >
                        Browse All Rooms
                    </button>
                    <button
                        onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}
                        className="border border-white/80 text-white hover:bg-white/10 font-medium px-8 py-3 rounded-full transition-all cursor-pointer text-sm"
                    >
                        {isOwner ? 'Go to Dashboard' : 'List Your Hotel'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Experience;
