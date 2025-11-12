'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        'flex w-full gap-2 overflow-x-auto border-b border-gray-200',
        className
      )}
      role="tablist"
      aria-label="Main navigation"
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            className={cn(
              'whitespace-nowrap px-3 py-2 text-sm font-medium transition',
              isActive
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            )}
            onClick={() => onChange(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
