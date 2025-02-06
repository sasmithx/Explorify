import React, { useState } from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import DateSelector from "../../components/Input/DateSelector";
import ImageSelector from "../../components/Input/ImageSelector";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [title, setTitle] = useState("");
  const [storyImg, setStoryImg] = useState(null);
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [visitedDate, setVisitedDate] = useState(null);

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
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector image={storyImg} setImg={setStoryImg} />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">STORY</label>
            <textarea
              type="text"
              className="p-2 text-sm rounded outline-none text-slate-950 bg-slate-50"
              placeholder="Your Story"
              rows={10}
              value={story}
              onChange={({ target }) => setStory(target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
