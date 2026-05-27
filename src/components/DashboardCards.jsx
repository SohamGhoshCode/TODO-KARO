import React from 'react';
import { FaListUl, FaClock, FaCheck, FaFlag } from 'react-icons/fa';

export default function DashboardCards({ counts }) {
  const cards = [
    {
      label: 'Total Tasks',
      value: counts.all,
      subText: 'All registered tasks',
      icon: FaListUl,
      color: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      border: 'border-l-4 border-l-indigo-400',
      valueBg: 'text-indigo-700',
    },
    {
      label: 'Pending',
      value: counts.pending,
      subText: 'Awaiting completion',
      icon: FaClock,
      color: 'text-amber-600',
      iconBg: 'bg-amber-100',
      border: 'border-l-4 border-l-amber-400',
      valueBg: 'text-amber-700',
    },
    {
      label: 'Completed',
      value: counts.completed,
      subText: 'Successfully done',
      icon: FaCheck,
      color: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      border: 'border-l-4 border-l-emerald-400',
      valueBg: 'text-emerald-700',
    },
    {
      label: 'High Priority',
      value: counts.high,
      subText: 'Needs urgent action',
      icon: FaFlag,
      color: 'text-red-500',
      iconBg: 'bg-red-100',
      border: 'border-l-4 border-l-red-400',
      valueBg: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${card.border}`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
              <Icon className={`text-base ${card.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{card.label}</p>
              <p className={`text-2xl font-extrabold leading-none my-1 ${card.valueBg}`}>{card.value}</p>
              <p className="text-[10px] text-gray-400 font-medium">{card.subText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
