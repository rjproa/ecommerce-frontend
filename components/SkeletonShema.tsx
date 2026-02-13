import { SkeletonProps } from "@/types/skeleton";
import { Skeleton } from "./ui/skeleton";


const SkeletonSchema = (props: SkeletonProps) => {
  const { grid } = props;

  return (
    Array.from({ length: grid }).map((_, index) => (
      <div key={index} className="flex flex-col gap-8 mx-auto space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-200" />
          <Skeleton className="h-4 w-[250px] bg-gray-200" />
        </div>
      </div>
    ))
  )
}

export default SkeletonSchema;