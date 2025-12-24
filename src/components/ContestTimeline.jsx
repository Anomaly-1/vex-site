import { useState } from "react";
import TimelineItem from "./TimelineItem";

export default function ContestTimeline({ contests, sectionId }) {
  const [activeId, setActiveId] = useState(null);
  return (
    <div 
      className="relative pl-10">
      {/* Vertical spine */}
      <div className="
        absolute left-4 top-0 bottom-0 w-px
        bg-gradient-to-b from-red-600/30 via-red-600 to-red-600/30
      " />
      <div className="flex flex-col gap-16">
        {contests.map((contest) => (
          <TimelineItem
            key={contest.id}
            contest={contest}
            active={activeId === contest.id}
            setActive={setActiveId}
            sectionId={sectionId}
          />
        ))}
      </div>
      
    </div>
  );
}
