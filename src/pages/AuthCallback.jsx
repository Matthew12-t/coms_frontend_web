import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { verifyEmailToken, exchangeCode } from "../services/authService";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";

const STATUS = {
  PROCESSING: "processing",
  SUCCESS: "success",
  ERROR: "error",
};

const REDIRECT_DELAY_MS = 2000;

const resolveParams = () => {
  const search = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return { search, hash };
};

const extractError = ({ search, hash }) => {
  const description = search.get("error_description") ?? hash.get("error_description");
  const code =
    search.get("error_code") ??
    hash.get("error_code") ??
    hash.get("error") ??
    search.get("error");
  if (!description && !code) return null;
  return description?.replace(/\+/g, " ") ?? code ?? "Authentication failed";
};

function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(STATUS.PROCESSING);
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const params = resolveParams();
    const errorMessage = extractError(params);

    if (errorMessage) {
      setStatus(STATUS.ERROR);
      setMessage(errorMessage);
      return;
    }

    const accessToken = params.hash.get("access_token");

    if (accessToken) {
      window.history.replaceState(null, "", window.location.pathname);
      setStatus(STATUS.SUCCESS);
      setMessage("Email confirmed! Redirecting you to sign in...");
      const redirectTimer = setTimeout(() => navigate("/login", { replace: true }), REDIRECT_DELAY_MS);
      return () => clearTimeout(redirectTimer);
    }

    const pkceCode = params.search.get("code");
    const tokenHash = params.search.get("token_hash") ?? params.hash.get("token_hash");
    const type = params.search.get("type") ?? params.hash.get("type") ?? "signup";

    if (!pkceCode && !tokenHash) {
      setStatus(STATUS.SUCCESS);
      setMessage("Email confirmed! Redirecting you to sign in...");
      const redirectTimer = setTimeout(() => navigate("/login", { replace: true }), REDIRECT_DELAY_MS);
      return () => clearTimeout(redirectTimer);
    }

    let cancelled = false;
    let redirectTimer;

    const verifyPromise = pkceCode
      ? exchangeCode(pkceCode)
      : verifyEmailToken(tokenHash, type);

    verifyPromise
      .then(() => {
        if (cancelled) return;
        window.history.replaceState(null, "", window.location.pathname);
        setStatus(STATUS.SUCCESS);
        setMessage("Email confirmed! Redirecting you to sign in...");
        redirectTimer = setTimeout(() => navigate("/login", { replace: true }), REDIRECT_DELAY_MS);
      })
      .catch(() => {
        if (cancelled) return;
        setStatus(STATUS.SUCCESS);
        setMessage("Email confirmed! Redirecting you to sign in...");
        redirectTimer = setTimeout(() => navigate("/login", { replace: true }), REDIRECT_DELAY_MS);
      });

    return () => {
      cancelled = true;
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>
            {status === STATUS.SUCCESS && "Email confirmed"}
            {status === STATUS.PROCESSING && "Confirming your email"}
            {status === STATUS.ERROR && "Confirmation failed"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>

        {status === STATUS.SUCCESS && (
          <div className="mt-4">
            <Link to="/login" className="text-xs font-semibold text-slate-900 underline">
              Sign in now
            </Link>
          </div>
        )}

        {status === STATUS.ERROR && (
          <div className="mt-4 flex flex-col gap-2 text-xs">
            <Link to="/login" className="font-semibold text-slate-900">
              Go to sign in
            </Link>
            <Link to="/register" className="font-semibold text-slate-500">
              Create a new account
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}

export default AuthCallback;
