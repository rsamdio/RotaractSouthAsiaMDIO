import {
  HeartHandshake,
  Trophy,
  Mic2,
  UsersRound,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import type { ProgramIconKey } from "@/config/initiatives";

const programIcons: Record<ProgramIconKey, LucideIcon> = {
  service: HeartHandshake,
  sports: Trophy,
  leadership: Mic2,
  fellowship: UsersRound,
  environment: Leaf,
};

export function getProgramIcon(key: ProgramIconKey): LucideIcon {
  return programIcons[key] ?? HeartHandshake;
}
