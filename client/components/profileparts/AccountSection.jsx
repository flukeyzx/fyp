import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Shield, Key, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AccountSection({
  user,
  isFreePlan,
  hasPassword,
  isPasswordChanging,
  setIsPasswordChanging,
  passwords,
  setPasswords,
  isPasswordUpdating,
  handlePasswordChange,
  handlePlanUpgrade,
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <UserCog className="w-5 h-5 text-primary" />
          Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground/70">Plan</h3>
              <p className="font-medium">
                {isFreePlan ? "Free Plan" : "Premium Plan"}
              </p>
            </div>
            {isFreePlan && (
              <Button
                onClick={handlePlanUpgrade}
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/80 hover:to-accent cursor-pointer text-accent-foreground"
              >
                Upgrade
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">AI Usage</span>
              <span>{user.apiCallsThisMonth}/5</span>
            </div>
            <progress
              value={(user.apiCallsThisMonth / 5) * 100}
              className="h-2 w-full"
            ></progress>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Job Applications</span>
              <span>{user.jobsAppliedThisMonth}/5</span>
            </div>
            <progress
              value={(user.jobsAppliedThisMonth / 5) * 100}
              className="h-2 w-full"
            ></progress>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-foreground/60" />
              <span className="font-medium">Password</span>
            </div>
            {!isPasswordChanging && (
              <Button
                size="sm"
                onClick={() => setIsPasswordChanging(true)}
                className="gap-2 bg-background text-foreground hover:bg-background/80 hover:opacity-90 cursor-pointer"
              >
                <Key className="w-4 h-4" />
                {hasPassword ? "Change" : "Set"}
              </Button>
            )}
          </div>

          {isPasswordChanging && (
            <div className="space-y-4">
              <Separator />
              <div className="grid gap-4">
                {hasPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      type="password"
                      id="current-password"
                      value={passwords.current}
                      placeholder="Enter current password"
                      className="!h-10"
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          current: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="new-password">
                    {hasPassword ? "New Password" : "Set Password"}
                  </Label>
                  <Input
                    type="password"
                    id="new-password"
                    value={passwords.new}
                    placeholder={
                      hasPassword ? "Create new password" : "Set your password"
                    }
                    className="!h-10"
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    Confirm {hasPassword ? "New " : ""}Password
                  </Label>
                  <Input
                    type="password"
                    id="confirm-password"
                    value={passwords.confirm}
                    placeholder={`Confirm ${hasPassword ? "new " : ""}password`}
                    className="!h-10"
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handlePasswordChange}
                  disabled={isPasswordUpdating}
                  className="flex-1 cursor-pointer"
                >
                  {isPasswordUpdating ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    "Update Password"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setIsPasswordChanging(false);
                    setPasswords({ current: "", new: "", confirm: "" });
                  }}
                  className="flex-1 bg-background text-foreground cursor-pointer hover:bg-background/80 hover:opacity-90"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
