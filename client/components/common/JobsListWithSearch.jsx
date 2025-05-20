"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import locationsList from "@/public/data/locations";
import JobCard from "@/components/common/JobsCard";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/apis";
import { useToken } from "@/context/TokenContext";
import LoadingSpinner from "../ui/loader";
import currencies from "@/public/data/currencies";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const predefinedFilters = [
  { name: "search", label: "Software Engineer", value: "Software Engineer" },
  {
    name: "search",
    label: "Frontend Developer",
    value: "Frontend Developer",
  },
  { name: "search", label: "Backend Developer", value: "Backend Developer" },
  {
    name: "search",
    label: "Full Stack Developer",
    value: "Full Stack Developer",
  },
  { name: "search", label: "DevOps Engineer", value: "DevOps Engineer" },
  {
    name: "search",
    label: "Mobile App Developer",
    value: "Mobile App Developer",
  },
  { name: "search", label: "Data Scientist", value: "Data Scientist" },
  { name: "search", label: "Video Editor", value: "Video Editor" },
  { name: "search", label: "Graphics Editor", value: "Graphics Editor" },
  { name: "search", label: "Product Manager", value: "Product Manager" },
  { name: "search", label: "UI/UX Designer", value: "UI/UX Designer" },
];

const jobTypeList = ["Remote", "On-site", "Hybrid"];
const experienceOptions = ["Fresher", "Mid", "Senior", "Lead"];

const FilterTag = ({ label, onClick, onClear, isActive, isRemovable }) => (
  <div
    className={` flex items-center gap-2 px-4 py-2 rounded-lg text-xs cursor-pointer ${
      isActive
        ? "bg-primary-light text-primary"
        : "bg-card dark:bg-muted dark:text-muted-foreground"
    }`}
    onClick={!isActive ? onClick : undefined}
  >
    <span>{label}</span>
    {isActive && (
      <span
        onClick={onClear}
        className="text-primary hover:text-white text-base leading-none cursor-pointer"
      >
        &times;
      </span>
    )}
  </div>
);

export default function JobsListWithSearch() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  useEffect(() => {
    if (queryParam) {
      setSearchInput(queryParam);
      const searchFilter = {
        name: "search",
        label: queryParam,
        value: queryParam,
      };
      addFilter(searchFilter, "url");
    }
  }, [queryParam]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [currency, setCurrency] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const { authToken } = useToken();

  const buildQueryParams = () => {
    const params = {};

    activeFilters.forEach((filter) => {
      if (filter.name === "search") {
        if (params.search) {
          params.search += `,${filter.value}`;
        } else {
          params.search = filter.value;
        }
      } else if (filter.name === "location") {
        params.location = filter.value;
      } else if (filter.name === "employmentType") {
        params.employmentType = filter.value;
      } else if (filter.name === "experienceLevel") {
        params.experienceLevel = filter.value;
      } else if (filter.name === "currency") {
        params.currency = filter.value;
      } else if (filter.name === "minSalary") {
        params.minSalary = filter.value;
      } else if (filter.name === "maxSalary") {
        params.maxSalary = filter.value;
      }
    });

    return params;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["jobs", activeFilters],
    queryFn: () => getJobs(authToken, buildQueryParams()),
    enabled: !!authToken,
  });

  const jobs = data?.jobs || [];

  const isFilterActive = (filter) =>
    activeFilters.some(
      (f) => f.name === filter.name && f.value === filter.value
    );

  const addFilter = (filter, source = "manual") => {
    setActiveFilters((prev) => {
      const withoutUrlSearches = prev.filter(
        (f) => !(f.name === "search" && f.source === "url")
      );
      if (!filter.value) return withoutUrlSearches;

      return [...withoutUrlSearches, { ...filter, source }];
    });
  };

  const removeFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.filter((f) => !(f.name === filter.name && f.value === filter.value))
    );
    if (filter.source === "url") {
      setSearchInput("");
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedLocation("");
    setJobType("");
    setSelectedExperience("");
    setCurrency("");
    setMinSalary("");
    setMaxSalary("");
  };

  const handleSearch = () => {
    if (searchInput.trim() === "") return;

    const inputValue = searchInput.trim().toLowerCase();

    const matchedTag = predefinedFilters.find(
      (tag) => tag.label.toLowerCase() === inputValue
    );

    if (matchedTag) {
      addFilter({
        name: matchedTag.name,
        label: matchedTag.label,
        value: matchedTag.value,
      });
    } else {
      addFilter({ name: "search", label: searchInput, value: searchInput });
    }

    setSearchInput("");
  };

  if (isError)
    return <div>{error.message} || "Oops! Something went wrong."</div>;

  return (
    <div className="w-full xl:max-w-7xl max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex flex-1 gap-2 items-center">
          <Input
            type="text"
            placeholder="Type a keyword, role, or skill to begin your search... "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="!h-11 !px-6 !rounded-full flex-1 text-sm"
          />
          <Button
            onClick={handleSearch}
            className="rounded-full px-4 !py-3 text-sm cursor-pointer bg-gradient-to-r from-secondary/70 via-primary/70 to-primary/90 hover:bg-secondary/80 text-primary-foreground transition duration-200 ease-in-out"
          >
            <Search className="h-4 w-4" /> Search
          </Button>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="cursor-pointer hover:opacity-90 hover:scale-105 rounded-full border border-muted bg-card dark:bg-popover hover:bg-muted"
            >
              <Filter className="w-5 h-5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 space-y-4 bg-popover rounded-xl shadow-lg">
            <div className="space-y-4 text-sm">
              <div>
                <label className="block mb-1 font-medium">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedLocation(val);
                    addFilter(
                      { name: "location", label: val, value: val },
                      "popover"
                    );
                  }}
                  className="cursor-pointer w-full text-sm rounded-md px-3 py-2 border border-input bg-card"
                >
                  <option value="">Select location</option>
                  {locationsList.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setJobType(val);
                    addFilter(
                      {
                        name: "employmentType",
                        label: val,
                        value: val,
                      },
                      "popover"
                    );
                  }}
                  className="cursor-pointer w-full text-sm rounded-md px-3 py-2 border border-input bg-card"
                >
                  <option value="">Select Job Type</option>
                  {jobTypeList.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Experience</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedExperience(val);
                    addFilter(
                      {
                        name: "experienceLevel",
                        label: val,
                        value: val,
                      },
                      "popover"
                    );
                  }}
                  className="cursor-pointer w-full text-sm rounded-md px-3 py-2 border border-input bg-card"
                >
                  <option value="">Select Experience</option>
                  {experienceOptions.map((exp, i) => (
                    <option key={i} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Salary</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1 font-medium">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => {
                        setCurrency(e.target.value);
                        addFilter(
                          {
                            name: "currency",
                            label: e.target.value,
                            value: e.target.value,
                          },
                          "popover"
                        );
                      }}
                      className="cursor-pointer w-full text-sm rounded-md px-3 py-2 border border-input bg-card !h-9"
                    >
                      <option value="">Select Currency</option>
                      {currencies.map((cur, i) => (
                        <option key={i} value={cur}>
                          {cur}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Min Salary</label>
                    <Input
                      type="number"
                      value={minSalary}
                      onChange={(e) => {
                        setMinSalary(e.target.value);
                        addFilter(
                          {
                            name: "minSalary",
                            label: e.target.value,
                            value: e.target.value,
                          },
                          "popover"
                        );
                      }}
                      className="w-full text-sm rounded-md px-3 py-2 border border-input bg-card"
                      placeholder="Min Salary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1">Max Salary</label>
                    <Input
                      type="number"
                      value={maxSalary}
                      onChange={(e) => {
                        setMaxSalary(e.target.value);
                        addFilter(
                          {
                            name: "maxSalary",
                            label: e.target.value,
                            value: e.target.value,
                          },
                          "popover"
                        );
                      }}
                      className="w-full text-sm rounded-md px-3 py-2 border border-input bg-card"
                      placeholder="Max Salary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="sm"
              className="rounded-full text-sm cursor-pointer bg-destructive hover:bg-destructive/80 text-destructive-foreground transition duration-200 ease-in-out"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {predefinedFilters.map((filter, i) => (
          <FilterTag
            key={i}
            label={filter.label}
            isActive={isFilterActive(filter)}
            onClick={() => {
              if (isFilterActive(filter)) {
                removeFilter(filter);
              } else {
                addFilter(filter);
              }
            }}
            onClear={(e) => {
              e.stopPropagation();
              removeFilter(filter);
            }}
            isRemovable={true}
          />
        ))}

        {activeFilters
          .filter((f) => {
            const isPredefined = predefinedFilters.some(
              (p) => p.value.toLowerCase() === f.value.toLowerCase()
            );

            const isPopoverFilter = f.source === "popover";

            return !isPredefined && !isPopoverFilter;
          })
          .map((filter, i) => (
            <FilterTag
              key={`${filter.name}-${i}`}
              label={filter.label}
              isActive={isFilterActive(filter) && filter.source !== "popover"}
              onClear={() => removeFilter(filter)}
            />
          ))}
      </div>
      {isLoading && (
        <div className="-mt-48">
          <LoadingSpinner />
        </div>
      )}

      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-4 p-4">
        {jobs.length > 0
          ? jobs.map((job, i) => (
              <JobCard key={i} job={job} token={authToken} />
            ))
          : !isLoading && (
              <p className="text-sm text-muted-foreground">No jobs found.</p>
            )}
      </div>
    </div>
  );
}
