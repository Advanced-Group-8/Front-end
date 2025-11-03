import { packByIdUrl } from "./base-url";
import getPackagesById from "./fetch/getPackagesById";

export const getPackStatus = (id: number, token: string) => {
  const pack = getPackagesById(packByIdUrl, id, token, "package by id");
  if (pack) {
    // the line below works even if it's marked red
    const packStatus = pack.status;
    return packStatus;
  }
};
