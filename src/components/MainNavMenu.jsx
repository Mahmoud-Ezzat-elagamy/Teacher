import { IoLogOut } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { logoutApi } from "../../services/apiUser";

function MainNavMenu({
  isMenuOpen,
  handleCloseMenu,
  isLogin,
  setIsMenuOpen,
  isAdmin,
}) {
  const baseLinkClass =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200";

  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    `${baseLinkClass} ${
      isActive
        ? "bg-primary-800 text-white"
        : "text-primary-50 hover:bg-primary-800 hover:text-white"
    }`;

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout API error:", err);
      // Clear local storage even if API call fails
      localStorage.removeItem("user");
      localStorage.removeItem("sessionToken");
    } finally {
      handleCloseMenu();
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white"
          onClick={handleCloseMenu}
        >
          <Logo width={36} className="inline-block" />
          <span className="hidden sm:inline">Teacher</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-primary-50 transition-colors hover:bg-primary-800 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/courses"
            className={getLinkClass}
            onClick={handleCloseMenu}
          >
            Courses
          </NavLink>
          {!isLogin ? (
            <>
              <NavLink
                to="/login"
                className={getLinkClass}
                onClick={handleCloseMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-100"
                onClick={handleCloseMenu}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/account"
                className={getLinkClass}
                onClick={handleCloseMenu}
              >
                Account
              </NavLink>
              {/* :TODO handle logout */}
              <NavLink
                to="/login"
                className={getLinkClass}
                onClick={handleLogout}
              >
                <IoLogOut className="text-xl" />
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/dashboard"
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-100"
                  onClick={handleCloseMenu}
                >
                  Dashboard
                </NavLink>
              )}
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default MainNavMenu;
