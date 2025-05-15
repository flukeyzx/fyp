"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import locations from "@/public/data/locations";
import { editCompany } from "@/lib/apis";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "About section must be at least 10 characters"),
  logo: z.string().url("Must be a valid image URL"),
  banner: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Must be a valid image URL",
    }),
  industry: z.string(),
  location: z.string(),
  employees: z.coerce.number().min(0, "Must be 0 or more"),
  website: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL",
    }),
  foundedYear: z.string().min(4, "Enter a valid year"),
  companyType: z.string().min(2, "Company Type is required"),
  specialities: z.string().optional(),
});

export default function EditCompanyClient({ company, token }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...company,
      specialities: company.specialities?.join(", ") || "",
      banner: company?.banner || "",
      website: company?.website || "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const initialLogo = company.logo;
  const initialBanner = company.banner;

  const logo = watch("logo");
  const banner = watch("banner");

  const onSubmit = async (data) => {
    const { logo: _logo, banner: _banner, ...rest } = data;
    try {
      const payload = {
        ...rest,
        specialities: data.specialities
          ? data.specialities.split(",").map((item) => item.trim())
          : undefined,
        ...(logo !== initialLogo && { logo }),
        ...(banner !== initialBanner && { banner }),
      };

      const res = await editCompany(company.id, payload, token);
      toast({
        title: res.message || "Company created successfully.",
      });
      router.push("/dashboard/profile");
    } catch (error) {
      console.log("Error while creating company.", error.message);
      toast({
        title: error.message || "Internal server error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create a Company</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <Input
            {...register("name")}
            placeholder="Ex: Acme Corp"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <Textarea
            {...register("about")}
            placeholder="Tell us about your company..."
            rows={5}
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.about && (
            <p className="text-sm text-red-500 mt-1">{errors.about.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <Input
            {...register("logo")}
            placeholder="https://example.com/logo.png"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.logo && (
            <p className="text-sm text-red-500 mt-1">{errors.logo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Banner URL <span className="text-gray-500">(optional)</span>
          </label>
          <Input
            {...register("banner")}
            placeholder="https://example.com/banner.jpg"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.banner && (
            <p className="text-sm text-red-500 mt-1">{errors.banner.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Industry</label>
          <Input
            {...register("industry")}
            placeholder="Ex: Software, Healthcare"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.industry && (
            <p className="text-sm text-red-500 mt-1">
              {errors.industry.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select
            {...register("location")}
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Website <span className="text-gray-500">(optional)</span>
          </label>
          <Input
            {...register("website")}
            placeholder="https://example.com"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.website && (
            <p className="text-sm text-red-500 mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Founded Year</label>
          <Input
            {...register("foundedYear")}
            placeholder="Ex: 2010"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.foundedYear && (
            <p className="text-sm text-red-500 mt-1">
              {errors.foundedYear.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Type</label>
          <Input
            {...register("companyType")}
            placeholder="Ex: Private, Public"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.companyType && (
            <p className="text-sm text-red-500 mt-1">
              {errors.companyType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Specialities <span className="text-gray-500">(optional)</span>
          </label>
          <Input
            {...register("specialities")}
            placeholder="Ex: Web Development, AI, SaaS"
            className="border border-gray-300 bg-muted rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.specialities && (
            <p className="text-sm text-red-500 mt-1">
              {errors.specialities.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Employees
          </label>
          <Input
            type="number"
            {...register("employees")}
            placeholder="Ex: 50"
            className="border bg-muted border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          {errors.employees && (
            <p className="text-sm text-red-500 mt-1">
              {errors.employees.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full !h-11 cursor-pointer"
        >
          {isSubmitting ? "Editing..." : "Edit Company"}
        </Button>
      </form>
    </div>
  );
}
