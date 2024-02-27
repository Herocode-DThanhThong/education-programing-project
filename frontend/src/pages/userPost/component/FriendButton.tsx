import { useState } from "react";

interface FriendButton {
  deleteFriend: () => void;
}

const FriendButton = ({ deleteFriend }: FriendButton) => {
  // States
  const [toggleCancelFriendBtn, setToggleCancelFriendBtn] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => {
          setToggleCancelFriendBtn(!toggleCancelFriendBtn);
        }}
        type="button"
        className="flex items-center gap-2 p-2 bg-blue-500 hover:bg-blue-400 rounded-md text-white transition-all ease-in-out"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>

        <p className="text-sm">Bạn bè</p>
      </button>
      {toggleCancelFriendBtn && (
        <div className="absolute z-10 inline-block w-32 text-sm text-gray-500 transition-opacity duration-300 border border-gray-200 rounded-lg shadow-sm ">
          <button
            onClick={() => {
              deleteFriend();
            }}
            className="text-sm w-full h-full px-3 py-2 bg-gray-200 hover:opacity-80 border text-black rounded-md"
          >
            Xóa bạn
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendButton;
