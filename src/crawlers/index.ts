import { getStats as iStats } from "./ingatlan.com/stats";
import { getStats as jStats } from "./ingatlan.jofogas.com/stats";

export const ingatlanCom = {
  getStats: iStats,
};

export const jofogasHu = {
  getStats: jStats,
};
