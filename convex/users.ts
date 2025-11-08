import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    fullName: v.string(),
    clerkId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // Try to find existing user by email using filter
      const existing = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first();

      if (existing) {
        // Update existing user
        await ctx.db.patch(existing._id, {
          fullName: args.fullName,
          clerkId: args.clerkId || undefined,
          updatedAt: Date.now(),
        });
        return existing._id;
      }

      // Create new user
      const newUserId = await ctx.db.insert("users", {
        email: args.email,
        fullName: args.fullName,
        clerkId: args.clerkId || undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      return newUserId;
    } catch (error) {
      console.error("Error creating user in Convex:", error);
      // Return null on error to not block registration
      return null;
    }
  },
});
