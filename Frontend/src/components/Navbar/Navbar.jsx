import React, { useState } from "react";
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

const Navbar = ({isVisible,setIsVisible}) => {
  const [token, setToken] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-4 border-b border-gray-400">
        <div className="flex items-center gap-2">
          <Link to={'/'}>
            <img src={assets.logo} alt="Prescripto Logo" className="h-6 sm:h-8" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          <img src={assets.menu_icon} alt="Menu" className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
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

        {/* Desktop Auth Section */}
        <div className="hidden md:block">
          {token ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img className="rounded-full h-10 w-10" src={assets.profile_pic} alt="Profile"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={'/my-profile'}><DropdownMenuItem>My Profile</DropdownMenuItem></Link>
                  <Link to={'/my-appointments'}><DropdownMenuItem>My Appointments</DropdownMenuItem></Link>
                  <Link><DropdownMenuItem onClick={()=>setToken(false)}>Logout</DropdownMenuItem></Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
              <button 
              onClick={()=>setIsVisible(true)}
              className="bg-primary text-sm text-white px-5 py-3 rounded-3xl hover:bg-blue-700">
                Create account
              </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden z-50">
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
                      setToken(false);
                      toggleMenu();
                    }}
                    className="text-sm font-bold text-left"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link to={'/login'} onClick={toggleMenu}>
                  <button className="bg-primary text-sm text-white px-5 py-3 rounded-3xl hover:bg-blue-700 w-full">
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
