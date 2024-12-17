import { AR } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={AR("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }