"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { updateUserProfile } from "@/lib/apis";
import LOCATIONS from "@/public/data/locations";

export default function EditProfileClient({ user, token, refetch }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    location: user?.location || "",
    skills: user?.skills || [],
    bio: user?.bio || "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  useEffect(() => {
    if (user) {
      setLocationInput(user?.location || "");
      setFormData({
        name: user?.name || "",
        location: user?.location || "",
        skills: user?.skills || [],
        bio: user?.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    setShowLocationSuggestions(value.length > 0);
  };

  const selectLocation = (location) => {
    setFormData((prev) => ({ ...prev, location }));
    setLocationInput(location);
    setShowLocationSuggestions(false);
  };

  const handleSkillKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (
      skill &&
      !formData.skills.includes(skill) &&
      formData.skills.length < 20
    ) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.bio.length > 800) {
      newErrors.bio = "Bio must be 800 characters or less";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await updateUserProfile(formData, token);
      await refetch();
      router.push("/dashboard/profile");
    } catch (error) {
      console.error("Update failed:", error);
      setErrors({
        submit: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLocations = LOCATIONS.filter((location) =>
    location.toLowerCase().includes(locationInput.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Update your personal information and professional details
        </p>
      </div>

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Full Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "!h-10",
              errors.name
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-gray-300 dark:border-gray-600"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Location
          </label>
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="Search for a location (e.g., 'California, USA')"
            value={locationInput}
            onChange={handleLocationChange}
            onFocus={() => setShowLocationSuggestions(true)}
            onBlur={() =>
              setTimeout(() => setShowLocationSuggestions(false), 200)
            }
            className={cn(
              "!h-10",
              errors.location
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-gray-300 dark:border-gray-600"
            )}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}

          {showLocationSuggestions && filteredLocations.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-input  shadow-lg max-h-60 overflow-auto">
              {filteredLocations.map((location, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-muted-foreground hover:text-muted"
                  onMouseDown={() => selectLocation(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Skills
          </label>
          <Input
            type="text"
            id="skills"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter"
            className="!h-10"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            {formData.skills.length >= 20 ? (
              <span className="text-red-500">Maximum of 20 skills reached</span>
            ) : (
              `Add skills by pressing Enter (${formData.skills.length}/20)`
            )}
          </p>

          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light/60 text-primary border border-primary text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={cn(
              "!h-48 !border !border-border",
              errors.bio && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Tell us about yourself..."
          />
          <div className="flex justify-between mt-1">
            {errors.bio && <p className="text-sm text-red-600">{errors.bio}</p>}
            <p
              className={cn(
                "text-sm ml-auto",
                formData.bio.length > 800
                  ? "text-red-500"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {formData.bio.length}/800
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
