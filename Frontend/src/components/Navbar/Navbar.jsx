import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_frontend/assets.js";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { DoctorsContext } from "../../store/store.jsx";

const Navbar = ({setIsAuthVisible}) => {
  const {token,logOut} = useContext(DoctorsContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-4 border-b border-gray-400">
        <div className="flex items-center gap-2">
          <Link to={'/'}>
            <img src={assets.logo} alt="Curemeet Logo" className="h-6 sm:h-10" />
          </Link>
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          <img src={assets.menu_icon} alt="Menu" className="h-6 w-6" />
        </button>

        <div className="hidden md:flex gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            <p className="text-sm font-bold">HOME</p>
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            <p className="text-sm font-bold">ALL DOCTORS</p>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            <p className="text-sm font-bold">ABOUT</p>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            <p className="text-sm font-bold">CONTACT</p>
          </NavLink>
        </div>

        <div className="hidden md:block">
          {token ? (
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img className="rounded-full h-10 w-10" src={assets.profile_pic} alt="Profile"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white mt-5">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={'/my-profile'}><DropdownMenuItem>My Profile</DropdownMenuItem></Link>
                  <Link to={'/my-appointments'}><DropdownMenuItem>My Appointments</DropdownMenuItem></Link>
                  <Link><DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem></Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
              <button 
              onClick={()=>setIsAuthVisible(true)}
              className="bg-primary text-sm text-white px-5 py-3 rounded-3xl hover:bg-primary/70">
                Create account
              </button>
          )}
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0  shadow-lg md:hidden z-50">
            <div className="flex flex-col p-4 gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-primary"
                }
                onClick={toggleMenu}
              >
                <p className="text-sm font-bold">HOME</p>
              </NavLink>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-primary"
                }
                onClick={toggleMenu}
              >
                <p className="text-sm font-bold">ALL DOCTORS</p>
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-primary"
                }
                onClick={toggleMenu}
              >
                <p className="text-sm font-bold">ABOUT</p>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-primary"
                }
                onClick={toggleMenu}
              >
                <p className="text-sm font-bold">CONTACT</p>
              </NavLink>
              {token ? (
                <>
                  <Link to={'/my-profile'} onClick={toggleMenu}>
                    <p className="text-sm font-bold">MY PROFILE</p>
                  </Link>
                  <Link to={'/my-appointments'} onClick={toggleMenu}>
                    <p className="text-sm font-bold">MY APPOINTMENTS</p>
                  </Link>
                  <button 
                    onClick={() => {
                      logOut
                      toggleMenu();
                    }}
                    className="text-sm font-bold text-left"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link to={'/login'} onClick={toggleMenu}>
                  <button className="bg-primary text-sm text-white px-5 py-3 rounded-3xl hover:bg-green-700 w-full">
                    Create account
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
