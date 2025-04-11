import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAToken } from '../../redux/adminSlice';
import { FaUserCircle } from 'react-icons/fa';
import {assets} from '../../assets/assets_admin/assets.js'
const Navbar = () => {
    const {aToken} = useSelector((state)=>state.admin)
    const dispatch = useDispatch();

    const logoutHandler=()=>{
        dispatch(setAToken(''))
        localStorage.removeItem('aToken')
    }

    return (
        <div className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <img className="h-10" src={assets.admin_logo} alt="" />
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <FaUserCircle className="text-2xl text-gray-600" />
                            <span className="text-gray-700">Admin</span>
                        </div>
                        <button 
                            onClick={logoutHandler}
                            className="bg-green-600 hover:bg-green-400 text-white px-8 py-2 rounded-3xl"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
