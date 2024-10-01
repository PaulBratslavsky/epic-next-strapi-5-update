Hello, you wonderful people; in this post of many, I would like to introduce you to what we will be building.

This post is the first of many in our Epic Strapi Next.js 14 tutorial Series. You can find the outline for upcoming post here.

- **Part 1: Learn Next.js by building a website**
- [Part 2: Building Out The Hero Section of the homepage](https://strapi.io/blog/epic-next-js-14-tutorial-part-2-building-out-the-home-page)
- [Part 3: Finishup up the homepage Features Section, TopNavigation and Footer](https://strapi.io/blog/epic-next-js-14-tutorial-learn-next-js-by-building-a-real-life-project-part-3)
- [Part 4: How to handle login and Authentification in Next.js](https://strapi.io/blog/epic-next-js-14-tutorial-part-4-how-to-handle-login-and-authentication-in-next-js)
- [Part 5: Building out the Dashboard page and upload file using NextJS server actions](https://strapi.io/blog/epic-next-js-14-tutorial-part-5-file-upload-using-server-actions)
- [Part 6: Get Video Transcript with OpenAI Function](https://strapi.io/blog/epic-next-js-14-tutorial-part-6-create-video-summary-with-next-js-and-open-ai)
- [Part 7: Strapi CRUD permissions](https://strapi.io/blog/epic-next-js-14-tutorial-part-7-next-js-and-strapi-crud-permissions)
- [Part 8: Search & pagination in Nextjs](https://strapi.io/blog/epic-next-js-14-tutorial-part-8-search-and-pagination-in-next-js)
- [Part 9: Backend deployment to Strapi Cloud](https://strapi.io/blog/epic-next-js-14-tutorial-part-9-backend-deployment-to-strapi-cloud)
- [Part 10: Frontend deployment to Vercel](https://strapi.io/blog/epic-next-js-14-tutorial-part-10-frontend-deployment-to-vercel)

With the popularity of Next.js 14 and Strapi headless CMS and how they can empower you to build cool things, we are going to work on building a project together to cover all the awesome aspects of Next.js 14, the app folder, and all the new features including server components and server actions.

In this post, we will quickly look at what we will build and the topics we will cover, set up the basic structure of our project, and make our first commitment.

So, what will we be building?

## I had a problem

So, I had a problem; I spent a lot of time on YouTube and found myself watching videos. Halfway through, I realized I could have avoided videos I was not entirely interested in if I had seen the summary first.

Wouldn't it be awesome if I could get the summary first and see if it deserves my full attention instead of watching the video?

I also use videos as learning resources. On top of video summarization, I wanted to create notes around the videos I watched that I could reference later.

And that is precisely what we will build, a video summarization app to summarize our YouTube videos with the power of AI.

No more wasted time committing to videos. We can just read the summaries.

## Summarize AI Project Overview

![summary-demo.gif](https://api-prod.strapi.io/uploads/summary_demo_e3c4b06472.gif)

## The Tech We Are Going To Use

### Next.js

Next.js is a front-end framework built on the React JavaScript library, which is known for creating engaging user interfaces.

It simplifies web development so you can focus on the most important parts, building the project for your clients.

And now, you can access all the new features of React, like React Server Components and Server Actions.

A major feature of Next.js is server-side rendering. This improves how fast web applications load and how well they rank on search engines, which is great for performance and SEO.

Next.js also has a static generation feature. This means it creates files before they're needed so they can load quickly without waiting for data to be fetched.

Additionally, Next.js provides incremental static regeneration. This feature updates static content with dynamic changes for pages that have not been pre-generated or updated since their initial creation.

To style our app, we will be using Tailwind and ShadcnUI.

### Strapi

To make building our application even easier, we will leverage the power of Strapi [ Headless CMS ] to manage our data and authentication.

Strapi is an open-source headless content management system (CMS). Unlike traditional CMSs, which are tightly coupled with the front-end presentation of your content, a headless CMS like Strapi provides backend management for your content and serves it via a RESTful or GraphQL API.

This means you can use Strapi to manage your content and then deliver it to any front-end framework or platform you choose, such as websites, mobile apps, or other server-side applications.

The main benefits of using Strapi include its flexibility, as it allows developers to customize the admin panel, APIs, and database queries to suit their specific needs.

It also supports many databases and can be easily integrated with popular front-end frameworks like React, Vue, and Angular.

In our case, we will be using Next.js 14.

Strapi is designed to streamline the content management process, making it easier for developers and content creators to work efficiently.

Get more done in less time.

In this tutorial, the goal is to cover the following Next.js and Strapi features.

## Features

**Next.js 14**

- New `/app` dir,
- Routing, Layouts, Nested Layouts, and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Route handlers
- Metadata files
- Server and Client Components
- Protective Routes Middleware

- UI Components built using **Shadcn UI**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

**Strapi**

- Content Modeling
- API Routes, Middlewares, and Policies **Strapi**
- Authentication using **Strapi**
- ORM using **Strapi**
- Database on **Strapi**

## Project Overview

### Home Page

We will have a basic landing page with a top nav, hero sections, a benefits section, and a footer.

All the top nav, hero section, and footer content will be stored inside our Strapi instance.

![home-page.gif](https://api-prod.strapi.io/uploads/home_page_9929dbf0fc.gif)

### Login and Register Page

We will handle auth using Strapi and protect our routes via the Next middleware file to check if an authorized user exists and redirect accordingly.

![login-demo.gif](https://api-prod.strapi.io/uploads/login_demo_09518314f0.gif)

### Dashboard

We will have a simple dashboard with a primary view showing available credits, notes, and summaries. As well as generate a summary form in the top navigation.

**Generate Summary**

Here, you will enter your YouTube video url, and it will make a call to Open AI to generate our summary based on the YouTube video transcript.

For this Next.js 14 tutorial, we will use the LangChain library to make a call to open AI since it gives us some additional features that we can use to extend our app in the future.

![summary-demo.gif](https://api-prod.strapi.io/uploads/summary_demo_e3c4b06472.gif)

**Summaries and Notes Page**

Here, you can access your list of summaries and summaries details page, where you can update the text or delete the summary altogether.

We will have a similar section for our notes as well.

![summary-page.gif](https://api-prod.strapi.io/uploads/summary_page_dd708e612b.gif)

**Account Page**

Finally, we will have our account page, where we can update our users's first and last names and bio. As well as change our photo.

Most of the form submissions in our app will use Next Server Actions, which is pretty cool.

![account-page.gif](https://api-prod.strapi.io/uploads/account_page_9b8a1fb1f9.gif)

I hope you are excited to embark on this journey with me.

## The Process and Why It Is Awesome

My goal is to build this tutorial in public and release new post/video per week.

All the progress will be saved in a public repo where you can follow along.

The goal is to build out our application that you can use later to add or extend in any way you desire.

We will cover all the important parts of Next.js and some features related to Strapi, such as middlewares, policies, routes, controllers, and services.

I hope you are just as excited as I am.

So let's get started.

## Setting Up Our Initial Project

Let's start by setting up our front end first. For this, we will be using [Next.js 14](https://nextjs.org)

### Setting Up Our Frontend

Let's start by creating a new folder called `epic-next-course,` I am going to do this in my terminal by running the following command:

```bash
  mkdir epic-next-course
```

Once we created our folder, let's navigate inside of it by typing `cd epic-next-course` and run the following command:

```
  npx create-next-app@latest
```

Select the following options:

```bash
create-next-app@14.2.14
Ok to proceed? (y) y
✔ What is your project named? … frontend
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … No
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … Yes
Creating a new Next.js app in /Users/paulbratslavsky/Desktop/work/epic-next-update/epic-next-course/frontend.

```

Once your project has been created, let's navigate to our frontend folder with `cd frontend` and run `yarn dev` to start our frontend project.

Your project will start at [http://localhost:3000](http://localhost:3000).

![next-js-web.png](/images/01-epic-next/next-js-web.png)

### Setting Up Shadcn UI for styling

We will use Tailwind with Shadcn UI components to make our app pretty. Shadcn UI is excellent because it allows you to install your UI components directly into your codebase and modify/extend them accordingly.

You can learn more [here](https://ui.shadcn.com).

![shadcn-ui.png](https://api-prod.strapi.io/uploads/shadcn_ui_0f155fbb09.png)

Let's now go through the setup steps. You can also reference [this] guide (https://ui.shadcn.com/docs/installation/next).

**Run the CLI**
Run the shadcn-ui init command:

```bash
  npx shadcn@latest init

```

**Select the following options**

```bash
frontend
➜  epic-next-course  cd frontend
➜  frontend git:(main) npx shadcn@latest init

✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
✔ Which style would you like to use? › New York
✔ Which color would you like to use as the base color? › Neutral
✔ Would you like to use CSS variables for theming? … no / yes
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.ts
✔ Updating src/app/globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - src/lib/utils.ts

Success! Project initialization completed.
```

That's it. We now have Shadcn UI installed and ready to go.

You will see the new `utils` folder and `components.json` file.

![component-file.png](/images/01-epic-next/component-file.png)

Let's add our first component by running the following command in your `frontend` folder, which will install our button component.

```bash
  npx shadcn@latest add button
```

We now have a button inside our components folder.

![we-have-a-button.png](https://api-prod.strapi.io/uploads/we_have_a_button_773bb330f5.png)

Let's use it inside the `page.tsx` file by replacing all the code with the following.

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container mx-auto py-6">
      <Button>Our Cool Button</Button>
    </main>
  );
}
```

Look at that amazing button.

![our-new-button.png](https://api-prod.strapi.io/uploads/our_new_button_d6e34ed415.png)

Now that we know that our Shadcn UI component is working as expected. Let's finish up this first tutorial by setting up our Strapi instance.

### Setting Up Our Backend

For our backend, we are going to use Strapi headless CMS. Strapi allows you to build your backend in minutes instead of weeks.

It is highly customizable and easy to get started with.

You can learn more in the [docs](https://docs.strapi.io/dev-docs/quick-start), but we will start by running the following command inside the project folder.

```bash
  npx create-strapi-app@latest backend
```

You will see the following prompt.

```bash
 Strapi   v5.0.1 🚀 Let's create your new project


We can't find any auth credentials in your Strapi config.

Create a free account on Strapi Cloud and benefit from:

- ✦ Blazing-fast ✦ deployment for your projects
- ✦ Exclusive ✦ access to resources to make your project successful
- An ✦ Awesome ✦ community and full enjoyment of Strapi's ecosystem

Start your 14-day free trial now!


? Please log in or sign up.
  Login/Sign up
❯ Skip
```

We will select `skip` and hit enter.

You will be prompted with the following options.

```bash
? Do you want to use the default database (sqlite) ? Yes
? Start with an example structure & data? No
? Start with Typescript? Yes
? Install dependencies with npm? Yes
? Initialize a git repository? No

 Strapi   Creating a new application at /Users/paulbratslavsky/Desktop/work/epic-next-update/epic-next-course/backend

 deps   Installing dependencies with npm
```

To start our Strapi application, we will run the following command.

```bash
  cd backend
  yarn strapi develop
```

Once everything gets installed, you will be greeted by Strapi's register page.

![register-user.png](https://api-prod.strapi.io/uploads/register_user_d6d80f13ec.png)

Go ahead and create your first **admin user**. Once done, you will be greeted by the dashboard.

![strapi-dashboard.png](/images/01-epic-next/strapi-dashboard.png)

Congratulations. We now have our Strapi app set up.

In future posts, we will explore the Strapi dashboard in more detail. But for now, let's create our first **collection type**.

## Creating Our First Collection Type

Our app will have a home page with our top navigation, hero section, features, and footer section.

![home-page-layout.png](https://api-prod.strapi.io/uploads/home_page_layout_ce7c66f130.png)

Let's create our first collection type to store this data.

We will get it started in this post and continue it in the next post.

I want to show how easily we can add content to the Strapi application and get that data from our API.

Let's start by navigating to `Content-Type Builder` under `SINGLE TYPES` and clicking on `create-new-single-type.`

We are going to name it `Home Page`.

![single-type.gif](/images/01-epic-next/single-type.gif)

We will add to text fields.

Text -> Short Text -> Title
Text -> Long Text -> Description

Once done, click save.

Now, let's add some basic data.

![adding-data.gif](/images/01-epic-next/adding-data.gif)

After adding the title text and description, make sure to click publish.

Not let's take a look at how we can get our data from our API using **Insomnia**, but you can also use **Postman**

In future posts, of course, we will be getting out data from our Next.js frontend.

## Getting Our Data via The Strapi API

Now that we have our first data type let's see how we can query it using **Postman** in VS Code.

But first, we must give Strapi permission to serve those endpoints to our client.

Since this is public data, we can accomplish this with the following permissions.

![giving-public-access.gif](/images/01-epic-next/giving-public-access.gif)

Navigate to Settings -> USERS & PERMISSION PLUGIN -> Roles -> Public

Select **Home Page** and check the find checkbox.

We should now be able to access our data by making a `GET` request to `http://localhost:1337/api/home-page`.

Let's give it a try.

![home-page-data.png](/images/01-epic-next/home-page-data.png)

Awesome. We must get our initial **Home Page** data from our endpoint.

```json
{
  "data": {
    "id": 2,
    "documentId": "fcnlk9xwoqmogfxvfim713y4",
    "title": "Home Page",
    "description": "This is our first single type",
    "createdAt": "2024-10-01T18:33:35.081Z",
    "updatedAt": "2024-10-01T18:33:35.081Z",
    "publishedAt": "2024-10-01T18:33:35.090Z",
    "locale": null
  },
  "meta": {}
}
```

With introduction of Strapi 5, we now have a cleaner API response with a new key called `documentId`. Which is a unique identifier for content.  

Even though we return an `id` in the response, we should use the `documentId` for all our requests. 

You can learn more about the changes [here](https://docs.strapi.io/dev-docs/migration/v4-to-v5/breaking-changes/use-document-id).

Before we go, let's call from our front end and see if we can render our initial data.

## Making Our First Fetch Request

Let's see our Next.js and Strapi integration by creating create a basic function to fetch our data inside our Next.js application.

Since we are using Next.js 14, we can use RSC [React Server Components].

Inside our **frontend project**, let's navigate to the `src/app/page.tsx` file.

This is where we added our essential button component to test our CSS.

![home-page-next.png](https://api-prod.strapi.io/uploads/home_page_next_0fd7778971.png)

Let's make the following refactoring to fetch our data.

```tsx
async function getStrapiData(url: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { title, description } = strapiData.data;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </main>
  );
}
```

Once you make the following changes, ensure your project is running, and navigate to `http://localhost:3000`, you should see the next.

![our-first-data.png](https://api-prod.strapi.io/uploads/our_first_data_63fd644587.png)

Excellent job; we now know we can get data from our **backend** to our **frontend**.

We will continue building the home page, navigation, and footer in the next post.

## Conclusion

Amazing job, everyone. We did it, we now have our Next.js and Strapi integration. We have jump-started our Next.js 14 and Strapi journey.

We set up both our frontend and backend of our video summarization app. We are now ready to continue building the rest of the project.

Here is the repo for the project with the current progress.

I want to build this out in public, so feel free to add comments and questions in the GitHub issues.

I hope you had as much fun as I did, and I will see you in the next post.

You can find the project repo [here](https://github.com/PaulBratslavsky/epic-next-strapi-5-update/tree/01-epic-next)

You can check out the first video here if you prefer that format.
