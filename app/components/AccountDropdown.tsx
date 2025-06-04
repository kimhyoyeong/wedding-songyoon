import React, { useState } from 'react';

export default function AccountDropdown({
  label,
  accounts,
}: {
  label: string;
  accounts: { bank: string; number: string; name: string; pay?: boolean }[];
}) {
  const [open, setOpen] = useState(false);

  const handleCopy = (acc: { bank: string; number: string; name: string }) => {
    navigator.clipboard.writeText(`${acc.bank} ${acc.number} ${acc.name}`);
    alert('복사되었습니다.');
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between bg-[#faf8f7] px-4 py-3 text-[16px] font-medium text-[#524548]"
        style={{ borderRadius: 0 }}
      >
        {label}
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden bg-white transition-all duration-300 ease-in-out ${open ? 'max-h-[200px] translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0'} `}
        style={{ borderRadius: 0 }}
      >
        {accounts.map((acc, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between px-4 py-3 ${
              idx !== accounts.length - 1 ? 'border-b border-gray-100' : ''
            }`}
            style={{ borderRadius: 0 }}
          >
            <div className="text-left">
              <div className="text-[15px] text-[#524548]">
                {acc.bank} {acc.number}
              </div>
              <div className="text-[15px] text-gray-500">{acc.name}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(acc)}
                className="flex min-w-[72px] items-center gap-1 bg-gray-50 px-3 py-1 text-[14px] text-[#333] hover:bg-gray-100"
                style={{ borderRadius: 0 }}
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <rect x="3" y="3" width="13" height="13" rx="2" />
                </svg>
                복사
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
