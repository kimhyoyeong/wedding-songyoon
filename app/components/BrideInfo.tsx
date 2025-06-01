import React from 'react';

export default function BrideInfo({ father, mother }: { father: string; mother: string }) {
  return (
    <div className="mt-1 text-[13px] text-[#89757a]">
      <span className="font-semibold">부</span> {father}&nbsp;&nbsp;
      <span className="font-semibold">모</span> {mother}
    </div>
  );
}
