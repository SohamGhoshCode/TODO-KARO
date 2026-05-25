import React from 'react';
import { FaListUl, FaClock, FaCheck, FaFlag } from 'react-icons/fa';

export default function DashboardCards({ counts }) {
  const cards = [
    {
      label: 'Total Tasks',
      value: counts.all,
      subText: 'All tasks',
      icon: FaListUl,
      color: 'text-indigo-400',
      iconBg: 'bg-indigo-500/15',
    },
    {
      label: 'Pending',
      value: counts.pending,
      subText: 'Tasks to do',
      icon: FaClock,
      color: 'text-yellow-400',
      iconBg: 'bg-yellow-500/15',
    },
    {
      label: 'Completed',
      value: counts.completed,
      subText: 'Tasks done',
      icon: FaCheck,
      color: 'text-green-400',
      iconBg: 'bg-green-500/15',
    },
    {
      label: 'High Priority',
      value: counts.high,
      subText: 'High priority tasks',
      icon: FaFlag,
      color: 'text-red-400',
      iconBg: 'bg-red-500/15',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className="glass-card border border-gray-800 rounded-2xl p-5 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-2px] hover:border-indigo-500/15 shadow-md"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.color}`}>
              <Icon className="text-lg" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block truncate">{card.label}</span>
              <span className="text-2xl font-extrabold text-white leading-none my-1.5 block">{card.value}</span>
              <span className="text-[11px] text-gray-500 font-medium block truncate">{card.subText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
