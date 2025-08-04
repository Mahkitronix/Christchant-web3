export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="mb-2 h-8 animate-pulse rounded bg-gray-300 shadow-lg"></div>
      <div className="mb-4 h-6 animate-pulse rounded bg-gray-300 shadow-md"></div>
      <div className="mb-4 h-6 animate-pulse rounded bg-gray-300 shadow-md"></div>
      <div className="mb-4 h-4 animate-pulse rounded bg-gray-300 shadow-sm"></div>
      <div className="mb-4 h-4 animate-pulse rounded bg-gray-300 shadow-sm"></div>
      <div className="shadow-xs mb-4 h-2 animate-pulse rounded bg-gray-300"></div>
      <div className="shadow-xs mb-4 h-2 animate-pulse rounded bg-gray-300"></div>
    </div>
  )
}
