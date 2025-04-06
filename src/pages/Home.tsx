import React from 'react';


import { BookOpenIcon } from 'lucide-react';
const Home = () => {

  return <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
          <BookOpenIcon className="mr-2" />
          Kitchen Library
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome to the Kitchen Library!
        </p>
      </div>

    </div>;
};
export default Home;