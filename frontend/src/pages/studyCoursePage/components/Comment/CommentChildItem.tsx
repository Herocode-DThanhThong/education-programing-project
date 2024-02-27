type Props = {};

const CommentChildItem = (props: Props) => {
  return (
    <div className="flex gap-2 ml-10">
      {/* Avatar default */}
      <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          className="absolute w-10 h-10 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* Avatar default */}
      {/* Content */}
      <div className="">
        <div className="p-4 bg-white shadow-lg max-w-[374px] rounded-md">
          <h3 className="text-left font-semibold">Thành Thông</h3>
          <p className="text-left">Bài này có vẻ hơi kh hiểu nhỉ</p>
        </div>
        <div className="flex gap-2">
          <p className="text-sm mt-2 hover:opacity-80 cursor-pointer">
            Chỉnh sửa
          </p>
          <p className="text-sm mt-2 hover:opacity-80 cursor-pointer">Xóa</p>
        </div>
      </div>
      {/* Content */}
    </div>
  );
};

export default CommentChildItem;
