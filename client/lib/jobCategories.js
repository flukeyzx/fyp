const jobCategories = [
  {
    id: 1,
    title: "Accounting",
    description: "Manage financial records and reports.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/accounting",
  },
  {
    id: 2,
    title: "Machine Learning",
    description: "AI & ML model development.",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/ml",
  },
  {
    id: 3,
    title: "Network Engineer",
    description: "Build and secure networks.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/network",
  },
  {
    id: 4,
    title: "Backend Developer",
    description: "Develop APIs & databases.",
    image:
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/backend",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description: "Create UI with React & Vue.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/frontend",
  },
  {
    id: 6,
    title: "AI",
    description: "Explore artificial intelligence.",
    image:
      "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/ai",
  },
  {
    id: 7,
    title: "IT Support",
    description: "Fix technical issues.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/itsupport",
  },
  {
    id: 8,
    title: "Penetration Testing",
    description: "Ethical hacking & security.",
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/pentest",
  },
  {
    id: 9,
    title: "Vulnerability Assessment",
    description: "Find and fix security flaws.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/vuln",
  },
  {
    id: 10,
    title: "Cloud Computing",
    description: "AWS, Azure, GCP mastery.",
    image:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/cloud",
  },
  {
    id: 11,
    title: "Cybersecurity",
    description: "Defend against cyber threats.",
    image:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/cyber",
  },
  {
    id: 12,
    title: "Data Science",
    description: "Big data & analytics.",
    image:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/data",
  },
  {
    id: 13,
    title: "DevOps",
    description: "CI/CD, Docker & Kubernetes.",
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/devops",
  },
  {
    id: 14,
    title: "Finance",
    description: "Manage business finances.",
    image:
      "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/finance",
  },
  {
    id: 15,
    title: "Marketing",
    description: "SEO & digital marketing.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/marketing",
  },
  {
    id: 16,
    title: "Software Dev",
    description: "Develop mobile & web apps.",
    image:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/software",
  },
];

export default jobCategories;
