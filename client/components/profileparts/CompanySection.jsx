import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Pencil } from "lucide-react";

const CompanySection = ({ company, onEditCompany }) => {
  if (!company) return null;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Your Company
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onEditCompany}>
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center overflow-hidden">
            {company.logo ? (
              <img
                src={company.logo}
                alt="Company Logo"
                className="object-cover w-full h-full"
              />
            ) : (
              <Building2 className="w-6 h-6 text-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{company.name}</h3>
            <p className="text-sm text-foreground/60">{company.industry}</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-foreground/60" />
            <span>{company.location || "Location not specified"}</span>
          </div>

          {company.about && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-foreground/89 mb-1">
                About
              </h4>
              <p className="text-sm text-foreground/60 line-clamp-3">
                {company.about}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySection;
