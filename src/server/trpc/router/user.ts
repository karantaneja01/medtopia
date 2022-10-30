import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Role } from "@prisma/client";

export const userRouter = router({
  changeuserrole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum([
          Role.INSURANCE_AGENT,
          Role.INSURANCE_COMPANY,
          Role.LAB_AGENT,
          Role.MEDICAL_ANALYST,
          Role.PATIENT,
          Role.UNSPECIFIED,
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.id,
        },
      });
      if (!user) {
        return {
          error: "User not found",
        };
      } else {
        await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            userrole: input.role,
          },
        });
        return {
          success: true,
          message: `User role has been changed to ${input.role}`,
        };
      }
      // }
    }),
  getuserrole: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          userrole: true,
        },
      });
    }),
  addsuperbill: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        superbill: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        return {
          error: "User not found",
        };
      } else {
        const superbill = await ctx.prisma.superBill.create({
          data: {
            data: input.superbill,
            User: {
              connect: {
                email: input.email,
              },
            },
          },
        });
        return {
          success: true,
          message: "Superbill added successfully",
          superbill,
        };
      }
    }),
  updatesuperbill: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const superbill = await ctx.prisma.superBill.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!superbill) {
        return {
          error: "Superbill not found",
        };
      } else {
        const superbill = await ctx.prisma.superBill.update({
          where: {
            id: input.id,
          },
          data: {
            status: input.status,
          },
        });
        return {
          success: true,
          message: "Superbill updated successfully",
          superbill,
        };
      }
    }),
  getallsuperbills: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        return {
          error: "User not found",
        };
      } else {
        const superbills = await ctx.prisma.superBill.findMany({
          where: {
            userId: user.id,
          },
        });
        return {
          success: true,
          message: "Superbills fetched successfully",
          superbills,
        };
      }
    }),
});
