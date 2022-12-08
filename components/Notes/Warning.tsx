export default function Warning({
  title,
  description,
  showTitle,
}: {
  title?: string;
  description: string;
  showTitle?: boolean;
}) {
  return (
    <div className="bg-yellow-500 px-3 py-2 rounded-lg">
      {showTitle ? (
        <p className="text-md text-red-600 pb-1 font-bold">
          ⚠️ Warning: {title}
        </p>
      ) : (
        ""
      )}
      <p className="text-xs md:text-sm text-justify text-black font-medium">
        {description}
      </p>
    </div>
  );
}
