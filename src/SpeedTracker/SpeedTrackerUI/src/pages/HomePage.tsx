import React, { useState } from 'react';

const HomePage = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the App!</h1>
      <p className="text-lg text-gray-600">
        Navigate to the table or grid view using the navigation bar.
      </p>
      <button onClick={() => setCount(count + 1)}>Count {count}</button>
    </div>
  );
};

export default HomePage;