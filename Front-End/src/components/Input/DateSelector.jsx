import React, { useState } from "react";
import { MdOutlineDateRange, MdClose } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-200/40 hover:bg-sky-200/70 rounded px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true);
        }}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format("DD MMM YYYY")
          : moment().format("DD MMM YYYY")}
      </button>

      {openDatePicker && (
        <div className="relative p-5 overflow-y-scroll rounded-lg bg-sky-50/80 pt-9">
          <button
            className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-100 top-2 right-2"
            onClick={() => {
              setOpenDatePicker(false);
            }}
          >
            <MdClose className="text-xl text-sky-600" />
          </button>

          <DayPicker
            captionLayout="dropdown-buttons"
            mode="single"
            selected={date}
            onSelect={setDate}
            pagedNavigation
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
