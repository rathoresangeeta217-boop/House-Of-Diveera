import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import SaleSection from './components/SaleSection';
import Categories from './components/Categories';
import BigDeals from './components/BigDeals';
import ShopByLifestyle from './components/ShopByLifestyle';
import ProductGrid from './components/ProductGrid';
import Testimonials from './components/Testimonials';
import VideoShowcase from './components/VideoShowcase';
import FullWidthBanner from './components/FullWidthBanner';
import SecondaryBanner from './components/SecondaryBanner';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import CollectionPage from './components/CollectionPage';
import ProductDetails from './components/ProductDetails';
import GiftsForHim from './components/GiftsForHim';
import GiftsForHer from './components/GiftsForHer';
import HampersPage from './components/HampersPage';
import TrackOrder from './components/TrackOrder';

function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Features />
      <SaleSection />
      <Categories />
      <BigDeals />
      <FullWidthBanner />
      <ShopByLifestyle />
      <ProductGrid />
      <Testimonials />
      <VideoShowcase />
      <SecondaryBanner />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <main className="min-h-screen bg-cream">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:categorySlug" element={<CollectionPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/gifts-for-him" element={<GiftsForHim />} />
          <Route path="/gifts-for-her" element={<GiftsForHer />} />
          <Route path="/hampers" element={<HampersPage />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
      </main>
    </Router>
  );
}
