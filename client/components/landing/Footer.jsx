export default function Footer() {
  return (
    <footer id="footer" className="py-10 bg-muted text-foreground px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div>
          <img
            src="/assets/joblix.svg"
            className="w-24 h-24 mb-2"
            alt="Joblix Logo"
          />
          <p className="text-sm text-muted-foreground">
            Your gateway to a better career. Powered by passion and innovation.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Quick Links</h5>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#categories">Job Categories</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Follow Us</h5>
          <div className="flex gap-2">
            {["x", "fb", "insta", "linkedin2"].map((platform) => (
              <a key={platform} href="#" aria-label={platform}>
                <div className="w-10 h-10 flex items-center justify-center rounded-sm overflow-hidden">
                  <img
                    src={`/icons/${platform}.svg`}
                    alt={platform}
                    className="w-full h-full object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center mt-8 text-muted-foreground text-sm">
        &copy; 2025 Joblix. All rights reserved.
      </p>
    </footer>
  );
}
