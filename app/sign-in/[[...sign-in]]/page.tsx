import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-bold text-xl mb-1" style={{ color: "#1A6B6B" }}>
            THE INCLUSION EDIT
          </div>
          <p className="text-gray-500 text-sm">Sign in to your Impact Platform account</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
