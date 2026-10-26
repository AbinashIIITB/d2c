'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  badge,
  collapsible = false,
  defaultOpen = true,
  children,
}: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden transition-all">
      <div
        onClick={() => collapsible && setIsOpen(!isOpen)}
        className={`p-6 border-b border-gray-100 flex items-center justify-between ${
          collapsible ? 'cursor-pointer hover:bg-gray-50/50 select-none' : ''
        }`}
      >
        <div className="flex items-center gap-3.5">
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-d2c-royal/10 text-d2c-royal flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-sora font-bold text-d2c-navy">{title}</h3>
              {badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-d2c-gold/15 text-[#9e7604] uppercase tracking-wider">
                  {badge}
                </span>
              )}
            </div>
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
        </div>

        {collapsible && (
          <button
            type="button"
            className="text-gray-400 hover:text-d2c-navy p-1.5 rounded-lg transition-colors"
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      {isOpen && <div className="p-6 md:p-8 space-y-6">{children}</div>}
    </div>
  );
}
