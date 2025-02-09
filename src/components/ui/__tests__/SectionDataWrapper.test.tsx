import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SectionDataWrapper from "../SectionDataWrapper";

describe("SectionDataWrapper", () => {
  it("should render loading content when loading", () => {
    render(
      <SectionDataWrapper
        loading={true}
        error={null}
        loadingContent={<div data-testid="loading">Loading...</div>}
      >
        <div data-testid="content">Content</div>
      </SectionDataWrapper>,
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("should render children when not loading and no error", () => {
    render(
      <SectionDataWrapper
        loading={false}
        error={null}
        loadingContent={<div data-testid="loading">Loading...</div>}
      >
        <div data-testid="content">Content</div>
      </SectionDataWrapper>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("should render error message when error is present", () => {
    const error = new Error("Something went wrong");
    render(
      <SectionDataWrapper
        loading={false}
        error={error}
        loadingContent={<div>Loading...</div>}
      >
        <div data-testid="content">Content</div>
      </SectionDataWrapper>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("should render retry button when refetch is provided and error occurs", () => {
    const refetch = vi.fn();
    const error = new Error("Network error");
    render(
      <SectionDataWrapper
        loading={false}
        error={error}
        refetch={refetch}
        loadingContent={<div>Loading...</div>}
      >
        <div>Content</div>
      </SectionDataWrapper>,
    );

    const retryButton = screen.getByText("Retry");
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(refetch).toHaveBeenCalledOnce();
  });

  it("should not render retry button when refetch is not provided", () => {
    const error = new Error("No refetch");
    render(
      <SectionDataWrapper
        loading={false}
        error={error}
        loadingContent={<div>Loading...</div>}
      >
        <div>Content</div>
      </SectionDataWrapper>,
    );

    expect(screen.queryByText("Retry")).not.toBeInTheDocument();
  });

  it("should prioritize loading over error", () => {
    const error = new Error("Error while loading");
    render(
      <SectionDataWrapper
        loading={true}
        error={error}
        loadingContent={<div data-testid="loading">Loading...</div>}
      >
        <div data-testid="content">Content</div>
      </SectionDataWrapper>,
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByText("Error while loading")).not.toBeInTheDocument();
  });
});
