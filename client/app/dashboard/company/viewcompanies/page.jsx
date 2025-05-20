"use client";
import { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  ArrowRight,
  Zap,
  BadgeCheck,
} from "lucide-react";

const dummyCompanies = [
  {
    id: "1",
    name: "TechNova",
    about: "Innovative tech solutions for modern businesses",
    logo: "/company-logos/tech-nova.png",
    industry: "Technology",
    location: "San Francisco, CA",
    employees: 250,
    foundedYear: "2015",
    companyType: "Product",
    specialities: ["React", "Node.js", "GraphQL"],
    jobsPostedThisMonth: 12,
  },
  {
    id: "2",
    name: "DesignHub",
    about: "Creative design agency focused on user experiences",
    logo: "/company-logos/design-hub.png",
    industry: "Design",
    location: "New York, NY",
    employees: 80,
    foundedYear: "2018",
    companyType: "Service",
    specialities: ["Figma", "UX", "UI"],
    jobsPostedThisMonth: 5,
  },
  {
    id: "3",
    name: "GreenSolutions",
    about: "Sustainable technology for a better future",
    logo: "/company-logos/green-solutions.png",
    industry: "Sustainability",
    location: "Portland, OR",
    employees: 120,
    foundedYear: "2016",
    companyType: "Product",
    specialities: ["Python", "Django", "AI"],
    jobsPostedThisMonth: 8,
  },
];

const CompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const userSkills = ["React", "Node.js", "UI"];

  const filteredCompanies = dummyCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const matchingCompanies = dummyCompanies.filter((company) =>
    company.specialities?.some((skill) => userSkills.includes(skill))
  );

  const renderCompanyCard = (company) => (
    <div
      key={company.id}
      className="group rounded-2xl bg-background border border-muted hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center overflow-hidden border">
          <img
            src={company.logo}
            alt={company.name}
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
            {company.name}
          </h3>
          <p className="text-sm text-muted-foreground">{company.industry}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-foreground">
        <span className="inline-flex items-center px-3 py-1 bg-muted rounded-full">
          <MapPin className="w-3 h-3 mr-1" />
          {company.location}
        </span>
        <span className="inline-flex items-center px-3 py-1 bg-muted rounded-full">
          <Users className="w-3 h-3 mr-1" />
          {company.employees}+ employees
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {company.about}
      </p>
      <div className="flex justify-between items-center pt-2">
        <span className="text-sm font-medium text-primary">
          {company.jobsPostedThisMonth} New jobs open
        </span>
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
          View <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Featured Employers
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Discover <span className="text-primary">Innovative</span> Companies
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find organizations that align with your career goals
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-2xl w-full mx-auto mb-16"
      >
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:shadow-xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 px-6 pr-12 text-gray-700 dark:text-gray-200 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500"
              aria-label="Search companies input"
            />
            <Search
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={20}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-medium py-4 px-6 transition-all duration-300 hover:shadow-lg"
            aria-label="Search button"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredCompanies.map(renderCompanyCard)}
      </div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium mb-4">
          <BadgeCheck className="w-4 h-4" />
          Companies Matching Your Skills
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Based on your <span className="text-primary">Skills</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matchingCompanies.map(renderCompanyCard)}
      </div>
    </div>
  );
};

export default CompaniesPage;
