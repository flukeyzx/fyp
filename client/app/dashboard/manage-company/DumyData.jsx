export const companyData = {
  id: "comp_001",
  name: "Nexus Technologies",
  tagline: "Powering the Future with Ethical AI",
  logo: "/logos/nexus-logo.png",
  banner: "/banners/nexus-banner.jpg",
  about:
    "Nexus Technologies is a global leader in ethical artificial intelligence solutions. With over 500 team members across 12 countries, we build enterprise-grade machine learning platforms that transform how organizations operate, innovate, and grow.",
  industry: "Artificial Intelligence",
  headquarters: "San Francisco, CA",
  locations: ["New York", "London", "Singapore", "Bangalore"],
  website: "https://nexustech.ai",
  founded: "2015",
  employees: 524,
  social: {
    linkedin: "https://linkedin.com/company/nexus-tech",
    twitter: "https://twitter.com/nexus_tech",
  },
};

export const jobs = [
  {
    id: "job_001",
    title: "Senior UX Designer",
    type: "Full-time",
    status: "close",
    applications: 28,
    posted: "2023-06-15T09:00:00Z",
    description:
      "As a Senior UX Designer, you’ll lead the design of user-centric interfaces for our cutting-edge AI solutions. Your work will ensure seamless interaction with our ML platforms used globally by enterprises.",
    responsibilities: [
      "Design intuitive, end-to-end user experiences",
      "Conduct qualitative and quantitative user research",
      "Collaborate closely with product and engineering teams",
    ],
    requirements: [
      "5+ years of UX design experience",
      "Portfolio showcasing complex product workflows",
      "Expertise in Figma and prototyping tools",
    ],
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Information Architecture",
    ],
    location: "San Francisco, CA (Hybrid)",
    salary: "$150,000 - $180,000",
    hiringManager: "Sarah Chen",
    company: companyData,
    experienceLevel: "Senior (5+ years)",
    minSalary: 150000,
    maxSalary: 180000,
    currency: "USD",
    employmentType: "Full-time",
  },
  {
    id: "job_002",
    title: "Frontend Developer (React)",
    type: "Full-time",
    status: "open",
    applications: 15,
    posted: "2023-06-18T12:00:00Z",
    description:
      "We're looking for a skilled React developer to create stunning, responsive interfaces for our AI-powered dashboards. You'll bring our user experience to life through clean, efficient code.",
    responsibilities: [
      "Build and maintain responsive UI components",
      "Collaborate with designers and backend engineers",
      "Ensure accessibility and performance optimization",
    ],
    requirements: [
      "3+ years of experience with React",
      "Hands-on experience with Tailwind CSS",
      "Comfortable working with REST APIs and Git",
    ],
    skills: ["React", "Tailwind CSS", "JavaScript", "Accessibility"],
    location: "Remote",
    salary: "$100,000 - $120,000",
    hiringManager: "John Lee",
    company: companyData,
    experienceLevel: "Intermediate (3+ years)",
    minSalary: 100000,
    maxSalary: 120000,
    currency: "USD",
    employmentType: "Full-time",
  },
];

export const applicationsData = [
  {
    id: "app_001",
    jobId: "job_001",
    candidate: {
      name: "Alex Johnson",
      imge: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLat8bZvhXD3ChSXyzGsFVh6qgplm1KhYPKA&s",
      email: "alex.johnson@example.com",
      phone: "+1 (415) 555-0192",
      location: "San Francisco, CA",
      links: {
        linkedin: "https://linkedin.com/in/alexjohnson",
        portfolio: "https://alexjohnson.design",
      },
    },
    status: "under review",
    applied: "2023-06-18T14:30:00Z",
    documents: {
      resume: "/resumes/alex-johnson.pdf",
      coverLetter: `Dear Hiring Team,

I'm excited to apply for the Senior UX Designer position. With 6 years at Google AI designing enterprise tools, I've developed expertise in creating seamless user experiences for ML-based platforms.

Key accomplishments:
- Led the redesign of Vertex AI dashboard (NPS +35)
- Built design systems adopted by 50+ internal tools
- Reduced support tickets by 40% through usability improvements

I’d love to bring this experience to Nexus Technologies. Looking forward to discussing how I can contribute.

Best regards,
Alex Johnson`,
    },
    evaluation: {
      rating: 4.5,
      notes: "Excellent portfolio; strong AI product design experience",
    },
  },
  {
    id: "app_002",
    jobId: "job_002",
    candidate: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (415) 555-0246",
      location: "Los Angeles, CA",
      links: {
        linkedin: "https://linkedin.com/in/janesmith",
        portfolio: "https://janesmith.dev",
      },
    },
    status: "rejected",
    applied: "2023-06-20T10:15:00Z",
    documents: {
      resume: "/resumes/jane-smith.pdf",
      coverLetter: `Dear Hiring Manager,

I’m excited to apply for the Frontend Developer (React) role. Over the past 4 years, I’ve developed high-performance interfaces using React, Tailwind, and TypeScript.

Highlights:
- Reduced page load times by 30% through UI optimization
- Built accessible, responsive components for Fortune 500 clients
- Collaborated with cross-functional teams to enhance user engagement

I'm passionate about building impactful software and would love to contribute to Nexus Technologies’ mission.

Warm regards,
Jane Smith`,
    },
    evaluation: {
      rating: 4.2,
      notes: "Strong React/Tailwind skillset; solid growth potential",
    },
  },
  {
    id: "app_003",
    jobId: "job_001",
    candidate: {
      name: "Zaryab Khan",
      imge: "https://instagram.fmux3-1.fna.fbcdn.net/v/t51.2885-19/470911454_1303533254110221_8309665956564348585_n.jpg?_nc_ht=instagram.fmux3-1.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2QEGrj0mXlPBUEf8_4VWLlXg9bQnSQSUshFnv_mCERv55sybo2Iq4zw034IkhsdX_G4&_nc_ohc=pn0BaXkN6FQQ7kNvwH35kbd&_nc_gid=SgDA_19b6eontXh6Hclhlg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfJKy1Q4QBIowA7rCRP8HLwXh-9ReLVsu9vVdzIHKHWABQ&oe=682A9F2F&_nc_sid=7a9f4b",
      email: "zaryab.khan@example.com",
      phone: "+92 (300) 1234567",
      location: "Karachi, Pakistan",
      links: {
        linkedin: "https://linkedin.com/in/zaryabkhan",
        portfolio: "https://zaryabkhan.design",
      },
    },
    status: "under review",
    applied: "2023-06-19T09:00:00Z",
    documents: {
      resume: "/resumes/zaryab-khan.pdf",
      coverLetter: `Dear Hiring Team,

I'm excited to apply for the UX Designer role. With 5 years of experience in crafting intuitive interfaces, including AI-based systems, I’ve led design efforts for complex enterprise dashboards.

Achievements:
- Designed user flows that reduced task completion time by 25%
- Conducted research across 3 continents to improve global UX
- Created reusable design libraries increasing dev velocity by 30%

Looking forward to the opportunity to join Nexus Technologies.

Sincerely,
Zaryab Khan`,
    },
    evaluation: {
      rating: 4.3,
      notes: "Creative approach, international research exposure",
    },
  },
];
