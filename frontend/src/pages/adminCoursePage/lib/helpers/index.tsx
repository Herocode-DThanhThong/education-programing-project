import { AuthorityType } from "types";

export function getOrderStatus(status: string) {
  switch (status) {
    case "PROGRESS":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
          {status.toLowerCase()}
        </span>
      );
    case "DONE":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
          {status.toLowerCase()}
        </span>
      );
    case "STARTED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
          {status.toLowerCase()}
        </span>
      );
    case "OUT_FOR_DELIVERY":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "DELIVERED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}

export const checkAdminRole = (authorities: AuthorityType[]) => {
  for (let i = 0; i < authorities.length; i++) {
    const element = authorities[i].name;
    if (element === "ROLE_ADMIN") return true;
  }
  return false;
};
