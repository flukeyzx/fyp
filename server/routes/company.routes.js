import { Router } from "express";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import {
  getCompany,
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  followUnfollowCompany,
  getUserCompany,
  isFollowingCompany,
  getTopFollowedCompanies,
} from "../controllers/company.controller.js";

const router = Router();

router.get("/", getAllCompanies);
router.get("/user-company", checkAuthentication, getUserCompany);
router.get("/:companyId", getCompany);
router.post(
  "/top-followed-companies",
  checkAuthentication,
  getTopFollowedCompanies
);
router.post("/create", checkAuthentication, createCompany);
router.post("/update/:companyId", checkAuthentication, updateCompany);
router.post("/follow/:companyId", checkAuthentication, followUnfollowCompany);
router.post(
  "/is-following/:companyId",
  checkAuthentication,
  isFollowingCompany
);
router.delete("/:companyId", checkAuthentication, deleteCompany);

export default router;
