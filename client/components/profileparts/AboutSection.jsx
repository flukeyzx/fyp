import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPen } from "lucide-react";

const AboutSection = ({ user }) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-card-foreground gap-2">
          <UserPen className="w-5 h-5 text-primary" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent>
        {user.bio ? (
          <p className="text-card-foreground/60">{user.bio}</p>
        ) : (
          <div className="text-foreground/50 italic">No bio added yet</div>
        )}

        {user.skills && user.skills.length > 0 && (
          <div className="space-y-2 mt-2">
            <h3 className="text-sm font-medium text-foreground">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutSection;
