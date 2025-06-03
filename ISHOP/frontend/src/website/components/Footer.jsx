import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white text-sm text-gray-600 pt-12 pb-6 px-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 border-b pb-8">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-black">SWOO - 1ST NYC TECH ONLINE MARKET</h2>
          <div>
            <p className="text-xs">HOTLINE 24/7</p>
            <p className="text-2xl font-bold text-orange-500">(025) 3686 25 16</p>
          </div>
          <div className="text-sm text-black">
            <p>257 Thatcher Road St, Brooklyn, Manhattan, NY 10092</p>
            <p>contact@Swootechmart.com</p>
          </div>
          <div className="flex gap-3 pt-2">
            <div className="p-2 bg-gray-100 rounded-full"><FaTwitter /></div>
            <div className="p-2 bg-gray-100 rounded-full"><FaFacebookF /></div>
            <div className="p-2 bg-gray-100 rounded-full"><FaInstagram /></div>
            <div className="p-2 bg-gray-100 rounded-full"><FaYoutube /></div>
            <div className="p-2 bg-gray-100 rounded-full"><FaPinterestP /></div>
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="font-bold text-black mb-3">TOP CATEGORIES</h3>
          <ul className="space-y-1">
            <li>Laptops</li>
            <li>PC & Computers</li>
            <li>Cell Phones</li>
            <li>Tablets</li>
            <li>Gaming & VR</li>
            <li>Networks</li>
            <li>Cameras</li>
            <li>Sounds</li>
            <li>Office</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold text-black mb-3">COMPANY</h3>
          <ul className="space-y-1">
            <li>About Swoo</li>
            <li>Contact</li>
            <li>Career</li>
            <li>Blog</li>
            <li>Sitemap</li>
            <li>Store Locations</li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h3 className="font-bold text-black mb-3">HELP CENTER</h3>
          <ul className="space-y-1">
            <li>Customer Service</li>
            <li>Policy</li>
            <li>Terms & Conditions</li>
            <li>Track Order</li>
            <li>FAQs</li>
            <li>My Account</li>
            <li>Product Support</li>
          </ul>
        </div>

        {/* Partner */}
        <div>
          <h3 className="font-bold text-black mb-3">PARTNER</h3>
          <ul className="space-y-1">
            <li>Become Seller</li>
            <li>Affiliate</li>
            <li>Advertise</li>
            <li>Partnership</li>
          </ul>
        </div>
      </div>

      {/* Subscribe and Language */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b">
        {/* Language Selector */}
        <div className="flex gap-4">
          <div className="border rounded px-4 py-2 flex items-center gap-2">
            <span>USD</span>
            <FiChevronDown />
          </div>
          <div className="border rounded px-4 py-2 flex items-center gap-2">
            <img src="https://flagcdn.com/us.svg" className="w-5 h-4" alt="flag" />
            <span>Eng</span>
            <FiChevronDown />
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <p className="font-bold text-black mb-2">
            SUBSCRIBE & GET <span className="text-orange-500">10% OFF</span> FOR YOUR FIRST ORDER
          </p>
          <div className="flex border-b">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 outline-none py-2"
            />
            <button className="text-orange-500 font-semibold">SUBSCRIBE</button>
          </div>
          <p className="text-xs mt-2 italic">
            By subscribing, you’re accepted the our <a href="#" className="underline">Policy</a>
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-6 text-xs text-gray-500 gap-4">
        <p>© 2024 <span className="font-bold text-black">Shawonetc3</span>. All Rights Reserved</p>
        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" className="h-5" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" className="h-5" alt="Mastercard" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Stripe_Logo%2C_revised_2016.svg" className="h-5" alt="Stripe" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Klarna_Logo.svg" className="h-5" alt="Klarna" />
        </div>
        <a href="#" className="text-blue-500 hover:underline">Mobile Site</a>
      </div>
    </footer>
  );
};

export default Footer;
