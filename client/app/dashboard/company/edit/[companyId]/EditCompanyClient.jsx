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
import { Building2, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";

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
    setValue,
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
  const [logoPreview, setLogoPreview] = useState(company.logo);
  const [bannerPreview, setBannerPreview] = useState(company.banner);
  const logo = watch("logo");
  const banner = watch("banner");
  const initialLogo = company.logo;
  const initialBanner = company.banner;

  useEffect(() => {
    setLogoPreview(logo);
  }, [logo]);

  useEffect(() => {
    setBannerPreview(banner);
  }, [banner]);

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
        title: res.message || "Company updated successfully",
      });
      router.push("/dashboard/profile");
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: error instanceof Error ? error.message : "Update failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative rounded-xl overflow-hidden bg-card mb-8">
        <div className="h-48 w-full relative">
          {bannerPreview ? (
            <img
              src={bannerPreview}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <ImagePlus className="w-12 h-12" />
            </div>
          )}
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-xl border-2 border-white shadow-lg">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Building2 className="w-12 h-12" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="rounded-xl p-6 shadow-sm border-2 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Company Details
              </h2>

              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    {...register("name")}
                    placeholder="Company name"
                    className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                  />
                  {errors.name && <FormError>{errors.name.message}</FormError>}
                </div>

                <div>
                  <Label>Industry</Label>
                  <Input
                    {...register("industry")}
                    placeholder="E.g. Tech, Finance"
                    className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                  />
                </div>

                <div>
                  <Label>Location</Label>
                  <select
                    {...register("location")}
                    className="w-full rounded-lg border-2 border-muted-foreground px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <FormError>{errors.location.message}</FormError>
                  )}
                </div>

                <div>
                  <Label>Website</Label>
                  <Input
                    {...register("website")}
                    placeholder="https://yourcompany.com"
                    className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                  />
                  {errors.website && (
                    <FormError>{errors.website.message}</FormError>
                  )}
                </div>

                <div>
                  <Label>Founded Year</Label>
                  <Input
                    {...register("foundedYear")}
                    placeholder="YYYY"
                    className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                  />
                  {errors.foundedYear && (
                    <FormError>{errors.foundedYear.message}</FormError>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-border bg-background p-6 shadow-sm">
              <div className="">
                <div>
                  <Label>Company Type</Label>
                  <Input
                    {...register("companyType")}
                    placeholder="E.g. Corporation, Startup"
                    className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                  />
                  {errors.companyType && (
                    <FormError>{errors.companyType.message}</FormError>
                  )}
                </div>

                <div>
                  <Label>Employees</Label>
                  <Input
                    type="number"
                    {...register("employees")}
                    className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                  />
                  {errors.employees && (
                    <FormError>{errors.employees.message}</FormError>
                  )}
                </div>

                <div>
                  <Label>Specialities</Label>
                  <Input
                    {...register("specialities")}
                    placeholder="Separate with commas"
                    className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                  />
                  {errors.specialities && (
                    <FormError>{errors.specialities.message}</FormError>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label>Banner URL</Label>
                <Input
                  {...register("banner")}
                  placeholder="https://example.com/banner.jpg"
                  className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                />
                <Hint>Recommended size: 1200x300px</Hint>
                {errors.banner && (
                  <FormError>{errors.banner.message}</FormError>
                )}
              </div>

              <div>
                <Label>Logo URL</Label>
                <Input
                  {...register("logo")}
                  placeholder="https://example.com/logo.png"
                  className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                />
                <Hint>Recommended size: 300x300px</Hint>
                {errors.logo && <FormError>{errors.logo.message}</FormError>}
              </div>

              <div>
                <Label>About</Label>
                <Textarea
                  {...register("about")}
                  rows={20}
                  placeholder="Tell your company's story, mission, and values..."
                  className="py-2 px-4 rounded-lg border-2 border-muted-foreground"
                />
                {errors.about && <FormError>{errors.about.message}</FormError>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 max-w-3xl">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="px-6 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 bg-primary cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

const Label = ({ children }) => (
  <label className="block text-sm font-medium text-muted-foreground mb-1">
    {children}
  </label>
);

const Hint = ({ children }) => (
  <p className="text-xs text-muted-foreground mt-1">{children}</p>
);

const FormError = ({ children }) => (
  <p className="text-sm text-destructive mt-1">{children}</p>
);
