type Props = {};

const PostNotFound = (props: Props) => {
  return (
    <div className="flex gap-2">
      <div className="mt-1">
        <svg
          className="w-5 h-5 font-bold"
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
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </div>
      <div className="">
        <h3 className="font-semibold">Nội dung này hiện không có sẵn</h3>
        <p className="text-sm">
          Khi điều này xảy ra, thường là do chủ sở hữu chỉ chia sẻ nó với một
          nhóm nhỏ người, thay đổi những người có thể xem nó hoặc nó đã bị xóa
        </p>
      </div>
    </div>
  );
};

export default PostNotFound;
