function Skeleton() {
  return (
    <div className="border rounded-lg p-5 mx-10 mb-4 animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/5 mb-4"></div>

      <div className="flex gap-3">
        <div className="h-8 bg-gray-300 rounded w-24"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}
export default Skeleton;