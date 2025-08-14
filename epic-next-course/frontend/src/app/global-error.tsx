"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { Header } from "@/components/custom/header";

const styles = {
  container:
    "min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4",
  content: "max-w-2xl mx-auto text-center space-y-8",
  textSection: "space-y-4",
  headingError: "text-8xl font-bold text-red-600 select-none",
  headingContainer: "relative",
  pageTitle: "text-4xl font-bold text-gray-900 mb-4",
  description: "text-lg text-gray-600 max-w-md mx-auto leading-relaxed",
  illustrationContainer: "flex justify-center py-8",
  illustration: "relative animate-pulse",
  errorCircle:
    "w-32 h-32 bg-red-100 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-red-200",
  errorIcon: "w-16 h-16 text-red-500",
  warningBadge:
    "absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center animate-bounce",
  warningSymbol: "text-orange-500 text-xl font-bold",
  buttonContainer:
    "flex flex-col sm:flex-row gap-4 justify-center items-center",
  button: "min-w-[160px] bg-red-600 hover:bg-red-700 text-white",
  buttonContent: "flex items-center gap-2",
  buttonIcon: "w-4 h-4",
  outlineButton: "min-w-[160px] border-red-600 text-red-600 hover:bg-red-50",
  errorDetails:
    "mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left text-sm text-red-800",
  errorTitle: "font-semibold mb-2",
};

interface IGlobalError {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: IGlobalError) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html>
      <body>
        <Header
          data={{
            logoText: {
              id: 1,
              href: "/",
              label: "Summarize AI",
            },
            ctaButton: {
              id: 1,
              label: "Get Help",
              href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              isExternal: true,
            }
          }}
        />
        <div className={styles.container}>
          <div className={styles.content}>
            {/* Large Error Text */}
            <div className={styles.textSection}>
              <h1 className={styles.headingError}>Global Error</h1>
              <div className={styles.headingContainer}>
                <h2 className={styles.pageTitle}>Application Error</h2>
                <p className={styles.description}>
                  A critical error occurred that prevented the application from
                  loading properly. Please try refreshing the page.
                </p>
              </div>
            </div>

            {/* Illustration */}
            <div className={styles.illustrationContainer}>
              <div className={styles.illustration}>
                <div className={styles.errorCircle}>
                  <AlertTriangle className={styles.errorIcon} />
                </div>
                <div className={styles.warningBadge}>
                  <span className={styles.warningSymbol}>!</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonContainer}>
              <button
                onClick={reset}
                className={`${styles.button} px-6 py-3 rounded-lg font-medium transition-colors`}
              >
                <div className={styles.buttonContent}>
                  <RefreshCw className={styles.buttonIcon} />
                  Try Again
                </div>
              </button>

              {!isHomePage && (
                <Link
                  href="/"
                  className={`${styles.outlineButton} px-6 py-3 rounded-lg font-medium border-2 transition-colors inline-flex`}
                >
                  <div className={styles.buttonContent}>
                    <Home className={styles.buttonIcon} />
                    Go Home
                  </div>
                </Link>
              )}
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className={styles.errorDetails}>
                <div className={styles.errorTitle}>
                  Error Details (Development Only):
                </div>
                <div>Message: {error.message}</div>
                {error.digest && <div>Digest: {error.digest}</div>}
                {error.stack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer font-medium">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 text-xs overflow-auto">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
