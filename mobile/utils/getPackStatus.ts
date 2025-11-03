import { url } from "./base-url";
import getPackageById from "./fetch/getPackageById";

export const getPackStatus = (id: number, token: string) => {
  const pack = getPackageById(url, id, token);
  if (pack) {
    // the line below works even if it's marked red
    const packStatus = pack.status;
    return packStatus;
  }
};
