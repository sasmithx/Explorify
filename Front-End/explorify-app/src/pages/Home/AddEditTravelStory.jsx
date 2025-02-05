import React from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const handleAddOrUpdateClick = () => {};

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 p-2 rounded-l-lg bg-cyan-50/50">
            {type === "add" ? (
              <button className="btn-small" onClick={() => {}}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </button>
              </>
            )}

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col flex-1 gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl outline-none text-slate-950"
            placeholder="A Day At The Great Wall Of China"
          />

          <div className="my-3">
            <DateSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
