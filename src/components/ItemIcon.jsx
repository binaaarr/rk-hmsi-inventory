import React from 'react';
import {
  Mic,
  Tv as Projector,
  Presentation,
  Printer,
  LayoutGrid as Table,
  Archive,
  Lamp,
  Square,
  Clock,
  Box,
  Package,
  Coffee as CupSoda,
  Database as Cylinder,
  Flame,
  Layers,
  BoxSelect,
  Disc,
  PenTool,
  Cpu,
  Image as Frame,
  Droplet,
  Award,
  FileText,
  MessageSquare,
  ShieldAlert,
  Flag,
  Book,
  Zap,
  Gift,
  Camera,
  Compass,
  Video,
  ShoppingBag,
  Coffee,
  HelpCircle
} from 'lucide-react';

const ICON_MAP = {
  Mic,
  Projector,
  Presentation,
  Printer,
  Table,
  Archive,
  Lamp,
  Square,
  Clock,
  Box,
  Package,
  CupSoda,
  Cylinder,
  Flame,
  Layers,
  BoxSelect,
  Disc,
  PenTool,
  Cpu,
  Frame,
  Droplet,
  Award,
  FileText,
  MessageSquare,
  ShieldAlert,
  Flag,
  Book,
  Zap,
  Gift,
  Camera,
  Compass,
  Video,
  ShoppingBag,
  Coffee
};

export default function ItemIcon({ name, className = "w-6 h-6", category = "" }) {
  const IconComponent = ICON_MAP[name] || Box;

  let bgGradient = 'from-blue-500/10 to-indigo-500/10 text-blue-600';
  if (category.includes('Elektronik')) bgGradient = 'from-blue-500/15 to-sky-500/15 text-blue-600';
  else if (category.includes('Konsumsi')) bgGradient = 'from-emerald-500/15 to-teal-500/15 text-emerald-600';
  else if (category.includes('Fasilitas')) bgGradient = 'from-amber-500/15 to-orange-500/15 text-amber-600';
  else if (category.includes('Proker')) bgGradient = 'from-purple-500/15 to-pink-500/15 text-purple-600';
  else if (category.includes('Atribut') || category.includes('Merchandise')) bgGradient = 'from-rose-500/15 to-pink-500/15 text-rose-600';
  else if (category.includes('Kesehatan')) bgGradient = 'from-red-500/15 to-rose-500/15 text-red-600';

  return (
    <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${bgGradient} flex items-center justify-center shrink-0`}>
      <IconComponent className={className} />
    </div>
  );
}
