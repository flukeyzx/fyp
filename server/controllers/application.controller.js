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
    if (!validValues.includes(status.toLowerCase())) {
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
        status: status.toUpperCase(),
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
