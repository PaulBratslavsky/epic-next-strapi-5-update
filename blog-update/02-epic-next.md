This post is part 2 of many in our Epic Next.js Series. You can find the outline for upcoming posts here.

- [Part 1: Learn Next.js by building a website](https://strapi.io/blog/epic-next-js-14-tutorial-learn-next-js-by-building-a-real-life-project-part-1-2)
- **Part 2: Building Out The Hero Section of the homepage**
- [Part 3: Finishup up the homepage Features Section, TopNavigation and Footer](https://strapi.io/blog/epic-next-js-14-tutorial-learn-next-js-by-building-a-real-life-project-part-3)
- [Part 4: How to handle login and Authentification in Next.js](https://strapi.io/blog/epic-next-js-14-tutorial-part-4-how-to-handle-login-and-authentication-in-next-js)
- [Part 5: Building out the Dashboard page and upload file using NextJS server actions](https://strapi.io/blog/epic-next-js-14-tutorial-part-5-file-upload-using-server-actions)
- [Part 6: Get Video Transcript with OpenAI Function](https://strapi.io/blog/epic-next-js-14-tutorial-part-6-create-video-summary-with-next-js-and-open-ai)
- [Part 7: Strapi CRUD permissions](https://strapi.io/blog/epic-next-js-14-tutorial-part-7-next-js-and-strapi-crud-permissions)
- [Part 8: Search & pagination in Nextjs](https://strapi.io/blog/epic-next-js-14-tutorial-part-8-search-and-pagination-in-next-js)
- [Part 9: Backend deployment to Strapi Cloud](https://strapi.io/blog/epic-next-js-14-tutorial-part-9-backend-deployment-to-strapi-cloud)
- [Part 10: Frontend deployment to Vercel](https://strapi.io/blog/epic-next-js-14-tutorial-part-10-frontend-deployment-to-vercel)

In this post, we will start by building our home page. We will focus on the **Hero Component** and **Features Component** and use **Dynamic Zone** to allow our Strapi admins to choose which component they want to use.

![home-page.gif](https://api-prod.strapi.io/uploads/home_page_9929dbf0fc.gif)

If you missed the first part of this series, you can check it out [here](https://strapi.io/blog/epic-next-js-14-tutorial-learn-next-js-by-building-a-real-life-project-part-1-2).

Once our data is returned by our Strapi API, we will build out those same components within our Next JS app.

Our goal is to display our Hero Section and Features Sections on our Next application. So let's get started.

## Structuring Our Data In Strapi

In Strapi, there are many ways of structuring your data; you can create `single types,` `collection types,` and `components` that allow you to create reusable content types that you can use in multiple places.

We will build our Hero Section and Features Section as components.

Let's start by building out our Hero Section Component.

### Building The Hero Section Component

Looking at our Hero Section UI, we can break it down into the following parts.

![02-hero-section.png](https://api-prod.strapi.io/uploads/02_hero_section_8b4caaf156.png)

We have the following items:

- Image
- Heading
- Subheading
- Link

So, let's jump into our Strapi Admin and create our Hero Component.

Let's start by navigating to `Content-Type Builder` under `COMPONENTS` and clicking on `Create new component.`

We will call it **Hero Section** and save it under **layout**.

![001-create-hero-component.gif](https://delicate-dawn-ac25646e6d.media.strapiapp.com/001_create_hero_component_7f49a17aae.gif)

We will create the following fields.

Media -> Single Media - image
Text -> Short Text - heading
Text -> Long Text - subHeading

Note: Change it to only allow images for media in advanced settings.

![002-add-fields-to-hero.gif](https://delicate-dawn-ac25646e6d.media.strapiapp.com/002_add_fields_to_hero_1ab580efd7.gif)

For our link, we will create a component that we can reuse.

Go ahead and create a new component called **Link** and save it under **components**.

![004-create-link-component.gif](https://delicate-dawn-ac25646e6d.media.strapiapp.com/004_create_link_component_df0aff0fb4.gif)

Our Link component will have the following fields.
Text -> Short Text -> href
Text -> Short Text -> label
Boolean -> isExternal

Note: for isExternal in the advanced setting, change the default value to be set to false.

Let's go ahead and add them now.

![2025-08-12_12-01-11.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/2025_08_12_12_01_11_1a341c304d.png)

Finally, please return to our **Hero Section** component and add our newly created **Link** component.

![007-adding-link-component-to-hero.gif](https://delicate-dawn-ac25646e6d.media.strapiapp.com/007_adding_link_component_to_hero_2fc31daf85.gif)

The completed fields in our **Hero Section** component should look like the following:

![008-hero-section-fields.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/008_hero_section_fields_f5558903cb.png)

Finally, let's add our newly created component to our **Home Page** via dynamic zones.

![09-add-hero-to-home-page.gif](https://delicate-dawn-ac25646e6d.media.strapiapp.com/09_add_hero_to_home_page_60238e06f7.gif)

We can accomplish this by going to `Content-Type Builder,` selecting the **Home Page** under `SINGLE TYPES` and clicking on `Add another field to this single type.`

Select the `Dynamic Zone` field, give it a name called `blocks,` and click `Add components to the zone.`

Finally, select `Use an existing component` and choose our **Hero Section** component.

![009-add-blocks.gif](https://delicate-dawn-ac25646e6d.media.strapiapp.com/009_add_blocks_9fbf76b46e.gif)

Great, we now have our first component that has been added to our **Home Page**

Before creating our **Features Section** component, let's see if we can get our current component from our API.

### Fetching The Hero Section Component Data

First, let's add some data.

![009-add-content.gif](https://delicate-dawn-ac25646e6d.media.strapiapp.com/009_add_content_953de3ee41.gif)

Now make sure that we have proper permission in the **Settings**

![2025-08-12_12-45-36.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/2025_08_12_12_45_36_2a05a06cec.png)

Now, let's test our API call in **Postman**. But before we do, we need to specify in Strapi all the items we would like to populate.

Looking at our content, we need to populate the following items: `blocks,` `image,` and `link.`

![2025-08-12_12-47-59.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/2025_08_12_12_47_59_7e0d708f67.png)

Before we construct our query, quick note, as of Strapi 5, we need to use the `on` flag to populate our dynamic zones data.

You can learn more about it in the [Strapi docs](https://docs.strapi.io/dev-docs/api/document-service/populate#components--dynamic-zones).

Remember, we can construct our query using the [Strapi Query Builder](https://docs.strapi.io/dev-docs/api/rest/interactive-query-builder).

We can populate our data with the following query.

```js
{
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"]
            },
            link: {
              populate: true
            }
          }
        }
      }
    }
  },
}

```

Using the query builder, the following LHS syntax query will be generated.

![13-home-query.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/13_home_query_9dc813229d.png)

`http://localhost:1337/api/home-page?populate[blocks][on][layout.hero-section][populate][image][fields][0]=url&populate[blocks][on][layout.hero-section][populate][image][fields][1]=alternativeText&populate[blocks][on][layout.hero-section][populate][link][populate]=true`

Here is the [complete URL](http://localhost:1337/api/home-page?populate[blocks][on][layout.hero-section][populate][image][fields][0]=url&populate[blocks][on][layout.hero-section][populate][image][fields][1]=alternativeText&populate[blocks][on][layout.hero-section][populate][link][populate]=true)

![Screenshot 2025-08-12 at 12.54.45 PM.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/Screenshot_2025_08_12_at_12_54_45_PM_ead08c81a3.png)

We will get the following data after making a `GET` request in **Postman**.

```json
{
  "data": {
    "id": 3,
    "documentId": "upcn80a2a51ius5n36sbwlst",
    "title": "Home Page",
    "description": "This is our first single content type.",
    "createdAt": "2025-08-11T17:58:48.636Z",
    "updatedAt": "2025-08-12T17:38:05.251Z",
    "publishedAt": "2025-08-12T17:38:05.260Z",
    "blocks": [
      {
        "__component": "layout.hero-section",
        "id": 2,
        "heading": "Epic Next.js Tutorial!",
        "subHeading": "It is awesome, just like you.",
        "image": {
          "id": 2,
          "documentId": "bqs73cv7n0r7c08bsi2rdsww",
          "url": "/uploads/pexels_anna_nekrashevich_7552374_00d755b030.jpg",
          "alternativeText": null
        },
        "link": {
          "id": 2,
          "href": "/login",
          "label": "Login",
          "isExternal": null
        }
      }
    ]
  },
  "meta": {}
}
```

Now that we know our Strapi API works, let's move into the frontend of our project, fetch our new data, and create our **Hero Section** React component.

## Fetching Our Home Page Data In The Frontend

Taking a look at our frontend code, this is what we have so far.

```js
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

If we console log `strapiData,` we will notice that we are not yet getting all our fields.

```js
{
    "data": {
        "id": 3,
        "documentId": "upcn80a2a51ius5n36sbwlst",
        "title": "Home Page",
        "description": "This is our first single content type.",
        "createdAt": "2025-08-11T17:58:48.636Z",
        "updatedAt": "2025-08-12T17:38:05.251Z",
        "publishedAt": "2025-08-12T17:38:05.260Z"
    },
    "meta": {}
}
```

That is because we need to tell Strapi what items we would like to populate. We already know how to do this; it is what we did earlier in the section when using **Strapi Query Builder**.

We will use the query that we defined previously.

```js
{
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"]
            },
            link: {
              populate: true
            }
          }
        }
      }
    }
  },
}
```

But to make this work, we must first install the `qs` package from NPM. You can learn more about it [here](https://www.npmjs.com/package/qs).

It will allow us to generate our query string by passing our object from above. Later in the tutorial, we will look at how prepopulate our date vie route middleware.

Let's run the following two commands in the front end of our project.

This will add `qs`.

```bash
  yarn add qs
```

This will add the types.

```bash
  yarn add @types/qs
```

Now that we have installed our `qs` package, we can construct our query and refactor our `getStrapiData` function.

Let's add the following changes to your `page.tsx` file.

First let's import the `qs` library.

```jsx
import qs from "qs";
```

Define our query.

```jsx
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
});
```

Finally, let's update our `getStrapiData` function.

We will use the `URL` to construct our final path; you can learn more about it in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL).

Our updated function will look like the following.

```jsx
async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

The final code will look as follows:

```jsx
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.dir(strapiData.data, { depth: null });
  const { title, description } = strapiData.data;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </main>
  );
}
```

When we look at our response in the terminal, we should see that Strapi has returned all of our requested data.

```js
{
  id: 3,
  documentId: 'upcn80a2a51ius5n36sbwlst',
  title: 'Home Page',
  description: 'This is our first single content type.',
  createdAt: '2025-08-11T17:58:48.636Z',
  updatedAt: '2025-08-12T17:38:05.251Z',
  publishedAt: '2025-08-12T17:38:05.260Z',
  blocks: [
    {
      __component: 'layout.hero-section',
      id: 2,
      heading: 'Epic Next.js Tutorial!',
      subHeading: 'It is awesome, just like you.',
      image: {
        id: 2,
        documentId: 'bqs73cv7n0r7c08bsi2rdsww',
        url: '/uploads/pexels_anna_nekrashevich_7552374_00d755b030.jpg',
        alternativeText: null
      },
      link: { id: 2, href: '/login', label: 'Login', isExternal: null }
    }
  ]
}Ï
```

## Let's Create Our Hero Section Component

Before we can render our section data, let's create our **Hero Section** component.

We will start with the basics to ensure that we can display our data, and then we will style the UI with Tailwind and Shadcn.

Inside the `components` let's create a new folder called `custom`, this is where we will add all of our components that we will create.

Inside the `custom` folder let's create a bare component called `hero-section.tsx`.

We will add the following code to get started.

```jsx
export function HeroSection({ data } : { readonly data: any }) {
  console.dir(data, { depth: null })
  return (
    <div>Hero Section</div>
  )
}
```

We will update the types later, but for now we will do the `I don't know TS` and just use `any`;

Now that we have our basic component, let's import in our home page and use it.

```jsx
import qs from "qs";
import { HeroSection } from "@/components/custom/hero-section";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.dir(strapiData.data, { depth: null });
  const { title, description, blocks } = strapiData.data;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
      <HeroSection data={blocks} />
    </main>
  );
}
```

We should see the following output when running our app. Notice we are able to see our **HeroSection** component.

![15-hero-section-component.png](https://api-prod.strapi.io/uploads/15_hero_section_component_51ed378126.png)

Now let's build out our component. Let's add the following code to get us started.

```jsx
import Link from "next/link";

const styles = {
  header: "relative h-[600px] overflow-hidden",
  backgroundImage: "absolute inset-0 object-cover w-full h-full",
  overlay:
    "relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black/50",
  heading: "text-4xl font-bold md:text-5xl lg:text-6xl",
  subheading: "mt-4 text-lg md:text-xl lg:text-2xl",
  button:
    "mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100 transition-colors",
};

export function HeroSection({ data }: { data: any }) {
  console.dir(data, { depth: null });
  return (
    <header className={styles.header}>
      <img
        alt="Background"
        className={styles.backgroundImage}
        height={1080}
        src="https://images.pexels.com/photos/7552374/pexels-photo-7552374.jpeg"
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className={styles.overlay}>
        <h1 className={styles.heading}>Summarize Your Videos</h1>
        <p className={styles.subheading}>
          Save time and get the key points from your videos
        </p>
        <Link className={styles.button} href="/login">
          Login
        </Link>
      </div>
    </header>
  );
}
```

Everything is currently hardcoded but we will fix it in just a little bit.

And do make sure that everything looks good, let's update our code in `page.tsx` to remove the original styles we added in the `<main>` html tag.

```jsx
return (
  <main>
    <HeroSection data={blocks[0]} />
  </main>
);
```

Now our UI should look like the following.

![Screenshot 2025-08-12 at 1.41.10 PM.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/Screenshot_2025_08_12_at_1_41_10_PM_f219286e7d.png)

And the final code in the `page.tsx` file should reflect the following changes.

```jsx
import qs from "qs";
import { HeroSection } from "@/components/custom/hero-section";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.dir(strapiData.data, { depth: null });
  const { blocks } = strapiData.data;

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
```

## Continue Working On Our Hero Section Component

Going back to the `hero-section.tsx` file, let's go ahead and display our Strapi data.

This is what our data looks like.

```js
{
  __component: 'layout.hero-section',
  id: 2,
  heading: 'Epic Next.js Tutorial!',
  subHeading: 'It is awesome, just like you.',
  image: {
    id: 2,
    documentId: 'bqs73cv7n0r7c08bsi2rdsww',
    url: '/uploads/pexels_anna_nekrashevich_7552374_00d755b030.jpg',
    alternativeText: null
  },
  link: { id: 2, href: '/login', label: 'Login', isExternal: null }
}
```

We’ll use this response structure to define our types and interfaces.

First, create a new folder named `types` inside the `src` directory, and add an `index.ts` file:

Next, we’ll define the following interfaces inside that file.

```tsx
type TImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
};

type TLink = {
  id: number;
  href: string;
  label: string;
};

export interface IHeroSection {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: TImage;
  link: TLink;
}
```

And update our **HeroSection** component to use our types.

```js
import { IHeroSection } from "@/types";

export function HeroSection({ data }: { data: IHeroSection }) {
  // ...rest of the code
}
```

Finally, let's add our data from Strapi instead of hard coding it by making the following changes to our **HeroSection** component.

```tsx
import Link from "next/link";
import { IHeroSection } from "@/types";

const styles = {
  header: "relative h-[600px] overflow-hidden",
  backgroundImage: "absolute inset-0 object-cover w-full h-full",
  overlay:
    "relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black/50",
  heading: "text-4xl font-bold md:text-5xl lg:text-6xl",
  subheading: "mt-4 text-lg md:text-xl lg:text-2xl",
  button:
    "mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100 transition-colors",
};

export function HeroSection({ data }: { data: IHeroSection }) {
  if (!data) return null;
  const { heading, subHeading, image, link } = data;

  console.dir(data, { depth: null });
  return (
    <header className={styles.header}>
      <img
        alt="Background"
        className={styles.backgroundImage}
        height={1080}
        src="https://images.pexels.com/photos/7552374/pexels-photo-7552374.jpeg"
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className={styles.overlay}>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.subheading}>{subHeading}</p>
        <Link className={styles.button} href={link.href}>
          {link.label}
        </Link>
      </div>
    </header>
  );
}
```

We are now getting and displaying our data from Strapi but here are still more improvements that we must make in this component. I also updated the \*heading** and **subHeading\*\* text with in Strapi Admin to reflect the app that we are building.

**note:** we are still hard coding the image, and is something we will fix in the next sextion.

![Screenshot 2025-08-12 at 1.45.22 PM.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/Screenshot_2025_08_12_at_1_45_22_PM_d009cc9889.png)
![Screenshot 2025-08-12 at 1.28.43 PM.png](https://delicate-dawn-ac25646e6d.media.strapiapp.com/Screenshot_2025_08_12_at_1_28_43_PM_db3727bc4a.png)

Like to use Next **Image** and not have to hard code "http://localhost:1337" path that we append to our image url but instead should get it from our `.env` variable.

We will do this in the next post, where we will finish up our **Hero Section** component and start working on the **Features Component**

## Conclusion

We are making some great progress. In this post, we started working on displaying our **Hero Section** content.

In the next post, we will create the **StrapiImage** component using the Next **Image** component to make rendering Strapi images easier.

Finish up our **Hero Section** and start working on our **Features Section**.

I hope you are enjoying this series so far. Thank you for your time, and I will see you in the next one.

### Note about this project

This project has been updated to use Next.js 15 and Strapi 5.

If you have any questions, feel free to stop by at our [Discord Community](https://discord.com/invite/strapi) for our daily "open office hours" from 12:30 PM CST to 1:30 PM CST.

Feel free to make PRs to fix any issues you find in the project or let me know if you have any questions.

Happy coding!

Paul
