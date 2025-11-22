import { FaXmark } from "react-icons/fa6";

export default function Popup({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-[500px] relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="p-4 flex justify-between border-b border-[#ddd]">
          <p className="text-xl">{title}</p>
          <button className="bg-red-400 hover:bg-red-500 duration-300 text-white px-[5px] cursor-pointer flex justify-center items-center rounded" onClick={onClose}>
            <FaXmark />
          </button>
        </div>
        <div className="p-5 flex gap-5 flex-wrap">{children}</div>
      </div>
    </div>
  );
}
