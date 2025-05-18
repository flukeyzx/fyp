const ProfileCompletion = ({ profileScore }) => {
  let progressColor = "";
  let message = "";

  if (profileScore === 100) {
    progressColor = "bg-green-500";
    message = "Excellent! Your profile is 100% complete.";
  } else if (profileScore >= 80) {
    progressColor = "bg-green-500";
    message = "Profile is good, but complete it to 100% for best results.";
  } else if (profileScore >= 70) {
    progressColor = "bg-yellow-400";
    message = "Almost there! Just a few more steps to perfect your profile.";
  } else if (profileScore >= 40) {
    progressColor = "bg-orange-400";
    message = "Good start! Complete your profile to improve visibility.";
  } else {
    progressColor = "bg-red-500";
    message = "Your profile needs attention to attract employers.";
  }

  return (
    <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-foreground">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Profile Strength</h2>
          <p className="text-primary-100">{message}</p>
        </div>

        <div className="w-full md:w-64 relative">
          <div
            className="absolute -top-6 text-sm font-medium"
            style={{ left: `${profileScore}%`, transform: "translateX(-50%)" }}
          >
            {profileScore}%
          </div>

          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all`}
              style={{ width: `${profileScore}%` }}
            ></div>
          </div>

          <div className="flex justify-between mt-1 text-sm text-primary-100">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
