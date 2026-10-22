// Thin wrapper around lucide-react for consistent sizing
import {
  BookOpen, Wrench, Sparkles, Code2, Globe, Brain, Cpu,
  Trophy, Zap, FlaskConical, Monitor, Binary, Satellite,
  Mail, ArrowUp, Palette, Users, Camera,
  Sun, Moon, Laptop, X, ExternalLink, Eye,
  ChevronRight, ArrowRight, GitBranch,
  FileText, Download, Check, Clock, Phone, Database,
} from 'lucide-react';

export const Icons = {
  BookOpen, Wrench, Sparkles, Code2, Globe, Brain, Cpu,
  Trophy, Zap, FlaskConical, Monitor, Binary, Satellite,
  Mail, ArrowUp, Palette,
  // Social icon replacements (lucide-react removed branded icons)
  Github: GitBranch,      // GitHub → Git branch icon
  Linkedin: Users,        // LinkedIn → Users icon
  Instagram: Camera,      // Instagram → Camera icon
  Sun, Moon, Laptop, X, ExternalLink, Eye,
  ChevronRight, ArrowRight,
  FileText, Download, Check, Clock, Phone, Database,
} as const;

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 18, className }: IconProps) {
  const Comp = Icons[name];
  return <Comp size={size} className={className} />;
}
