import { describe, it, beforeEach, vi } from "vitest";
import {
  mockUser,
  mockDatabase,
  mockServerTimestamp,
} from "../../../mocks/firebase";
import { sendMessage } from "../sendMessage";
import { database } from "../../firebase";

describe("sendMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDatabase.ref.mockReturnValue("messages-ref");
    mockDatabase.push.mockResolvedValue({ key: "new-message-id" });
    mockServerTimestamp.mockReturnValue(1234567890);
  });

  describe("sendMessage", () => {
    it("should create a message with correct data structure", async () => {
      const message = "Hello, this is a test message";

      await sendMessage({ user: mockUser, message });

      expect(mockDatabase.ref).toHaveBeenCalledWith(database, "messages");
      expect(mockDatabase.push).toHaveBeenCalledWith("messages-ref", {
        userId: mockUser.uid,
        email: mockUser.email,
        message: message.trim(),
        timestamp: 1234567890,
      });
    });

    it("should trim whitespace from messages", async () => {
      const message = "  Hello, this is a test message  ";

      await sendMessage({ user: mockUser, message });

      expect(mockDatabase.push).toHaveBeenCalledWith(
        "messages-ref",
        expect.objectContaining({
          message: message.trim(),
        }),
      );
    });

    it("should throw an error if push fails", async () => {
      const error = new Error("Database error");
      mockDatabase.push.mockRejectedValue(error);
      const message = "Test message";

      await expect(sendMessage({ user: mockUser, message })).rejects.toThrow(
        "Database error",
      );
    });
  });
});