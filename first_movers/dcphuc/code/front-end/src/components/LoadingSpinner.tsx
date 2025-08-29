export function LoadingSpinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
      <div className="text-lg text-gray-600">{message}</div>
      <div className="text-sm text-gray-400 mt-2">
        Please wait while we fetch data from the Sui blockchain
      </div>
    </div>
  );
}
