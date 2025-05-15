import prisma from "../configs/prisma.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      skills,
      location,
      minSalary,
      maxSalary,
      currency,
      employmentType,
      experienceLevel,
    } = req.body;

    const company = await prisma.company.findUnique({
      where: {
        ownerId: req.user.id,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Please register a company in order to post a job.",
      });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        skills,
        location,
        minSalary,
        maxSalary,
        currency,
        employmentType,
        experienceLevel,
        companyId: company.id,
      },
    });

    // await prisma.company.update({
    //   where: {
    //     id: company.id,
    //   },
    //   data: {
    //     jobsPostedThisMonth: { increment: 1 },
    //   },
    // });

    return res
      .status(201)
      .json({ success: true, message: "Job posted successfully.", job });
  } catch (error) {
    console.log("Error in createJob controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const updateJob = async (req, res) => {
  try {
    const data = Object.fromEntries(
      Object.entries({
        title: req.body.title,
        description: req.body.description,
        skills: req.body.skills,
        location: req.body.location,
        minSalary: req.body.minSalary,
        maxSalary: req.body.maxSalary,
        currency: req.body.currency,
        employmentType: req.body.employmentType,
        experienceLevel: req.body.experienceLevel,
      }).filter(([_, value]) => value !== undefined)
    );

    const job = await prisma.job.update({
      where: {
        id: req.params.jobId,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.log("Error in updateJob controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getAllJobs = async (req, res) => {
  const {
    search,
    location,
    employmentType,
    experienceLevel,
    minSalary,
    maxSalary,
    currency,
  } = req.query;

  try {
    let searchValues = [];
    if (search) {
      searchValues = search.split(",").map((s) => s.trim());
    }

    const salaryConditions =
      minSalary || maxSalary || currency
        ? {
            AND: [
              minSalary ? { minSalary: { gte: parseInt(minSalary) } } : {},
              maxSalary ? { maxSalary: { lte: parseInt(maxSalary) } } : {},
              currency
                ? { currency: { equals: currency, mode: "insensitive" } }
                : {},
            ].filter((obj) => Object.keys(obj).length > 0),
          }
        : undefined;

    const conditions = [
      searchValues.length > 0
        ? {
            AND: searchValues.map((term) => ({
              OR: [
                { title: { contains: term, mode: "insensitive" } },
                { description: { contains: term, mode: "insensitive" } },
                { skills: { hasSome: [term] } },
              ],
            })),
          }
        : undefined,
      location
        ? { location: { equals: location, mode: "insensitive" } }
        : undefined,
      employmentType
        ? { employmentType: { equals: employmentType, mode: "insensitive" } }
        : undefined,
      experienceLevel
        ? { experienceLevel: { equals: experienceLevel, mode: "insensitive" } }
        : undefined,
      salaryConditions,
    ].filter(Boolean);

    const jobs = await prisma.job.findMany({
      where: {
        AND: conditions,
      },
      include: {
        company: true,
      },
    });

    if (jobs.length < 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found.",
      });
    }

    const savedJobs = await prisma.savedJob.findMany({
      where: { userId: req.user.id },
      select: { jobId: true },
    });

    const savedSet = new Set(savedJobs.map((j) => j.jobId));

    const filteredJobs = jobs.map((job) => ({
      ...job,
      isSaved: savedSet.has(job.id),
    }));

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully.",
      jobs: filteredJobs,
    });
  } catch (error) {
    console.log("Error in getAllJobs controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: true,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "No job found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully.",
      job,
    });
  } catch (error) {
    console.log("Error in getJob controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await prisma.job.delete({
      where: {
        id: req.params.jobId,
      },
    });

    if (!deleteJob) {
      return res.status(404).json({
        success: false,
        message: "No job found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
      job: deletedJob,
    });
  } catch (error) {
    console.log("Error in deleteJob controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const isAlreadySaved = await prisma.savedJob.findFirst({
      where: {
        jobId,
        userId: req.user.id,
      },
    });
    if (isAlreadySaved) {
      await prisma.savedJob.delete({
        where: {
          id: isAlreadySaved.id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Job unsaved successfully.",
      });
    }

    await prisma.savedJob.create({
      data: {
        jobId,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully.",
    });
  } catch (error) {
    console.log("Error in saveJob controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await prisma.savedJob.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    if (savedJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found.",
        jobs: savedJobs,
      });
    }

    const cleanedJobs = savedJobs.map((item) => item.job);

    return res.status(200).json({
      success: true,
      message: "Saved jobs fetched successfully.",
      jobs: cleanedJobs,
    });
  } catch (error) {
    console.log("Error in getSavedJobs controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const submitJobApplication = async (req, res) => {
  try {
    const { proposal } = req.body;
    const applicantId = req.user.id;
    const { jobId } = req.params;

    const doesApplicationExist = await prisma.jobApplication.findFirst({
      where: {
        applicantId,
        jobId,
      },
    });

    if (doesApplicationExist) {
      return res.status(400).json({
        success: false,
        message: "You had already applied for this Job.",
      });
    }
    const application = await prisma.jobApplication.create({
      data: {
        applicantId,
        jobId,
        proposal,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job application submitted successfully.",
      application,
    });
  } catch (error) {
    console.log("Error in submitJobApplication controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getCompanyJobs = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a companyId",
      });
    }

    const jobs = await prisma.job.findMany({
      where: {
        companyId,
      },
      include: {
        company: true,
      },
    });

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "There are no jobs posted by this company.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company jobs fetched successfully.",
      jobs,
    });
  } catch (error) {
    console.log("Error in getCompanyJobs controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
