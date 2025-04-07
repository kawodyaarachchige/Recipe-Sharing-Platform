import React from 'react';
import {
  HeartIcon,
  GithubIcon,
  TwitterIcon,
  InstagramIcon,
  ChefHat,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Utensils,
  BookOpen,
  Users,
  Coffee
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Footer = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const quickLinks = [
    { name: 'Popular Recipes', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Recipe Collections', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Community', icon: <Users className="w-4 h-4" /> },
    { name: 'About Us', icon: <Coffee className="w-4 h-4" /> },
  ];

  return (
      <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} pt-16 pb-8`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <ChefHat className={`h-8 w-8 mr-2 ${isDarkMode ? 'text-[#D96115]' : 'text-[#BB5312]'}`} />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Kitchen Library
                </h2>
              </div>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Empowering home chefs with delicious recipes and culinary inspiration. Join our community of food lovers!
              </p>
              <div className="flex space-x-4">
                {[GithubIcon, TwitterIcon, InstagramIcon].map((Icon, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`p-2 rounded-full transition-all duration-300 ${
                            isDarkMode
                                ? 'bg-gray-800 hover:bg-[#D96115] text-white'
                                : 'bg-white hover:bg-[#D96115] text-gray-600 hover:text-white'
                        } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                        aria-label={`Social link ${index + 1}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                          href="#"
                          className={`flex items-center space-x-2 group transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-400 hover:text-[#D96115]' : 'text-gray-600 hover:text-[#BB5312]'
                          }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5" />, text: 'hello@kitchenlibrary.com' },
                  { icon: <Phone className="w-5 h-5" />, text: '+94 123 456 789' },
                  { icon: <MapPin className="w-5 h-5" />, text: 'Sri Lanka , Matara' },
                ].map((item, index) => (
                    <li key={index} className={`flex items-center space-x-3 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                  <span className={isDarkMode ? 'text-[#D96115]' : 'text-[#BB5312]'}>
                    {item.icon}
                  </span>
                      <span>{item.text}</span>
                    </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Newsletter
              </h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Subscribe to get the latest recipes and cooking tips!
              </p>
              <form className="space-y-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                        isDarkMode
                            ? 'bg-gray-800 text-white focus:ring-[#D96115]'
                            : 'bg-white text-gray-900 focus:ring-[#BB5312]'
                    }`}
                />
                <button
                    type="submit"
                    className={`w-full px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                        isDarkMode
                            ? 'bg-[#D96115] hover:bg-[#BB5312] text-white'
                            : 'bg-[#BB5312] hover:bg-[#D96115] text-white'
                    }`}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={`pt-8 mt-8 border-t ${
              isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Made with <HeartIcon className="inline h-4 w-4 text-[#D96115] mx-1" /> by
                Tharushi Kawodya &copy; {new Date().getFullYear()}
              </p>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:underline">Terms of Service</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:underline">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;