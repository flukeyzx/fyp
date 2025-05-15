export async function getJobs(token, filters) {
  const queryParams = new URLSearchParams(filters).toString();
  console.log(queryParams);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs?${queryParams}`,
      {
        next: {
          revalidate: 3600,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Fetching jobs data failed ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while fetching jobs data.", error.message);
    throw error;
  }
}

export async function getJob(jobId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobId}`
    );

    if (!res.ok) {
      throw new Error(`Fetching job data failed ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while fetching job data.", error.message);
    throw error;
  }
}

export async function getSavedJobs(token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/saved-jobs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!res.ok && res.status !== 404) {
      throw new Error(`Fetching saved jobs data failed ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while fetching saved jobs data.", error.message);
    throw error;
  }
}

export async function fetchUserProfile(authToken) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Fetching user's profile data failed ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while fetching user profile.", error.message);
    throw error;
  }
}

export async function updateUserProfile(formData, token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          bio: formData.bio,
          skills: formData.skills,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while updating user's profile.", error.message);
    throw error;
  }
}

export async function updateUserAvatar(formData, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-profile`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok && res.status !== 400) {
      throw new Error("Failed to update Avatar.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating user's avatar.", error.message);
    throw error;
  }
}

export async function updateUserPassword(currentPassword, newPassword, token) {
  try {
    const body = currentPassword
      ? { currentPassword, newPassword }
      : { newPassword };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error while updating user's password.");
    }

    return data;
  } catch (error) {
    console.log("Error while updating user's password.", error.message);
    throw error;
  }
}

export async function updateUserResume(formData, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resume/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok && res.status !== 400) {
      throw new Error("Error while updating users resume.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating users resume.", error.message);
    throw error;
  }
}

export async function applyForJob(jobId, proposal, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/apply/${jobId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposal,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "There is an error while applying for a job."
      );
    }

    return data;
  } catch (error) {
    console.log("Error while updating users resume.", error.message);
    throw error;
  }
}

export async function saveJob(jobId, token) {
  console.log(token);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/save-job/${jobId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "There is an error while saving a Job.");
    }

    return data;
  } catch (error) {
    console.log("Error while saving job.", error.message);
    throw error;
  }
}

export async function getProfileScore(token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile-score`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "There is an error while saving a Job.");
    }

    return data;
  } catch (error) {
    console.log("Error while fetching profile score.", error.message);
    throw error;
  }
}

export async function getUserCompany(token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/user-company`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok && res.status !== 404) {
      throw new Error("Error while fetching user's company.");
    }

    return data;
  } catch (error) {
    console.log("Error while fetching user's company.", error.message);
    throw error;
  }
}

export async function generateThroughAI(prompt, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/gemini/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error("Error while generating through AI.");
    }

    return data;
  } catch (error) {
    console.log("Error while generating thorough AI.", error.message);
    throw error;
  }
}

export async function createJob(dataObject, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataObject),
      }
    );

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message || "Error while creating a Job.");
    }

    return data;
  } catch (error) {
    console.log("Error while creating new Job.", error.message);
    throw error;
  }
}

export async function createCompany(dataObject, token) {
  try {
    const res = await fetch(
      `
        ${process.env.NEXT_PUBLIC_BACKEND_URL}/company/create
      `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataObject),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error while creating new Company.");
    }

    return data;
  } catch (error) {
    console.log("Error while creating new Company.", error.message);
    throw error;
  }
}

export async function getCompany(companyId, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error("Error while fetching company's data.");
    }

    return data;
  } catch (error) {
    console.log("Error while fetching company's data.", error.message);
    throw error;
  }
}

export async function isFollowingCompany(companyId, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/is-following/${companyId}`,
      {
        method: "POST",
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error("Error while fetching company's follower.");
    }

    return data;
  } catch (error) {
    console.log("Error while fetching company's follower.", error.message);
    throw error;
  }
}

export async function followCompany(companyId, token) {
  try {
    const res = await fetch(
      `
      ${process.env.NEXT_PUBLIC_BACKEND_URL}/company/follow/${companyId}
      `,
      {
        method: "POST",
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error("Error while following/unfollowing a company.");
    }

    return data;
  } catch (error) {
    console.log("Error while following/unfollowing a company.", error.message);
    throw error;
  }
}

export async function editCompany(companyId, dataObject, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/update/${companyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataObject),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error while Editing Company.");
    }

    return data;
  } catch (error) {
    console.log("Error while editing company.", error.message);
    throw error;
  }
}

export async function getCompanyJobs(companyId, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/company/${companyId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.json();
    if (!res.ok && res.status !== 404) {
      throw new Error(data.message || "Error while fetching company jobs.");
    }

    return data;
  } catch (error) {
    console.log("Error while fetching company jobs.", error.message);
    throw error;
  }
}

export async function getUserJobApplications(token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/applications/user-applications`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok && res.status !== 404) {
      throw new Error(
        data.message || "Error while fetching User's job applications."
      );
    }

    return data;
  } catch (error) {
    console.log("Error while fetching user's job applications.", error.message);
    throw error;
  }
}

export async function getJobApplication(applicationId, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/applications/get-application/${applicationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok && res.status !== 404) {
      throw new Error("Error while fetching job application details.");
    }

    return data;
  } catch (error) {
    console.log("Error while fetching job application details.", error.message);
    throw error;
  }
}

export async function createJobApplication() {}
