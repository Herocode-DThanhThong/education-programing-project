interface Props {
  acceptFriendInvitation: () => void;
  declineFriendRequest: () => void;
}
const AcceptFriendRequestButton = ({
  acceptFriendInvitation,
  declineFriendRequest,
}: Props) => {
  return (
    <>
      <button
        onClick={() => {
          acceptFriendInvitation();
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
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>

        <p className="text-sm">Chấp nhận</p>
      </button>

      <button
        onClick={() => {
          declineFriendRequest();
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
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>

        <p className="text-sm">Từ chối</p>
      </button>
    </>
  );
};

export default AcceptFriendRequestButton;
