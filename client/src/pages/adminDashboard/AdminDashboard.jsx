import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardContent from './DashboardContent';
import ProductsPage from './ProductsPage';
import CategoriesPage from './CategoriesPage';
import ReviewsPage from './ReviewsPage';
import DeliveryTrackingPage from './DeliveryTrackingPage';
import AdminProfilePage from './AdminProfilePage';
import {
  ShoppingBag, BoxIcon, Tags, Truck, Star
} from 'lucide-react';

const pageMeta = {
  orders: { label: 'Orders', icon: ShoppingBag },
  products: { label: 'Products', icon: BoxIcon },
  categories: { label: 'Categories', icon: Tags },
  delivery: { label: 'Delivery Tracking', icon: Truck },
  reviews: { label: 'Reviews', icon: Star },
};

const EmptyPage = ({ pageKey }) => {
  const meta = pageMeta[pageKey];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <main className="flex-1 p-4 sm:p-7">
      <div className="mb-6">
        <h1 className="text-[1.6rem] font-bold tracking-tight">{meta.label}</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your {meta.label.toLowerCase()} here.</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 py-24">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(91,95,239,0.1)] text-[#5B5FEF] flex items-center justify-center mb-4">
          <Icon size={28} />
        </div>
        <h2 className="text-lg font-semibold text-gray-700 mb-1">{meta.label}</h2>
        <p className="text-sm text-gray-400">This section is coming soon.</p>
      </div>
    </main>
  );
};

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col md:ml-[260px] min-h-screen">
        <Topbar setSidebarOpen={setSidebarOpen} />
        {activeMenu === 'dashboard' && <DashboardContent />}
        {activeMenu === 'orders' && <DeliveryTrackingPage />}
        {activeMenu === 'products' && <ProductsPage />}
        {activeMenu === 'categories' && <CategoriesPage />}
        {activeMenu === 'reviews' && <ReviewsPage />}
        {activeMenu === 'delivery' && <DeliveryTrackingPage />}
        {activeMenu === 'profile' && <AdminProfilePage />}
        {!['dashboard', 'orders', 'products', 'categories', 'reviews', 'delivery', 'profile'].includes(activeMenu) && <EmptyPage pageKey={activeMenu} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
