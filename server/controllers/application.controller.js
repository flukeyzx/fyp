import prisma from "../configs/prisma.js";

export const getAllJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await prisma.jobApplication.findMany({
      where: {
        jobId,
      },
      include: {
        applicant: {
          omit: {
            password: true,
          },
        },
        job: true,
      },
    });

    if (!applications) {
      return res.status(404).json({
        success: false,
        message: "No applications found for this job.",
        applications: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job applications fetched successfully.",
      applications,
    });
  } catch (error) {
    console.log("Error in getAllJobApplications controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getUserJobApplications = async (req, res) => {
  try {
    const applications = await prisma.jobApplication.findMany({
      where: {
        applicantId: req.user.id,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User's job application history fetched successfully.",
      applications,
    });
  } catch (error) {
    console.log("Error in getUserJobApplications controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getJobApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
      },
      include: {
        applicant: {
          omit: {
            password: true,
          },
        },
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No Job Application found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job Application fetched successfully.",
      application,
    });
  } catch (error) {
    console.log("Error in getJobApplication controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const submitJobApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicantId = req.user.id;
    const { proposal } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Please provide jobId in the request params.",
      });
    }

    await prisma.jobApplication.create({
      data: {
        jobId,
        applicantId,
        proposal,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job Application submitted successfully.",
    });
  } catch (error) {
    console.log("Error in submitJobApplication controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide a status value.",
      });
    }

    const validValues = ["pending", "shortlisted", "rejected", "accepted"];
    const statusValue = status.toLowerCase();

    if (!validValues.includes(statusValue)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value.",
      });
    }

    const application = await prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status: statusValue.toUpperCase(),
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        applicant: true,
      },
    });

    let message;
    switch (statusValue) {
      case "accepted":
        message = `🎉 Congratulations! You've been *accepted* for the position of "${application.job.title}" at ${application.job.company.name}. The company will reach out to you soon.`;
        break;

      case "shortlisted":
        message = `✅ Good news! You've been *shortlisted* for the job "${application.job.title}" at ${application.job.company.name}. Stay tuned for the next steps.`;
        break;

      case "rejected":
        message = `❌ We're sorry! Your application for "${application.job.title}" at ${application.job.company.name} was not successful this time. Keep applying, and don't give up!`;
        break;

      case "pending":
        message = `🕒 Your job application for "${application.job.title}" at ${application.job.company.name} is still *pending*. We’ll notify you once it's reviewed.`;
        break;

      default:
        message = `Your job application status for "${application.job.title}" at ${application.job.company.name} has been updated.`;
    }

    await prisma.notification.create({
      data: {
        fromId: application.job.company.ownerId,
        fromType: "COMPANY",
        toId: application.applicantId,
        toType: "USER",
        type: "HIRING_UPDATE",
        message,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.log("Error in updateApplicationStatus controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
