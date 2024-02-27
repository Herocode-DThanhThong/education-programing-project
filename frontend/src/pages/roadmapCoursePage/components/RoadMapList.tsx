import { StudyPathType } from "types";
import RoadMapItem from "./RoadMapItem";

type Props = {
  routePaths: StudyPathType[];
};

const RoadMapList = ({ routePaths }: Props) => {
  return (
    <div className="grid grid-cols-2">
      {routePaths.map((path, _) => (
        <RoadMapItem key={path.id} routePath={path} />
      ))}
    </div>
  );
};

export default RoadMapList;
