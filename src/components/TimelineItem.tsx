import React from "react";

interface TimelineDataItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineItemProps {
  item: TimelineDataItem;
  isOdd: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = React.memo(
  ({ item, isOdd }) => {
    return (
      <div
        className={`group relative flex w-full items-center justify-center my-12 md:my-6 md:justify-between ${
          isOdd ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Date for desktop view */}
        <div
          className={`hidden w-1/2 px-12 text-2xl font-bold md:block ${
            isOdd ? "text-left" : "text-right"
          }`}
        >
          {item.year}
        </div>

        {/* Center dot */}
        <div className="hidden absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-black dark:bg-white transition-transform duration-300 group-hover:scale-150 md:block" />

        {/* Timeline content */}
        <div className="w-full md:w-[calc(50%-3rem)]">
          {/* Date for mobile view */}
          <span className="block text-xl font-bold md:hidden mb-3">
            {item.year}
          </span>

          <div className="card transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
            <div className="p-4">
              <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
              <p className="text-base leading-relaxed">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default TimelineItem;