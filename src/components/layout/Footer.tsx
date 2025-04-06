import React from 'react';
import {HeartIcon, GithubIcon, TwitterIcon, InstagramIcon, Cherry} from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Kitchen Library</h2>
            <p className="text-gray-400 mt-1">
              Share your recipes with the world
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-teal-400 transition-colors">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Made with <HeartIcon className="inline h-4 w-4 text-red-500" /> by
            Tharushi Kawodya &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;