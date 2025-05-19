"use client";

import { MapPin, Users, Calendar, Type, Pencil } from "lucide-react";
import Link from "next/link";

export default function CompanyProfile({ company }) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="h-48 relative">
        <img
          src={company.banner}
          alt="Company Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-16 left-6">
          <div className="h-32 w-32 rounded-xl border-2 border-white overflow-hidden shadow-md">
            <img
              src={company.logo}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-20 px-6 pb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {company.name}
            </h1>
            <p className="text-muted-foreground text-sm">{company.industry}</p>
            {company.location && (
              <p className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {company.location}
              </p>
            )}
            {company.website && (
              <Link
                href={company.website}
                className="text-sm text-blue-500 opacity-80 hover:underline"
              >
                {company.website}
              </Link>
            )}
          </div>
          <Link
            href={`/dashboard/company/edit/${company.id}`}
            className="flex items-center px-4 py-2 bg-popover hover:bg-popover/80 rounded-lg text-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Company
          </Link>
        </div>

        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DetailCard
              icon={<Calendar className="text-rose-600" />}
              label="Founded at"
              value={company.foundedYear}
            />
            <DetailCard
              icon={<Type className="text-purple-600" />}
              label="Company Type"
              value={company.companyType}
            />

            <DetailCard
              icon={<Users className="text-cyan-600" />}
              label="Employees"
              value={company.employees}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">About</h2>
            <div className="rounded-xl bg-popover p-4 mt-2">
              <p className="text-muted-foreground">{company.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="bg-popover rounded-xl shadow-sm p-4 flex items-center space-x-4">
      <div className="">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}
