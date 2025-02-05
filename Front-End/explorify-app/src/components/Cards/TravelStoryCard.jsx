import React from "react";
import { FaHeart } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";

const TravelStoryCard = ({
  imgUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="relative overflow-hidden transition-all ease-in-out bg-white border rounded-lg cursor-pointer hover:shadow-lg hover:shadow-slate-200">
      <img
        src={imgUrl}
        alt={title}
        className="object-cover w-full h-56 rounded-lg"
        onClick={onClick}
      />

      <button className="absolute flex items-center justify-center w-12 h-12 border rounded-lg border-white/30 bg-white/40 top-4 right-4" onClick={onFavouriteClick}>
        <FaHeart
          className={`icon-btn ${isFavourite ? "text-red-500" : "text-white"}`}
        />
      </button>

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {date ? moment(date).format("MMM Do YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-600">{story?.slice(0, 60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
          <GrMapLocation className="text-sm" />
          {visitedLocation.map((item, index) =>
            visitedLocation.length + 1 ? `${item}` : `${item}, `
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;