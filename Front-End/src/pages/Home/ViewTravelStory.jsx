import moment from "moment";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdDeleteOutline, MdClose, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 p-2 rounded-l-lg bg-cyan-50/50">
            <button className="btn-small" onClick={onEditClick}>
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>

            <button className="btn-small btn-delete" onClick={onDeleteClick}>
              <MdDeleteOutline className="text-lg" /> DELETE STORY
            </button>

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col flex-1 gap-2 py-4">
          <h1 className="text-2xl text-slate-950">
            {storyInfo?.title || "No Title Provided"}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo?.visitedDate
                ? moment(storyInfo.visitedDate).format("Do MMM YYYY")
                : "No Date Provided"}
            </span>

            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1">
              <GrMapLocation className="text-sm" />
              <span className="text-sm text-slate-600">
                {storyInfo?.visitedLocation?.length
                  ? storyInfo.visitedLocation.join(", ")
                  : "No Locations Provided"}
              </span>
            </div>
          </div>
        </div>
        <img
          src={storyInfo && storyInfo.imageUrl}
          alt="Selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
            <p className="text-sm leading-6 text-justify whitespace-pre-line text-slate-950">{storyInfo.story}</p>
        </div>    
      </div>
    </div>
  );
};

export default ViewTravelStory;
