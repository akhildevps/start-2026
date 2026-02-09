import React, { useEffect, useState } from 'react';
import { heroAPI, featureAPI, accommodationAPI, amenityAPI, bookingAPI, footerAPI, sectionAPI } from '../services/api';

export const CarouselSection = () => {
    const [items, setItems] = useState([]);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await sectionAPI.getByName('carousel');
                const section = res.data.data || {};
                const slides = (section.items || []).filter(i => !i.hidden).sort((a,b)=> (a.order||0)-(b.order||0));
                setItems(slides);
            } catch (err) {
                console.error('Error fetching carousel:', err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const prev = () => setActive((s) => (s - 1 + items.length) % items.length);
    const next = () => setActive((s) => (s + 1) % items.length);

    if (loading) return null;
    if (!items || items.length === 0) return null;

    return (
        <section id="carousel" className="py-4">
            <div id="animation-carousel" className="relative w-full" data-carousel="static">
                <div className="relative h-56 overflow-hidden rounded-base md:h-96">
                    {items.map((item, idx) => (
                        <div key={item._id || idx} className={`${idx === active ? '' : 'hidden'} duration-200 ease-linear`} data-carousel-item={idx === active ? 'active' : ''}>
                            <img src={item.imageUrl} alt={item.caption || ''} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" onError={(e)=>{e.target.style.display='none';}} />
                        </div>
                    ))}
                </div>
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prev} data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={next} data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </section>
    );
};

export const HeroSection = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await heroAPI.getAll();
                setHeroes(response.data.data);
            } catch (error) {
                console.error('Error fetching heroes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHeroes();
    }, []);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <section id="heroes" className="hero-section">
            <h1 className="text-4xl font-bold">Welcome to Sanctuary Cove</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {heroes.map((hero) => (
                    !hero.hidden && (
                        <div key={hero._id} className="card p-6 bg-white rounded-lg shadow">
                            {hero.imageUrl && (
                                <div className="mb-4">
                                    <img src={hero.imageUrl} alt={hero.title} className="w-full h-40 object-cover rounded" onError={(e)=>{e.target.style.display='none';}} />
                                </div>
                            )}
                            <h2 className="text-2xl font-bold">{hero.title}</h2>
                            <p className="text-gray-600 mt-2">{hero.subtitle}</p>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export const FeaturesSection = () => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await featureAPI.getAll();
                setFeatures(response.data.data);
            } catch (error) {
                console.error('Error fetching features:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatures();
    }, []);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <section id="features" className="py-12">
            <h2 className="text-3xl font-bold text-center">Resort Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {features.map((feature) => (
                    !feature.hidden && (
                        <div key={feature._id} className="card p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                            <div className="text-4xl mb-2">{feature.icon}</div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export const AccommodationsSection = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await accommodationAPI.getAll();
                setAccommodations(response.data.data);
            } catch (error) {
                console.error('Error fetching accommodations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAccommodations();
    }, []);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <section id="accommodations" className="py-12">
            <h2 className="text-3xl font-bold text-center">Luxury Accommodations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {accommodations.map((accommodation) => (
                    !accommodation.hidden && (
                        <div key={accommodation._id} className="card p-6 bg-white rounded-lg shadow">
                            {accommodation.imageUrl && (
                                <div className="mb-4">
                                    <img src={accommodation.imageUrl} alt={accommodation.type} className="w-full h-48 object-cover rounded" onError={(e)=>{e.target.style.display='none';}} />
                                </div>
                            )}
                            <h3 className="text-xl font-bold">{accommodation.type}</h3>
                            <p className="text-lg text-blue-600 mt-2">{accommodation.price}</p>
                            <p className="text-gray-600 mt-2">{accommodation.description}</p>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export const AmenitiesSection = () => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const response = await amenityAPI.getAll();
                setAmenities(response.data.data);
            } catch (error) {
                console.error('Error fetching amenities:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAmenities();
    }, []);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <section id="amenities" className="py-12">
            <h2 className="text-3xl font-bold text-center">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {amenities.map((amenity) => (
                    !amenity.hidden && (
                        <div key={amenity._id} className="card p-6 bg-white rounded-lg shadow">
                            {amenity.imageUrl && (
                                <div className="mb-4">
                                    <img src={amenity.imageUrl} alt={amenity.name} className="w-full h-40 object-cover rounded" onError={(e)=>{e.target.style.display='none';}} />
                                </div>
                            )}
                            <h3 className="text-xl font-bold">{amenity.name}</h3>
                            <p className="text-gray-600 mt-2">{amenity.description}</p>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export const BookingSection = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await bookingAPI.getAll();
                setBookings(response.data.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <section id="bookings" className="py-12">
            <h2 className="text-3xl font-bold text-center">Contact & Booking</h2>
            <div className="max-w-2xl mx-auto mt-8">
                {bookings.map((booking) => (
                    !booking.hidden && (
                        <div key={booking._id} className="card p-6 bg-white rounded-lg shadow">
                            <p className="text-gray-600">📧 Email: {booking.email}</p>
                            <p className="text-gray-600 mt-2">📞 Phone: {booking.phone}</p>
                            <p className="text-gray-600 mt-2">📍 Address: {booking.address}</p>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};
