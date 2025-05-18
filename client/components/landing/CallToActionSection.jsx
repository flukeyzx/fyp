import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center px-6">
      <h3 className="text-3xl font-bold mb-4">Ready to Get Hired?</h3>
      <p className="mb-6 max-w-2xl mx-auto">
        Create your profile, upload your resume, and let top employers find you!
      </p>
      <Button className="bg-white text-cyan-600 hover:bg-gray-100 px-6 py-3 rounded-2xl text-lg">
        Join Now
      </Button>
    </section>
  );
}
