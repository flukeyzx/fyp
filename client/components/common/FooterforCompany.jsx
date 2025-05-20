"use client";
import {
  Briefcase,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Github,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  CreditCard,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const ModernFooter = () => {
  return (
    <footer className="bg-background text-muted-foreground pt-20 pb-12">
      <div className="mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <img
              src="/assets/joblix.svg"
              className="w-24 h-24 mb-2"
              alt="Joblix Logo"
            />
            <p className="text-muted-foreground">
              Connecting top talent with world-class companies through
              AI-powered matching.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Facebook, Instagram, Github].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="p-2 bg-muted rounded-lg hover:bg-accent transition-colors hover:text-foreground"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                "Browse Jobs",
                "Company Directory",
                "Salary Calculator",
                "Career Advice",
                "Resume Builder",
              ].map((item) => (
                <div key={item}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Resources
            </h3>
            <div className="space-y-3">
              {[
                "Blog",
                "Webinars",
                "Interview Prep",
                "Skill Assessments",
                "Remote Work Guide",
              ].map((item) => (
                <div key={item}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>contact@talenthub.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border my-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-secondary" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
              <CreditCard className="w-5 h-5 text-primary" />
              <span>PCI Compliant</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help Center</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Live Chat</span>
            </Link>
          </div>
          <div className="flex flex-col items-end md:items-start lg:items-end text-sm text-muted-foreground">
            <div className="flex gap-4">
              <span>© 2023 TalentHub</span>
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground">
                Cookies
              </Link>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Support: 24/7</span>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 right-6">
        <Link
          href=""
          className="bg-gradient-to-r from-primary to-foreground text-background p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center animate-pulse"
        >
          <MessageSquare className="w-6 h-6" />
        </Link>
      </div>
    </footer>
  );
};

export default ModernFooter;
