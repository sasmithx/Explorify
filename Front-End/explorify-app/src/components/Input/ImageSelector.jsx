// import React, { useRef, useState } from "react";
// import { useEffect } from "react";
// import { FaRegFileImage } from "react-icons/fa";
// //import { MdDeleteOutline } from "react-icons/md";

// const ImageSelector = ({ image, setImage }) => {
//   const inputRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const onChooseFile = () => {
//     inputRef.current.click();
//   };

//   useEffect(() => {
//     //If the image prop is a string (URL), set it as the preview URL
//     if (typeof image === "string") {
//       setPreviewUrl(image);
//     } else if (image) {
//       //If the image prop is a File object, create a preview URL
//       setPreviewUrl(URL.createObjectURL(image));
//     }else{
//       //If there is no image, clear the preview URL
//       setPreviewUrl(null); 
//     }
//     return () => {
//       if(previewUrl && typeof previewUrl === 'string' && !image ){
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [image]);

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {!image ? (
//         <button
//           className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
//           onClick={() => onChooseFile()}
//         >
//           <div className="flex items-center justify-center border rounded-full w-14 h-14 bg-cyan-50 border-cyan-100">
//             <FaRegFileImage className="text-xl text-cyan-500" />
//           </div>

//           <p className="text-sm text-slate-500">Browse image files to upload</p>
//         </button>
//       ) : (
//         <div className="relative w-full">
//           <img src={previewUrl} alt="Selected" className="" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageSelector;


import React, { useRef, useState, useEffect } from "react";
import { FaRegFileImage } from "react-icons/fa";

const ImageSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      // Clean up the object URL to avoid memory leaks
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <button
          className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
          onClick={onChooseFile}
        >
          <div className="flex items-center justify-center border rounded-full w-14 h-14 bg-cyan-50 border-cyan-100">
            <FaRegFileImage className="text-xl text-cyan-500" />
          </div>
          <p className="text-sm text-slate-500">Browse image files to upload</p>
        </button>
      ) : (
        <div className="relative w-full">
          <img
            src={previewUrl}
            alt="Selected Preview"
            className="object-cover w-full h-[220px] rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
