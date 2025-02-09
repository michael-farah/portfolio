import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Component, type ReactNode } from "react";
import { useFirebaseData, FirebaseDataProvider } from "../FirebaseDataContext";

// Error boundary to catch the throw from useFirebaseData
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <div data-testid="error">{this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

// Component that uses useFirebaseData outside provider
const ConsumerOutsideProvider = () => {
  useFirebaseData();
  return <div>Should not render</div>;
};

describe("FirebaseDataContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useFirebaseData", () => {
    it("should throw when used outside FirebaseDataProvider", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ConsumerOutsideProvider />
        </ErrorBoundary>,
      );

      expect(screen.getByTestId("error").textContent).toContain(
        "useFirebaseData must be used within a FirebaseDataProvider",
      );

      consoleSpy.mockRestore();
    });

    it("should provide context value within FirebaseDataProvider", () => {
      let contextValue: ReturnType<typeof useFirebaseData> | null = null;

      const Consumer = () => {
        const ctx = useFirebaseData();
        contextValue = ctx;
        return <div data-testid="consumer">ok</div>;
      };

      render(
        <FirebaseDataProvider>
          <Consumer />
        </FirebaseDataProvider>,
      );

      expect(screen.getByTestId("consumer")).toBeInTheDocument();
      expect(contextValue).not.toBeNull();
      expect(contextValue).toHaveProperty("data");
      expect(contextValue).toHaveProperty("loading");
      expect(contextValue).toHaveProperty("error");
      expect(contextValue).toHaveProperty("refetch");
    });
  });
});
