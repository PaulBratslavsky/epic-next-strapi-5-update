save this for when we need to create a user policy

But we can't access it unless we enable the user `find` permission in Strapi Admin. This will bring us one step closer but open up another issue we will handle.

But first, let's make the following change, save, and try it out.

![011-update-permissions.png](https://api-prod.strapi.io/uploads/011_update_permissions_aa6e706c03.png)

As you can see, our `is-owner` middleware is working.

![012-it-works-kindof.gif](https://api-prod.strapi.io/uploads/012_it_works_kindof_a985ec4e40.gif)

But we have another problem now. Let's see what it is and how to fix it.

## Protecting User Route Via Middleware

Since we enable `find` permission for the user, Let's see what happens when we make a `GET` request to the following endpoint: `/api/users.`

Oh no. We see all the users.

![013-double-fail.png](https://api-prod.strapi.io/uploads/013_double_fail_92b310ae2d.png)

We need to apply middleware to the user permissions plugin. Since user permissions are one of our core routes that is not exposed like our API routes, we need to set the middleware programmatically.

We must cover this in the documentation, so I will request a PR. However, you can now use this blog post as a reference.

In Strapi, you can access the `register` function that programmatically injects you with functionality. You can read about it [here](https://docs.strapi.io/dev-docs/configurations/functions).

We are going to use it to inject our middleware.

First, let's create a new middleware via the CLI; I will call it `user-find-many.` We will add it to the root of our project.

```bash
➜  backend git:(main) ✗ yarn strapi generate
yarn run v1.22.19
$ strapi generate
? Strapi Generators middleware - Generate a middleware for an API
? Middleware name user-find-many
? Where do you want to add this middleware? Add middleware to root of project
✔  ++ /middlewares/user-find-many.js
✨  Done in 10.57s.
```

Our middleware is in the `src/middlewares/user-find-many.`

We will keep the code to hook everything up and see if we get the console log.

```js
"use strict";

/**
 * `user-find-many` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("######### In user-find-many middleware. #########");

    await next();
  };
};
```

The first step to hooking up our middleware is to navigate to the `index.js` file in the `src` folder at the root of our Strapi project.

You should see the following code.

```js
"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
```

We are going to make the following changes in the `register()` function.

```js
"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Getting all the users permissions routes
    const userRoutes =
      strapi.plugins["users-permissions"].routes["content-api"].routes;

    // Set the UUID for our middleware
    const isUserOwnerMiddleware = "global::user-find-many";

    // Find the route where we want to inject the middleware
    const findUser = userRoutes.findIndex(
      (route) => route.handler === "user.find" && route.method === "GET"
    );

    // helper function that will add the required keys and set them accordingly
    function initializeRoute(routes, index) {
      routes[index].config.middlewares = routes[index].config.middlewares || [];
      routes[index].config.policies = routes[index].config.policies || [];
    }

    // Check if we found the find one route if so push our middleware on to that route
    if (findUser) {
      initializeRoute(userRoutes, findUser);
      userRoutes[findUser].config.middlewares.push(isUserOwnerMiddleware);
    }

    // Should see the console log of our modified route
    console.log(userRoutes[findUser], "userRoutes[findUser]");
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
```

When you restart your Strapi app, you should see the following in the console log.

```bash
✔ Building build context (54ms)
✔ Creating admin (6179ms)
⠹ Loading Strapi{
  method: 'GET',
  path: '/users',
  handler: 'user.find',
  config: { prefix: '', middlewares: [ 'global::user-find-many' ], policies: [] }
} userRoutes[findUser]
```

Before continuing, here is a way to explore the Strapi API and see all the available methods.

Stop your Strapi application and start it up again with the following command.

```bash
yarn strapi console
```

It will start strapi with the interactive shell. Type `strapi` and press enter. You should see a long list of all the available methods and objects.

Now, type this `strapi. plugins["users-permissions"].routes["content-api"].routes`.

This is the command in our `register` function we used to get all the routes associated with the `users-permission` plugin.

There is a lot to cover here; if you have any questions, feel free to ask in this post's comments.

Now that we have added our middleware to our `find` route in the user permissions plugin, let's run the previous request in the postman and see if we can get our console log within our `user-find-many` middleware.

```bash
To access the server ⚡️, go to:
http://localhost:1337

[2024-04-15 19:49:49.275] info: ######### In user-find-many middleware. #########
[2024-04-15 19:49:49.278] http: GET /api/users (24 ms) 200

```

Excellent. Now that we can see our console let's update our middleware accordingly. In our case, we will check if the user making the request is the same user; if so, we will only return that user's data.

Let's replace the code in our `user-find-many.js` file with the following.

```js
"use strict";

/**
 * `user-find-many-owner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In user-find-many-owner middleware.");

    const currentUserId = ctx.state?.user?.id;

    if (!currentUserId) {
      strapi.log.error("You are not authenticated.");
      return ctx.badRequest("You are not authenticated.");
    }

    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, id: currentUserId },
    };

    await next();
  };
};
```

Now, let's try our request once more in **Insomnia**.

![014-yay-one-user.png](https://api-prod.strapi.io/uploads/014_yay_one_user_e6de8ac133.png)

Nice. We are now **ONLY** getting one user, and it is the logged-in user. So, there is no way to get any other user's data.

And when we check our Next.Js 14 front end. We are only getting that user's summaries.

![015-yay.png](https://api-prod.strapi.io/uploads/015_yay_8ff9cacc33.png)

Now, let's test our update and delete.

In our current implementation, we should only be able to update and delete our summaries.

![016-api-insomnia.gif](https://api-prod.strapi.io/uploads/016_api_insomnia_8567ed6106.gif)

Nice. We now have one more issue to handle.

In our admin area, we are updating users' images and bios.

![017-admin-panel.png](https://api-prod.strapi.io/uploads/017_admin_panel_efd8125f4c.png)

Currently, we have the following permissions set for our users.

![018-users-permission.png](https://api-prod.strapi.io/uploads/018_users_permission_3da764bfe5.png)

Since we need a middleware to check if the user is updating their content, we will have the following issues.

Suppose I authenticated to the following endpoint but passed other users' IDs. In that case, I can update their content, which differs from our intended use case. So, let's create another middleware that allows users to update their own content only.

![019-updating-other-users.gif](https://api-prod.strapi.io/uploads/019_updating_other_users_4b2314543e.gif)

In the previous section, we discussed how to use the strapi generate command, but in this example, we will create it directly.

Let's first navigate to our middlewares folder, which is found in `src/middlewares,` and create a new file called `user-can-update.js.`

We will add the following code with our logic.

```js
"use strict";
const _ = require("lodash");

/**
 * `user-can-update` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In user-can-update middleware.");

    // use lodash pick

    if (!ctx.state?.user) {
      strapi.log.error("You are not authenticated.");
      return ctx.badRequest("You are not authenticated.");
    }

    const params = ctx.params;
    const requestedUserId = params?.id;
    const currentUserId = ctx.state?.user?.id;

    if (!requestedUserId) {
      strapi.log.error("Missing user ID.");
      return ctx.badRequest("Missing or invalid user ID.");
    }

    if (Number(currentUserId) !== Number(requestedUserId)) {
      return ctx.unauthorized("You are not authorized to perform this action.");
    }

    ctx.request.body = _.pick(ctx.request.body, [
      "firstName",
      "lastName",
      "bio",
      "image",
    ]);

    await next();
  };
};
```

In the code above we are checking if `userId` and requested user ID match than we will continue, otherwise we will return the unauthorized message.

We are also using `lodash` to modify the body to only allow the user to change `firstName`, `lastName`, `bio`, and `image`.

Finally, let's reference this new middleware inside our register function, which is found in the `src/index.js` file.

We will add the following lines.

```js
const isUserCanUpdateMiddleware = "global::user-can-update";

// Find the route where we want to inject the middleware
const updateUser = userRoutes.findIndex(
  (route) => route.handler === "user.update" && route.method === "PUT"
);

// Check if we found the find one route if so push our middleware on to that route
if (updateUser) {
  initializeRoute(userRoutes, updateUser);
  userRoutes[updateUser].config.middlewares.push(isUserCanUpdateMiddleware);
}
```

The completed `register` file should look like the following.

```js
  register({ strapi }) {
    // Getting all the users permissions routes
    const userRoutes =
      strapi.plugins["users-permissions"].routes["content-api"].routes;

    // Set the UUID for our middleware
    const isUserOwnerMiddleware = "global::user-find-many";
    const isUserCanUpdateMiddleware = "global::user-can-update";

    // Find the route where we want to inject the middleware
    const findUser = userRoutes.findIndex(
      (route) => route.handler === "user.find" && route.method === "GET"
    );

    // Find the route where we want to inject the middleware
    const updateUser = userRoutes.findIndex(
      (route) => route.handler === "user.update" && route.method === "PUT"
    );

    // helper function that will add the required keys and set them accordingly
    function initializeRoute(routes, index) {
      routes[index].config.middlewares = routes[index].config.middlewares || [];
      routes[index].config.policies = routes[index].config.policies || [];
    }

    // Check if we found the find one route if so push our middleware on to that route
    if (findUser) {
      initializeRoute(userRoutes, findUser);
      userRoutes[findUser].config.middlewares.push(isUserOwnerMiddleware);
    }

    // Check if we found the find one route if so push our middleware on to that route
    if (updateUser) {
      initializeRoute(userRoutes, updateUser);
      userRoutes[updateUser].config.middlewares.push(isUserCanUpdateMiddleware);
    }

    // Should see the console log of our modified route
    console.log(userRoutes[findUser], "userRoutes[findUser]");
  },

```

Here is an excellent console command in your terminal to list all the available middleware.

```bash
yarn strapi middlewares:list
```

This is helpful if you want to look up the UUID for your newly created middleware.

You should see a similar output when running the above command.

```bash

┌─────────────────────────────────────┐
│ Name                                │
├─────────────────────────────────────┤
│ admin::rateLimit                    │
├─────────────────────────────────────┤
│ admin::data-transfer                │
├─────────────────────────────────────┤
│ global::is-owner                    │
├─────────────────────────────────────┤
│ global::user-can-update             │
├─────────────────────────────────────┤
│ global::user-find-many              │
├─────────────────────────────────────┤
│ strapi::compression                 │
├─────────────────────────────────────┤
More items...

```

Now that we have our `user-can-update` middleware let's try to update the wrong user again.

![final-test.gif](https://api-prod.strapi.io/uploads/final_test_5ca42a07d7.gif)
Nice. We did it.

## Conclusion

This tutorial covered essential aspects of CRUD operations and permission handling in Next.js 14 using Strapi as our backend.

Starting with a basic understanding of CRUD—Create, Read, Update, and Delete—we implemented these operations with Strapi's HTTP methods and routes.

We then focused on security, emphasizing the importance of managing authenticated requests with JWT tokens via custom middleware to ensure that users are authorized to interact with their data by verifying user permissions before allowing data manipulation.

This approach enhances both the security and manageability of the application.

This post scratches the surface, but it should be a great starting point for anyone looking to dive deeper into Strapi middleware, especially as it relates to using the `users-permission` plugin.

We hope you enjoyed the content. We will see you in the next one, where we will cover pagination and search in Next.js 14.
