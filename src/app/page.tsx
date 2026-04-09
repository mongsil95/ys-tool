import Link from "next/link";

const calculators = [
  {
    href: "/calculators/chord-diameter",
    title: "원의 지름",
    description: "현의 길이와 수선의 길이로 원의 지름 계산",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="15" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="8" y1="14" x2="32" y2="14" stroke="#22d3ee" strokeWidth="1.8" />
        <line x1="20" y1="14" x2="20" y2="5" stroke="#a78bfa" strokeWidth="1.8" strokeDasharray="3,2" />
        <circle cx="20" cy="20" r="2" fill="#22d3ee" />
      </svg>
    ),
    tag: "기하",
  },
  {
    href: "/calculators/proximity-sensor",
    title: "근접센서 블럭 길이",
    description: "지름, 회전수, 응답속도로 최소 블럭 길이 계산",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="17" cy="22" r="12" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="17" cy="22" r="2.5" fill="#22d3ee" />
        <rect x="27" y="17" width="6" height="4" rx="1" fill="#a78bfa" opacity="0.85" />
        <rect x="34" y="16" width="4" height="6" rx="1" fill="#f59e0b" opacity="0.8" />
        <line x1="33" y1="19" x2="34" y2="19" stroke="#f59e0b" strokeWidth="1" strokeDasharray="1.5,1" />
      </svg>
    ),
    tag: "센서",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header className="px-5 pt-10 pb-6">
        <p className="text-xs font-medium tracking-widest text-[var(--text-secondary)] uppercase mb-1">
          YS Tool
        </p>
        <h1 className="text-2xl font-bold">계산기</h1>
      </header>

      {/* Calculator list */}
      <main className="flex-1 px-4 flex flex-col gap-3">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="flex items-center gap-4 rounded-2xl p-4 active:scale-[0.98] transition-transform"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{
                width: "56px",
                height: "56px",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              {calc.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-base">{calc.title}</span>
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(34,211,238,0.2)",
                  }}
                >
                  {calc.tag}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] truncate">
                {calc.description}
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-[var(--text-secondary)]"
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ))}
      </main>

      <footer className="px-5 py-6 text-center">
        <p className="text-xs text-[var(--text-secondary)]">
          계산기 추가 예정
        </p>
      </footer>
    </div>
  );
}
