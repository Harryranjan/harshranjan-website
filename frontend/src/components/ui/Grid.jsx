export default function Grid({
  children,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 6,
  className = "",
}) {
  const gapClasses = {
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
  };

  const colClasses = `grid-cols-${cols.default} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg}`;

  return (
    <div className={`grid ${colClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}
