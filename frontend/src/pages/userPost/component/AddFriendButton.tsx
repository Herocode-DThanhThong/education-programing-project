interface Props {
  addFriend: () => void;
}
const AddFriendButton = ({ addFriend }: Props) => {
  return (
    <button
      onClick={() => {
        addFriend();
      }}
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
          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
        />
      </svg>

      <p className="text-sm">Thêm bạn</p>
    </button>
  );
};

export default AddFriendButton;
