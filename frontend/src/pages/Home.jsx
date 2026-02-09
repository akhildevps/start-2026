import React, { useEffect, useState } from 'react';
import { masterConfigAPI } from '../services/api';
import { CarouselSection, HeroSection, FeaturesSection, AccommodationsSection, AmenitiesSection, BookingSection } from '../components/PageComponents';

const Home = () => {
    const [masterConfig, setMasterConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await masterConfigAPI.get();
                setMasterConfig(res.data.data || res.data);
            } catch (err) {
                console.error('Error fetching master config:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    useEffect(() => {
        if (masterConfig?.tabName) {
            document.title = masterConfig.tabName;
        }
        if (masterConfig?.iconUrl) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = masterConfig.iconUrl;
        }
    }, [masterConfig?.tabName, masterConfig?.iconUrl]);

    const getSection = (name) => masterConfig?.sections?.find(s => s.name === name);
    const isSectionHidden = (name) => getSection(name)?.hidden || false;
    const getSectionDisplayName = (name) => getSection(name)?.displayName || name.charAt(0).toUpperCase() + name.slice(1);

    const siteName = masterConfig?.siteName || 'Sanctuary Cove';
    const footerName = masterConfig?.footerName || 'Sanctuary Cove Footer';

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="sticky top-0 bg-white shadow-lg z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-blue-600">{siteName}</h1>
                        <div className="flex space-x-4">
                            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
                            {masterConfig?.sections?.map(section => (
                                !section.hidden && !section.hideFromMenu && (
                                    <a
                                        key={section.name}
                                        href={`#${section.name}`}
                                        className="text-gray-700 hover:text-blue-600"
                                    >
                                        {section.menuName || section.displayName || section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                                    </a>
                                )
                            ))}
                            <a href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded">Admin</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Carousel Section (first) */}
            {!isSectionHidden('carousel') && <CarouselSection />}

            {/* Hero Section */}
            {!isSectionHidden('heroes') && <HeroSection />}

            {/* Features Section */}
            {!isSectionHidden('features') && <FeaturesSection />}

            {/* Accommodations Section */}
            {!isSectionHidden('accommodations') && <AccommodationsSection />}

            {/* Amenities Section */}
            {!isSectionHidden('amenities') && <AmenitiesSection />}

            {/* Booking Section */}
            {!isSectionHidden('bookings') && <BookingSection />}

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center">&copy; 2026 {footerName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
