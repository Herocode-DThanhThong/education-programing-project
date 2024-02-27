import CommentChildItem from "./CommentChildItem";
import CommentParentItem from "./CommentParentItem";

type Props = {};

const CommentItem = (props: Props) => {
  return (
    <div className="comment mb-4">
      {/* Parent comment */}
      <CommentParentItem />
      {/* Child comment */}
      <CommentChildItem />
    </div>
  );
};

export default CommentItem;
