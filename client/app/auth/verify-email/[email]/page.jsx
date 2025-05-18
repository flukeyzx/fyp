import VerifyEmailClient from "@/components/common/VerifyEmailClient";

export default async function VerifyEmail({ params }) {
  const { email } = await params;

  return <VerifyEmailClient email={email} />;
}
