import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-bold text-xl mb-1" style={{ color: "#1A6B6B" }}>
            THE INCLUSION EDIT
          </div>
          <p className="text-gray-500 text-sm">Create your Impact Platform account</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
