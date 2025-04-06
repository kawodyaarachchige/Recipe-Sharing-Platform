import React from 'react';
import { HeartIcon, GithubIcon, TwitterIcon, InstagramIcon, ChefHat } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Footer = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-12 shadow-inner`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <ChefHat className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-[#D96115]' : 'text-[#BB5312]'}`} />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Kitchen Library
                </h2>
              </div>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Share your culinary creations with the world
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex space-x-4">
                <a
                    href="#"
                    className={`p-2 rounded-full transition-colors ${
                        isDarkMode
                            ? 'text-[#D96115] hover:text-[#D96115] hover:bg-gray-700'
                            : 'text-[#D96115] hover:text-[#D96115] hover:bg-slate-100'
                    }`}
                    aria-label="GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                    href="#"
                    className={`p-2 rounded-full transition-colors ${
                        isDarkMode
                            ? 'text-[#D96115] hover:text-[#D96115] hover:bg-gray-700'
                            : 'text-[#D96115] hover:text-[#D96115] hover:bg-slate-100'
                    }`}
                    aria-label="Twitter"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a
                    href="#"
                    className={`p-2 rounded-full transition-colors ${
                        isDarkMode
                            ? 'text-[#D96115] hover:text-[#D96115] hover:bg-gray-700'
                            : 'text-[#D96115] hover:text-[#D96115] hover:bg-slate-100'
                    }`}
                    aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-8 pt-8 text-center ${
              isDarkMode ? 'border-t border-[#D96115]' : 'border-t border-[#BB5312]'
          }`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Made with <HeartIcon className="inline h-4 w-4 text-[#D96115] mx-1" /> by
              Tharushi Kawodya &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;