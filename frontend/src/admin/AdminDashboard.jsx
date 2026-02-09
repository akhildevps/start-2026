import React, { useEffect, useState } from 'react';
import { heroAPI, featureAPI, accommodationAPI, amenityAPI, bookingAPI, footerAPI, uploadAPI, sectionAPI, masterConfigAPI } from '../services/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [heroes, setHeroes] = useState([]);
    const [features, setFeatures] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [footers, setFooters] = useState([]);
    const [carousel, setCarousel] = useState(null);
    const [sections, setSections] = useState([]);
    const [masterConfig, setMasterConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        if (successMsg) {
            setTimeout(() => setSuccessMsg(''), 3000);
        }
    }, [successMsg]);

    useEffect(() => {
        if (masterConfig?.tabName) {
            document.title = masterConfig.tabName;
            // Set favicon if iconUrl exists
            if (masterConfig.iconUrl) {
                let link = document.querySelector("link[rel~='icon']");
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.head.appendChild(link);
                }
                link.href = masterConfig.iconUrl;
            }
        }
    }, [masterConfig?.tabName, masterConfig?.iconUrl]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [heroRes, featureRes, accomRes, amenRes, bookRes, footerRes, sectionsRes] = await Promise.all([
                heroAPI.getAll(),
                featureAPI.getAll(),
                accommodationAPI.getAll(),
                amenityAPI.getAll(),
                bookingAPI.getAll(),
                footerAPI.getAll(),
                sectionAPI.getAll(),
            ]);
            
            setHeroes(heroRes.data.data || []);
            setFeatures(featureRes.data.data || []);
            setAccommodations(accomRes.data.data || []);
            setAmenities(amenRes.data.data || []);
            setBookings(bookRes.data.data || []);
            setFooters(footerRes.data.data || []);
            setSections(sectionsRes.data.data || []);

            // Fetch carousel section specifically
            try {
                const carouselRes = await sectionAPI.getByName('carousel');
                setCarousel(carouselRes.data.data || null);
            } catch (e) {
                setCarousel(null);
            }

            // Fetch master config
            try {
                const cfgRes = await masterConfigAPI.get();
                setMasterConfig(cfgRes.data.data || null);
            } catch (e) {
                setMasterConfig(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveMasterConfig = async () => {
        try {
            const payload = {
                siteName: masterConfig?.siteName,
                tabName: masterConfig?.tabName,
                footerName: masterConfig?.footerName,
                iconUrl: masterConfig?.iconUrl,
                menuTabs: masterConfig?.menuTabs,
            };
            const res = await masterConfigAPI.update(payload);
            setMasterConfig(res.data.data || res.data);
            setSuccessMsg('Configuration saved!');
        } catch (err) {
            console.error('Error saving config:', err);
            alert('Error saving config: ' + (err?.response?.data?.message || err.message));
        }
    };

    const resetForm = () => {
        setFormData({});
        setEditingId(null);
        setShowAddModal(false);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                // Update
                switch (activeTab) {
                    case 'carousel':
                        await sectionAPI.updateItem('carousel', editingId, formData);
                        break;
                    case 'heroes':
                        await heroAPI.update(editingId, formData);
                        break;
                    case 'features':
                        await featureAPI.update(editingId, formData);
                        break;
                    case 'accommodations':
                        await accommodationAPI.update(editingId, formData);
            setSuccessMsg('Visibility toggled!');
                        break;
                    case 'amenities':
                        await amenityAPI.update(editingId, formData);
                        break;
                    case 'bookings':
                        await bookingAPI.update(editingId, formData);
                        break;
                    case 'footers':
                        await footerAPI.update(editingId, formData);
                        break;
                    default:
                        break;
                }
                setSuccessMsg('Item updated successfully!');
            } else {
                // Create
                switch (activeTab) {
                    case 'carousel':
                        // require imageUrl for carousel slides
                        if (!formData || !formData.imageUrl) {
                            throw new Error('Carousel slide requires an image URL or uploaded image');
                        }
                        await sectionAPI.createItem('carousel', formData);
                        break;
                    case 'heroes':
                        await heroAPI.create(formData);
                        break;
                    case 'features':
                        await featureAPI.create(formData);
                        break;
                    case 'accommodations':
                        await accommodationAPI.create(formData);
                        break;
                    case 'amenities':
                        await amenityAPI.create(formData);
                        break;
                    case 'bookings':
                        await bookingAPI.create(formData);
                        break;
                    case 'footers':
                        await footerAPI.create(formData);
                        break;
                    default:
                        break;
                }
                setSuccessMsg('Item added successfully!');
            }
            resetForm();
            fetchAllData();
        } catch (error) {
            console.error('Error saving item:', error);
            const serverMsg = error?.response?.data?.message;
            alert('Error saving item: ' + (serverMsg || error.message));
        }
    };

    const handleToggleVisibility = async (section, id) => {
        try {
            switch (section) {
                case 'carousel':
                    // find current and toggle
                    try {
                        const cur = (carousel && carousel.items) ? carousel.items.find(i => i._id === id) : null;
                        const nextHidden = cur ? !cur.hidden : false;
                        await sectionAPI.updateItem('carousel', id, { hidden: nextHidden });
                    } catch (e) {
                        console.error('Error toggling carousel item:', e);
                    }
                    break;
                case 'heroes':
                    await heroAPI.toggleVisibility(id);
                    break;
                case 'features':
                    await featureAPI.toggleVisibility(id);
                    break;
                case 'accommodations':
                    await accommodationAPI.toggleVisibility(id);
                    break;
                case 'amenities':
                    await amenityAPI.toggleVisibility(id);
                    break;
                case 'bookings':
                    await bookingAPI.toggleVisibility(id);
                    break;
                case 'footers':
                    await footerAPI.toggleVisibility(id);
                    break;
                default:
                    break;
            }
            fetchAllData();
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    const handleDelete = async (section, id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        try {
            switch (section) {
                case 'carousel':
                    await sectionAPI.deleteItem('carousel', id);
                    break;
                case 'heroes':
                    await heroAPI.delete(id);
                    break;
                case 'features':
                    await featureAPI.delete(id);
                    break;
                case 'accommodations':
                    await accommodationAPI.delete(id);
                    break;
                case 'amenities':
                    await amenityAPI.delete(id);
                    break;
                case 'bookings':
                    await bookingAPI.delete(id);
                    break;
                case 'footers':
                    await footerAPI.delete(id);
                    break;
                default:
                    break;
            }
            setSuccessMsg('Item deleted successfully!');
            fetchAllData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditingId(item._id);
        setShowAddModal(true);
    };

    const getCurrentData = () => {
        switch (activeTab) {
            case 'carousel': return (carousel && carousel.items) ? carousel.items : [];
            case 'heroes': return heroes;
            case 'features': return features;
            case 'accommodations': return accommodations;
            case 'amenities': return amenities;
            case 'bookings': return bookings;
            case 'footers': return footers;
            default: return [];
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Loader Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-700 flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-white text-lg font-semibold">Loading Admin Panel...</p>
                        <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
                    </div>
                </div>
            )}
            {/* Navigation */}
            <nav className="bg-gray-800 text-white sticky top-0 z-40 shadow-lg border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-3xl font-bold text-yellow-500">⚙️ Admin</h1>
                        <a href="/" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">Back to Site</a>
                    </div>
                </div>
            </nav>

            {/* Success Message */}
            {successMsg && (
                <div className="bg-green-500 text-white p-3 text-center sticky top-16 z-30">
                    {successMsg}
                </div>
            )}

            {/* Admin Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 bg-gray-800 p-4 rounded-lg border border-gray-700">
                    {['home','carousel','heroes', 'features', 'accommodations', 'amenities', 'bookings', 'footers', 'sections'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-semibold rounded transition ${
                                activeTab === tab
                                    ? 'bg-yellow-500 text-black'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Add Button */}
                {activeTab !== 'home' && activeTab !== 'sections' && (
                <div className="mb-6">
                    <button
                        onClick={() => {
                            setFormData({});
                            setEditingId(null);
                            setShowAddModal(true);
                        }}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition"
                    >
                        ➕ Add New {activeTab.slice(0, -1).toUpperCase()}
                    </button>
                </div>
                )}

                {/* Content */}
                {activeTab === 'home' ? (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Home Configuration</h2>
                        <div className="space-y-4">
                            <label className="block text-sm text-gray-300">Site Name</label>
                            <input type="text" value={masterConfig?.siteName || ''} onChange={(e)=> setMasterConfig({...masterConfig, siteName: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
                            <label className="block text-sm text-gray-300">Browser Tab Name</label>
                            <input type="text" value={masterConfig?.tabName || ''} onChange={(e)=> setMasterConfig({...masterConfig, tabName: e.target.value})} placeholder="e.g., Sanctuary Cove Admin" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
                            <label className="block text-sm text-gray-300">Site Icon URL (Favicon)</label>
                            <input type="text" value={masterConfig?.iconUrl || ''} onChange={(e)=> setMasterConfig({...masterConfig, iconUrl: e.target.value})} placeholder="https://example.com/icon.png" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
                            {masterConfig?.iconUrl && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-400 mb-2">Icon Preview:</p>
                                    <img src={masterConfig.iconUrl} alt="Icon preview" className="w-10 h-10 rounded border border-gray-600" onError={(e)=>{e.target.style.display='none';}} />
                                </div>
                            )}
                            <label className="block text-sm text-gray-300">Footer Name</label>
                            <input type="text" value={masterConfig?.footerName || ''} onChange={(e)=> setMasterConfig({...masterConfig, footerName: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
                            <label className="block text-sm text-gray-300">Menu Tabs (comma separated)</label>
                            <input type="text" value={(masterConfig?.menuTabs || []).join(',')} onChange={(e)=> setMasterConfig({...masterConfig, menuTabs: e.target.value.split(',').map(s=>s.trim())})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
                            <div className="pt-2 flex gap-2">
                                <button onClick={saveMasterConfig} className="px-4 py-2 bg-green-600 text-white rounded">Save Config</button>
                                <button onClick={() => fetchAllData()} className="px-4 py-2 bg-gray-600 text-white rounded">Refresh</button>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'sections' ? (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <h3 className="text-lg text-white mb-4">Section Management</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(masterConfig?.sections || []).map(sec => (
                                <div key={sec.name} className={`p-4 border rounded-lg transition ${sec.hidden ? 'bg-red-900 border-red-500' : 'bg-gray-750 border-gray-600'}`}>
                                    <div className="space-y-3">
                                        {/* Section Name Header */}
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-white font-bold uppercase text-sm">{sec.name}</h4>
                                            {/* Toggle Switch */}
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={!sec.hidden}
                                                    onChange={async (e) => {
                                                        await masterConfigAPI.updateSection(sec.name, { hidden: !e.target.checked });
                                                        fetchAllData();
                                                    }}
                                                    className="sr-only"
                                                />
                                                <div className={`w-12 h-6 rounded-full transition-colors ${!sec.hidden ? 'bg-green-600' : 'bg-red-600'}`}>
                                                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${!sec.hidden ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                                                </div>
                                                <span className="ml-2 text-xs font-semibold text-white">
                                                    {!sec.hidden ? 'Show' : 'Hide'}
                                                </span>
                                            </label>
                                        </div>

                                        {/* Section Title */}
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={sec.displayName || ''}
                                                onChange={(e) => {
                                                    const updated = masterConfig.sections.map(s => 
                                                        s.name === sec.name ? {...s, displayName: e.target.value} : s
                                                    );
                                                    setMasterConfig({...masterConfig, sections: updated});
                                                }}
                                                placeholder="e.g., Contact & Booking"
                                                className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-xs"
                                            />
                                        </div>

                                        {/* Menu Name */}
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Menu Name</label>
                                            <input
                                                type="text"
                                                value={sec.menuName || ''}
                                                onChange={(e) => {
                                                    const updated = masterConfig.sections.map(s => 
                                                        s.name === sec.name ? {...s, menuName: e.target.value} : s
                                                    );
                                                    setMasterConfig({...masterConfig, sections: updated});
                                                }}
                                                placeholder="e.g., Booking"
                                                className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-xs"
                                            />
                                        </div>

                                        {/* Save Button */}
                                        <button
                                            onClick={async () => {
                                                await masterConfigAPI.updateSection(sec.name, { 
                                                    displayName: sec.displayName,
                                                    menuName: sec.menuName,
                                                    hidden: sec.hidden
                                                });
                                                setSuccessMsg(`${sec.name} section updated!`);
                                                fetchAllData();
                                            }}
                                            className="w-full mt-3 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition"
                                        >
                                            💾 Save Changes
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        {getCurrentData().length === 0 ? (
                            <p className="text-gray-400 text-center py-8">No items yet. Click "Add New" to create one.</p>
                        ) : (
                            <div className="grid gap-4">
                                {getCurrentData().map((item) => (
                                    <ItemCard
                                        key={item._id}
                                        item={item}
                                        section={activeTab}
                                        onToggle={() => handleToggleVisibility(activeTab, item._id)}
                                        onEdit={() => handleEdit(item)}
                                        onDelete={() => handleDelete(activeTab, item._id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <AddEditModal
                    section={activeTab}
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSave}
                    onClose={resetForm}
                    isEditing={!!editingId}
                />
            )}
        </div>
    );
};

// Item Card Component
const ItemCard = ({ item, section, onToggle, onEdit, onDelete }) => {
    const getDisplayInfo = () => {
        switch (section) {
            case 'carousel':
                return { title: item.caption || 'Slide', subtitle: item.link || '' };
            case 'heroes':
                return { title: item.title, subtitle: item.subtitle };
            case 'features':
                return { title: `${item.icon} ${item.title}`, subtitle: item.description };
            case 'accommodations':
                return { title: item.type, subtitle: `$${item.price}/night - ${item.description}` };
            case 'amenities':
                return { title: item.name, subtitle: item.description };
            case 'bookings':
                return { title: item.email, subtitle: `${item.phone} - ${item.address}` };
            case 'footers':
                return { title: item.title, subtitle: item.url };
            default:
                return { title: 'Item', subtitle: '' };
        }
    };

    const { title, subtitle } = getDisplayInfo();

    return (
        <div className={`p-4 border rounded-lg transition ${item.hidden ? 'bg-gray-700 opacity-60 border-red-500' : 'bg-gray-750 border-gray-600'}`}>
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
                    {item.imageUrl && <p className="text-gray-500 text-xs mt-2">🖼️ {item.imageUrl}</p>}
                </div>
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={onToggle}
                        className={`px-3 py-2 rounded text-sm font-semibold transition ${
                            item.hidden
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                        {item.hidden ? '👁️ Show' : '🙈 Hide'}
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold transition"
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

// Add/Edit Modal Component
const AddEditModal = ({ section, formData, setFormData, onSave, onClose, isEditing }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const getFormFields = () => {
        switch (section) {
            case 'carousel':
                return ['imageUrl', 'caption', 'link', 'order'];
            case 'heroes':
                return ['title', 'subtitle', 'imageUrl'];
            case 'features':
                return ['icon', 'title', 'description'];
            case 'accommodations':
                return ['type', 'price', 'description', 'imageUrl'];
            case 'amenities':
                return ['name', 'description', 'imageUrl'];
            case 'bookings':
                return ['email', 'phone', 'address'];
            case 'footers':
                return ['title', 'url'];
            default:
                return [];
        }
    };

    const getImageFields = () => {
        const allFields = getFormFields();
        return allFields.includes('imageUrl');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadError('');

        try {
            const response = await uploadAPI.uploadImage(file);
            if (response.data.success) {
                setFormData({ ...formData, imageUrl: response.data.imageUrl });
                setUploadError('');
            }
        } catch (error) {
            setUploadError('Failed to upload image. Please try again.');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const fields = getFormFields();
    const hasImageField = getImageFields();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-t-lg">
                    <h2 className="text-2xl font-bold text-black">
                        {isEditing ? '✏️ Edit' : '➕ Add New'} {section.slice(0, -1).toUpperCase()}
                    </h2>
                </div>

                <div className="p-6 space-y-4">
                    {fields.map((field) => {
                        // Skip imageUrl field as it's handled separately
                        if (field === 'imageUrl') return null;

                        return (
                            <div key={field}>
                                <label className="block text-sm font-semibold text-gray-300 mb-2 capitalize">
                                    {field}
                                </label>
                                {field === 'description' ? (
                                    <textarea
                                        value={formData[field] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                        placeholder={`Enter ${field}`}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                                        rows="3"
                                    />
                                ) : field === 'price' ? (
                                    <input
                                        type="number"
                                        value={formData[field] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                        placeholder={`Enter ${field}`}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={formData[field] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                        placeholder={`Enter ${field}`}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                                    />
                                )}
                            </div>
                        );
                    })}

                    {/* Image Upload Section */}
                    {hasImageField && (
                        <div className="border-t border-gray-600 pt-4 mt-4">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                🖼️ Image Upload
                            </label>
                            
                            {/* File Upload Input */}
                            <div className="mb-3">
                                <label className="block w-full px-3 py-2 bg-gray-700 border-2 border-dashed border-gray-600 rounded cursor-pointer hover:border-yellow-500 transition text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                        className="hidden"
                                    />
                                    <span className="text-gray-300 text-sm">
                                        {uploading ? '⏳ Uploading...' : '📤 Click to upload or drag image'}
                                    </span>
                                </label>
                                {uploadError && <p className="text-red-400 text-xs mt-1">{uploadError}</p>}
                            </div>

                            {/* Or Input URL Manually */}
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Or paste image URL:</label>
                                <input
                                    type="text"
                                    value={formData.imageUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-xs"
                                />
                            </div>

                            {/* Image Preview */}
                            {formData.imageUrl && (
                                <div className="mt-3">
                                    <img 
                                        src={formData.imageUrl} 
                                        alt="Preview" 
                                        className="w-full h-40 object-cover rounded border border-gray-600" 
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3EImage Error%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-gray-600">
                        <button
                            onClick={onSave}
                            disabled={uploading}
                            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition disabled:opacity-50"
                        >
                            ✅ {isEditing ? 'Update' : 'Add'}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={uploading}
                            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition disabled:opacity-50"
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
