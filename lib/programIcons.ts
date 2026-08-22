import {
  HeartHandshake,
  Trophy,
  Mic2,
  UsersRound,
  Leaf,
  BookOpen,
  Activity,
  Shield,
  Globe2,
  Award,
  Lightbulb,
  Sparkles,
  Calendar,
  Compass,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { ProgramIconKey } from "@/config/initiatives";

const programIcons: Record<ProgramIconKey, LucideIcon> = {
  service: HeartHandshake,
  sports: Trophy,
  leadership: Mic2,
  fellowship: UsersRound,
  environment: Leaf,
  education: BookOpen,
  health: Activity,
  peace: Shield,
  globe: Globe2,
  award: Award,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  calendar: Calendar,
  compass: Compass,
  target: Target,
};

export function getProgramIcon(key: ProgramIconKey): LucideIcon {
  return programIcons[key] ?? HeartHandshake;
}
