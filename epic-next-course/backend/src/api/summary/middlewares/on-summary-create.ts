/**
 * `on-summary-create` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You are not authenticated");

    const availableCredits = user.credits;
    if (availableCredits === 0)
      return ctx.unauthorized("You do not have enough credits.");

    console.log("############ Inside middleware end #############");

    // ADD THE AUTHOR ID TO THE BODY
    const modifiedBody = {
      ...ctx.request.body,
      data: {
        ...ctx.request.body.data,
        authorId: ctx.state.user.documentId,
      },
    };


    ctx.request.body = modifiedBody;

    await next();

    // UPDATE THE USER'S CREDITS
    try {
      await strapi.documents("plugin::users-permissions.user").update({
        documentId: user.documentId,
        data: {
          credits: availableCredits - 1,
        },
      });
    } catch (error) {
      ctx.badRequest("Error Updating User Credits");
    }

    console.log("############ Inside middleware end #############");
  };
};
