interface Props {
  searchFriend: (inputValue: string) => void;
}

const SearchFriend = ({ searchFriend }: Props) => {
  return (
    <form className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={(e) => searchFriend(e.target.value)}
          type="search"
          id="default-search"
          className="block w-[490px] py-2 outline-none px-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
          placeholder="Tìm kiếm bạn bè theo tên"
          required
        />
      </div>
    </form>
  );
};

export default SearchFriend;
