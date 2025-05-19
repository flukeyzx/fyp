import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileProgress({ profileScore }) {
  const [visible, setVisible] = useState(true);

  console.log(profileScore);

  if (!visible || profileScore === 100) return null;

  let progressColor = "bg-red-500";
  let bgTrackColor = "bg-red-100";
  let badgeVariant = "outline";
  let statusMessage = "Your profile needs attention to attract employers.";
  let icon = <AlertCircle className="h-4 w-4 text-red-500" />;
  let textColor = "text-red-700";

  if (profileScore >= 50 && profileScore < 80) {
    progressColor = "bg-yellow-500";
    bgTrackColor = "bg-yellow-100";
    statusMessage =
      "You're halfway there. Add more details to improve your profile.";
    icon = <Info className="h-4 w-4 text-yellow-600" />;
    textColor = "text-yellow-700";
  } else if (profileScore >= 80) {
    progressColor = "bg-green-500";
    bgTrackColor = "bg-green-100";
    badgeVariant = "default";
    statusMessage = "Great job! Your profile is almost complete.";
    icon = <CheckCircle className="h-4 w-4 text-green-600" />;
    textColor = "text-green-700";
  }

  return (
    <Card className="relative flex border rounded-xl shadow-md overflow-hidden min-h-[170px]">
      <div className="w-1 absolute inset-0 bg-gradient-to-b from-violet-600 via-blue-500 to-sky-400" />

      <div className="flex-1 px-8 space-y-4">
        <CardHeader className="p-0 flex flex-row items-start justify-between">
          <CardTitle className="text-lg font-semibold text-primary">
            Profile Completion
          </CardTitle>
          <button
            onClick={() => setVisible(false)}
            className="text-muted-foreground hover:text-foreground transition"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 cursor-pointer" />
          </button>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-full border shadow-sm",
                  profileScore < 50 && "border-red-200 bg-red-50",
                  profileScore >= 50 &&
                    profileScore < 80 &&
                    "border-yellow-200 bg-yellow-50",
                  profileScore >= 80 && "border-green-200 bg-green-50"
                )}
              >
                {icon}
              </div>
              <p className={cn("text-sm font-medium leading-snug", textColor)}>
                {statusMessage}
              </p>
            </div>
            <Badge variant={badgeVariant} className="text-sm py-1 px-2">
              {profileScore}%
            </Badge>
          </div>

          <div className={cn("h-3 w-full rounded-full", bgTrackColor)}>
            <div
              className={cn(
                "h-3 rounded-full transition-all duration-500",
                progressColor
              )}
              style={{ width: `${profileScore}%` }}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
