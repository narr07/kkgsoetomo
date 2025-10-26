import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-primary-50 dark:bg-primary-700 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
