import React from "react";
import { motion } from "framer-motion";
import { staggerItem } from "../utils/animations";

interface TimelineDataItem {
  year: string;
  title: string;
  description: string;
  tags?: string[];
}

interface TimelineItemProps {
  item: TimelineDataItem;
  isOdd: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = React.memo(
  ({ item, isOdd }) => {
    return (
      <motion.div
        variants={staggerItem}
        className={`group relative flex w-full items-center justify-center my-12 md:my-6 md:justify-between ${
          isOdd ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`hidden w-1/2 px-12 text-2xl font-bold md:block ${
            isOdd ? "text-left" : "text-right"
          }`}
        >
          {item.year}
        </div>
        <div className="hidden absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-indigo-500 dark:bg-indigo-400 transition-transform duration-300 group-hover:scale-150 md:block ring-4 ring-white dark:ring-slate-900" />
        <div className="w-full md:w-[calc(50%-3rem)]">
          <span className="block text-xl font-bold md:hidden mb-3 text-indigo-600 dark:text-indigo-400">
            {item.year}
          </span>
          <div className="glass-card p-5 transition-transform duration-300 group-hover:-translate-y-1">
            <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">{item.title}</h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="tech-badge">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

export default TimelineItem;
