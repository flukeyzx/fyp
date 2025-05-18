import { v2 as cloudinary } from "cloudinary";
import prisma from "../configs/prisma.js";
import { createNotifications } from "../utils/notifications.js";

export const createCompany = async (req, res) => {
  try {
    const {
      name,
      about,
      logo,
      banner,
      industry,
      website,
      specialities,
      foundedYear,
      companyType,
      location,
      employees,
    } = req.body;

    const hasCompany = await prisma.company.findFirst({
      where: {
        ownerId: req.user.id,
      },
    });

    if (hasCompany) {
      return res.status(400).json({
        success: false,
        message: "You already have a company.",
      });
    }

    if (!name || name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Please provide a name with atleast 3 characters.",
      });
    }

    if (!about) {
      return res.status(400).json({
        success: false,
        message: "Please provide description of the company.",
      });
    }

    if (!logo) {
      return res.status(400).json({
        success: false,
        message: "Please provide trademark logo of the company.",
      });
    }

    if (!industry) {
      return res.status(400).json({
        success: false,
        message: "Please provide Industry for your company.",
      });
    }

    if (!foundedYear) {
      return res.status(400).json({
        success: false,
        message: "Please provide founded year for your company.",
      });
    }

    if (!companyType) {
      return res.status(400).json({
        success: false,
        message: "Please provide the type of your company.",
      });
    }

    const responseLogo = await cloudinary.uploader.upload(logo);
    const uploadedLogo = responseLogo.secure_url;
    let uploadedBanner;

    if (banner) {
      const responseBanner = await cloudinary.uploader.upload(banner);
      uploadedBanner = responseBanner.secure_url;
    }

    const company = await prisma.company.create({
      data: {
        name,
        about,
        logo: uploadedLogo,
        banner: uploadedBanner,
        location,
        industry,
        website,
        employees,
        specialities,
        foundedYear,
        companyType,
        ownerId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      company,
    });
  } catch (error) {
    console.log("Error in createCompany controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const {
      name,
      about,
      industry,
      website,
      location,
      employees,
      specialities,
      foundedYear,
      companyType,
    } = req.body;
    let { logo, banner } = req.body;
    const { companyId } = req.params;

    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be atleast 3 characters long.",
      });
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "No company found with this Id." });
    }

    if (logo) {
      if (company.logo) {
        await cloudinary.uploader.destroy(
          company.logo.split("/").pop().split(".")[0]
        );
      }

      const response = await cloudinary.uploader.upload(logo);
      logo = response.secure_url;
    }

    if (banner) {
      if (company.banner) {
        await cloudinary.uploader.destroy(
          company.banner.split("/").pop().split(".")[0]
        );
      }

      const response = await cloudinary.uploader.upload(banner);
      banner = response.secure_url;
    }

    const data = {
      name: name || company.name,
      about: about || company.about,
      logo: logo || company.logo,
      banner: banner || company.banner,
      industry: industry || company.industry,
      location: location || company.location,
      employees: employees || company.employees,
      foundedYear: foundedYear || company.foundedYear,
      website: website || company.website,
      specialities:
        specialities?.length > 0 ? specialities : company.specialities,
      companyType: companyType || company.companyType,
    };

    await prisma.company.update({
      where: {
        id: companyId,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Company details updated successfully.",
    });
  } catch (error) {
    console.log("Error in updateCompany controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Company fetched successfully.",
      company,
    });
  } catch (error) {
    console.log("Error in getCompany controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();

    if (!companies) {
      return res.status(404).json({
        success: false,
        message: "There are no companies in the database.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Companies fetched successfully.",
      companies,
    });
  } catch (error) {
    console.log("Error in getAllCompanies controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const deletedCompany = await prisma.company.delete({
      where: {
        id: companyId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
      deletedCompany,
    });
  } catch (error) {
    console.log("Error in deleteCompany controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const followUnfollowCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const isAlreadyFollowed = await prisma.companyFollower.findFirst({
      where: {
        userId: req.user.id,
        companyId,
      },
    });

    if (!isAlreadyFollowed) {
      await prisma.companyFollower.create({
        data: {
          userId: req.user.id,
          companyId,
        },
      });

      await createNotifications({
        fromId: req.user.id,
        fromType: "USER",
        toId: companyId,
        toType: "COMPANY",
        type: "FOLLOW",
        message: `${req.user.name} followed your company.`,
      });

      return res.status(201).json({
        success: true,
        message: "Company followed successfully.",
      });
    }

    await prisma.companyFollower.delete({
      where: {
        userId_companyId: {
          userId: req.user.id,
          companyId,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Company unfollowed successfully.",
    });
  } catch (error) {
    console.log("Error in followUnfollowCompany controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getUserCompany = async (req, res) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        ownerId: req.user.id,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company fetched successfully.",
      company,
    });
  } catch (error) {
    console.log("Error in getUserCompany controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const isFollowingCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const isFollowing = await prisma.companyFollower.findFirst({
      where: {
        companyId,
        userId: req.user.id,
      },
    });

    if (!isFollowing) {
      return res.status(200).json({
        isFollowing: false,
        message: "You are not following this company.",
      });
    }

    return res.status(200).json({
      isFollowing: true,
      message: "You are following this company.",
    });
  } catch (error) {
    console.log("Error in isFollowingCompany controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
