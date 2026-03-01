import { SkeletonProps } from "@/types/skeleton";
import { Skeleton } from "./ui/skeleton";

const SkeletonSchema = (props: SkeletonProps) => {
  const { grid } = props;

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${grid} gap-4 px-2 xl:px-1`}>
      {Array.from({ length: grid }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="h-[280px] w-full rounded-xl bg-gray-200" />
          <Skeleton className="h-4 w-3/4 bg-gray-200" />
          <Skeleton className="h-4 w-1/2 bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonSchema;