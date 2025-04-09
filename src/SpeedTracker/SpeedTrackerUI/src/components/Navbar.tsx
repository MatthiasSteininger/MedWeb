import { FaHome } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
                              
  if (location.pathname === '/') {
    return <>
    </>
  }

  return (
    <nav className="bg-gray-800 w-full p-4 px-12 flex justify-between items-center h-auto">
      <div
        className="text-white text-2xl font-bold cursor-pointer hover:text-gray-300 flex items-center"
        onClick={() => navigate('/')}
      >    
        <FaHome /> 
      </div>
    </nav>
  );
}

export default Navbar;
