import React from "react";
import { cn } from "@/lib/utils";

interface DashboardMetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

export const DashboardMetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: DashboardMetricCardProps) => {
  return (
    <div className={cn("bg-gradient-card border border-border rounded-xl shadow-card", className)}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">
                {value}
              </p>
              {trend && (
                <span
                  className={cn(
                    "text-sm font-semibold px-2 py-1 rounded-full",
                    trend.isPositive
                      ? "text-success bg-success-light"
                      : "text-destructive bg-destructive-light"
                  )}
                >
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="bg-primary/10 p-3 rounded-full">
              <div className="text-primary text-xl">
                {icon}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};