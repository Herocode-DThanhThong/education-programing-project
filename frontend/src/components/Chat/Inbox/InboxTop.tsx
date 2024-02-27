import SearchMessenger from "./SearchMessenger";
import Setting from "./Setting";
interface Props {}

const InboxTop = (props: Props) => {
  return (
    <div className="px-2 py-2">
      {/* Title + Setting */}
      <Setting />
      {/* Search friend to chat with  */}
      <SearchMessenger />
    </div>
  );
};

export default InboxTop;
