import { StudyPathType } from "types";

type Props = {
  routePath: StudyPathType;
};

const RoadMapItem = ({ routePath }: Props) => {
  return (
    <>
      <div className="px-4 py-2">
        <h1 className="text-left font-bold text-2xl tracking-wide">
          {routePath.title}
        </h1>
        <p className="my-2 text-left text-gray-600 text-sm">
          Để có cái nhìn tổng quan về những hướng đi của ngành lập trình - bạn
          kham khảo những nội dung này nhé
        </p>
        <div className="mt-4">
          <div
            className="comment max-w-sm list leading-10"
            dangerouslySetInnerHTML={{ __html: routePath.description }}
          />
        </div>
      </div>
    </>
  );
};

export default RoadMapItem;
