import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DoctorsContext } from "../../store/store";

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(DoctorsContext);

  const relatedDoctors = doctors.filter(
    (item) => item.speciality == speciality && item._id != docId
  );

  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-gray-600">Related Doctors</h2>
      <div className="grid grid-cols-4 my-10 gap-10">
        {relatedDoctors.map((item, index) => (
          <Link
            key={index}
            onClick={() => scrollTo(0, 0)}
            to={`/appointment/${item._id}`}
          >
            <div
              className="p-4 bg-[#E6FDFB] shadow-md rounded-lg hover:-translate-y-3 transition-all ease-linear transition-300"
              onClick={() => navigate(`/appointment/${item._id}`)}
            >
              <div className="">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className=" flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-500">Available</span>
              </div>
              <h3 className="text-xl font-bold mt-1">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
