import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(authActions.isLogout());
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="h-14 flex justify-evenly items-center bg-blue-500 font-semibold text-white">
      <h2 className="text-xl">Inspire2explore</h2>
      {isAuthenticated && (
        <ul className="flex w-96 justify-between items-center">
          <li>
            <NavLink to="/home" className="hover:text-gray-200 cursor-pointer">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className="hover:text-gray-200 cursor-pointer"
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" className="hover:text-gray-200 cursor-pointer">
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/connect"
              className="hover:text-gray-200 cursor-pointer"
            >
              Lets Connect
            </NavLink>
          </li>
          <button
            onClick={handleLogout}
            className="border p-1 rounded-sm cursor-pointer"
          >
            Logout
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
