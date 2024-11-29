import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-2xl border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none bg-custom-badge",
	{
		variants: {
			variant: {
				default: "border-transparent text-custom-default shadow capitalize",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground border border-custom-default bg-custom-badge-label-200 text-custom-default",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
