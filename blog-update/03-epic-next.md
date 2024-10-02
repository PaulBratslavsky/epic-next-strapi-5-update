In part 3 of our series, let's finish building out our home page. We will finish up our Hero Section, then move to our Features Section, and finally add our Top Navigation and Footer.

- [Part 1: Learn Next.js by building a website](https://strapi.io/blog/epic-next-js-14-tutorial-learn-next-js-by-building-a-real-life-project-part-1-2)
- [Part 2: Building Out The Hero Section of the homepage](https://strapi.io/blog/epic-next-js-14-tutorial-part-2-building-out-the-home-page)
- **Part 3: Finishup up the homepage Features Section, TopNavigation and Footer**
- [Part 4: How to handle login and Authentification in Next.js](https://strapi.io/blog/epic-next-js-14-tutorial-part-4-how-to-handle-login-and-authentication-in-next-js)
- [Part 5: Building out the Dashboard page and upload file using NextJS server actions](https://strapi.io/blog/epic-next-js-14-tutorial-part-5-file-upload-using-server-actions)
- [Part 6: Get Video Transcript with OpenAI Function](https://strapi.io/blog/epic-next-js-14-tutorial-part-6-create-video-summary-with-next-js-and-open-ai)
- [Part 7: Strapi CRUD permissions](https://strapi.io/blog/epic-next-js-14-tutorial-part-7-next-js-and-strapi-crud-permissions)
- [Part 8: Search & pagination in Nextjs](https://strapi.io/blog/epic-next-js-14-tutorial-part-8-search-and-pagination-in-next-js)
- [Part 9: Backend deployment to Strapi Cloud](https://strapi.io/blog/epic-next-js-14-tutorial-part-9-backend-deployment-to-strapi-cloud)
- [Part 10: Frontend deployment to Vercel](https://strapi.io/blog/epic-next-js-14-tutorial-part-10-frontend-deployment-to-vercel)

Let's refactor our **Hero Section** to use the **Next Image** component.

Instead of using it directly, we will create a new component called **StrapiImage** to add a few additional quality live improvements.

Inside `src/app/components`, create a new file called `strapi-image.tsx` and paste it into the following code.

```tsx
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}
```

You will notice that we have a helper function called `getStrapiMedia`; first, let's add it to our `src/lib/utils.ts` file and then review what it does.

```ts
export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}
```

**getStrapiURL()**:
This function returns the URL of the Strapi API. We are setting our environment name to `NEXT_PUBLIC_`, which will be available in both the server and client components.

**Note:** only set public for none private items when using `NEXT_PUBLIC_`, they will be seen by all. You can learn more in Next.js [docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser).

**getStrapiMedia()**:
This function is designed to process media URLs from the Strapi CMS. It accepts a URL as a string or null.

If the input url is null, the function returns null, which could be used in cases where an image or media file is optional.

If the input URL starts with "data:", it is returned as-is. This condition checks for data URLs, which are URLs that contain actual data (e.g., base64-encoded images) instead of linking to an external resource.

This is often used to embed small images directly in HTML or CSS to reduce the number of HTTP requests.

If the input URL starts with "http" or "//", it is also returned as-is. This covers absolute URLs, meaning the media is hosted outside the Strapi backend (possibly on another domain or CDN).

If none of the above conditions are met, the function assumes the url is a relative path to a resource on the Strapi backend.

In essence, these functions help manage and resolve media URLs in a Next.js application that uses Strapi as a headless CMS, ensuring that the application can handle local and external media resources effectively.

Now that we have our **StrapiImage** component let's use it in our Hero Section.

Navigate to `src/app/components/custom/hero-section.tsx` and make the following changes.

First, import our newly created component.

```jsx
import { StrapiImage } from "@/components/custom/strapi-image";
```

Second, replace the `img` tag with the following.

```jsx
<StrapiImage
  alt={image.alternativeText ?? "no alternative text"}
  className="absolute inset-0 object-cover w-full h-full aspect/16:9"
  src={imageURL}
  height={1080}
  width={1920}
/>
```

Restart the application, and... you will see the following error.

![002-image-error.png](https://api-prod.strapi.io/uploads/002_image_error_08ac2a26d3.png)

Clicking on the link in the error will take you [here](https://nextjs.org/docs/messages/next-image-unconfigured-host), which explains the steps to fix this.

Inside the root of your project, locate the `next.config.mjs` file and make the following change.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
```

Since we have a fall back URL inside our image, we are also referencing it here.

Now, when you restart your application, you should see the following with your image.

![003-image-fix.png](/images/03-epic-next/003-image-fix.png)

Nice, now let's work on our **Features Section**

## Building Out Our Features Section

### Modeling Our Features Section Data In Strapi

Looking at our Features Section UI, we can break it down into the following parts.

![004-hero-section.png](https://api-prod.strapi.io/uploads/004_hero_section_b42b3a0708.png)

We have a section that has repeatable components with the following items.

- Icon
- Heading
- Subheading

So, let's jump into our Strapi Admin and create our **Features Section** Component.

Let's start by navigating to `Content-Type Builder` under `COMPONENTS`, clicking on `Create new component`, and let's call it **Features Section** and save it under the `layout` category.

![005-create-features-section.png](/images/03-epic-next/005-create-features-section.png)

We will create the following fields.

Text -> Short Text - title
Text -> Long Text - description

![006-create-features-fields.png](/images/03-epic-next/006-create-features-fields.png)

Finally, let's create a repeatable component called **Feature** and save it under **components**

![007-create-features-component.gif](/images/03-epic-next/007-create-features-component.gif)

Now, add the following fields.

Text -> Short Text - heading
Text -> Long Text - subHeading
Enum -> with the following options

- CLOCK_ICON
- CHECK_ICON
- CLOUD_ICON

![008-create-features-component-field.gif](/images/03-epic-next/008-create-features-component-field.gif)

Let's add our newly created **Feature Section** component to our home page.

![009-add-features-to-page.gif](/images/03-epic-next/009-add-features-to-page.gif)

Now, let's add some features data and save.

Navigate to **Content Manager**, select the **Home Page**, add the new **Features Section** block, and fill in your features.

![010-adding-data.gif](/images/03-epic-next/010-adding-data.gif)

We are already getting our page data; let's navigate to `src/app/page.tsx` and update our query to populate our `feature` repeatable component.

![011-populate-feature.png](/images/03-epic-next/011-populate-feature.png)

Let's update the `homePageQuery` query with the following changes. Remember in **Strapi 5** we have to user the `on` flag to populate our dynamic zone components.

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
        "layout.features-section": {
          populate: {
            feature: {
              populate: true,
            },
          },
        },
      },
    },
  },
});
```

Also, let's update our `getStrapiData` function to use our new helper method, `getStrapiURL.` So it will look like the following.

```jsx
async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  console.log(url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

Now, let's console log our `block` and see what the response looks like.

```jsx
console.dir(blocks, { depth: null });
```

We should see the following data.

```jsx
[
  {
    __component: "layout.hero-section",
    id: 3,
    heading: "Epic Next.js Tutorial",
    subHeading: "It's awesome just like you.",
    image: {
      id: 1,
      documentId: "fzwtij74oqqf9yasu9mit953",
      url: "/uploads/computer_working_3aee40bab7.jpg",
      alternativeText: null,
    },
    link: { id: 3, url: "/login", text: "Login", isExternal: false },
  },
  {
    __component: "layout.features-section",
    id: 2,
    title: "Features",
    description: "Checkout our cool features.",
    feature: [
      {
        id: 4,
        heading: "Save Time",
        subHeading:
          "No need to watch the entire video. Get the summary and save time.",
        icon: "CLOCK_ICON",
      },
      {
        id: 5,
        heading: "Accurate Summaries",
        subHeading:
          "Our AI-powered tool provides accurate summaries of your videos.",
        icon: "CHECK_ICON",
      },
      {
        id: 6,
        heading: "Cloud Based",
        subHeading: "Access your video. summaries from anywhere at any time.",
        icon: "CLOUD_ICON",
      },
    ],
  },
];
```

Notice that we are getting both our **Hero Section** and **Features Section**

Now, let's create a component to display our feature data.

### Building Our Features Section Data In Next.js

Let's navigate to `src/app/components/custom`, create a file called `features-section.tsx,` and paste it into the following code.

```jsx
function getIcon(name: string) {
  switch (name) {
    case "CLOCK_ICON":
      return ClockIcon;
    case "CHECK_ICON":
      return CheckIcon;
    case "CLOUD_ICON":
      return CloudIcon;
    default:
      return null;
  }
}

export function FeatureSection() {
  return (
    <div className="">
      <div className="flex-1">
        <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <ClockIcon className="w-12 h-12 mb-4 text-gray-900" />
              <h2 className="mb-4 text-2xl font-bold">Save Time</h2>
              <p className="text-gray-500">
                No need to watch the entire video. Get the summary and save
                time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckIcon className="w-12 h-12 mb-4 text-gray-900" />
              <h2 className="mb-4 text-2xl font-bold">Accurate Summaries</h2>
              <p className="text-gray-500">
                Our AI-powered tool provides accurate summaries of your videos.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CloudIcon className="w-12 h-12 mb-4 text-gray-900" />
              <h2 className="mb-4 text-2xl font-bold">Cloud Based</h2>
              <p className="text-gray-500">
                Access your video summaries from anywhere at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
```

We are currently hard-coding our data, which we will update in a moment. But let's navigate to `src/app/page.tsx`, import our newly created component, and see what we get.

```jsx
import { FeatureSection } from "@/components/custom/features-section";
```

And update the `return` statement with the following code.

```jsx
return (
  <main>
    <HeroSection data={blocks[0]} />
    <FeatureSection />
  </main>
);
```

When we restart our application and refresh the page with `command + r`, we should see the following.

![012-features-view.png](/images/03-epic-next/012-features-view.png)

Now, let's pass our data to our component and refactor our **Features Section** component to consume our data from Strapi.

```jsx
return (
  <main>
    <HeroSection data={blocks[0]} />
    <FeatureSection data={blocks[1]} />
  </main>
);
```

And update our **Features Component** code with the following.

```jsx
function getIcon(name: string) {
  switch (name) {
    case "CLOCK_ICON":
      return <ClockIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "CHECK_ICON":
      return <CheckIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "CLOUD_ICON":
      return <CloudIcon className="w-12 h-12 mb-4 text-gray-900" />;
    default:
      return null;
  }
}

interface FeatureProps {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

interface FeatureSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  feature: FeatureProps[];
}

export function FeatureSection({
  data,
}: {
  readonly data: FeatureSectionProps;
}) {
  const { feature } = data;
  console.dir(feature, { depth: null });
  return (
    <div className="">
      <div className="flex-1">
        <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {feature.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
              >
                {getIcon(feature.icon)}
                <h2 className="mb-4 text-2xl font-bold">{feature.heading}</h2>
                <p className="text-gray-500">
                  {feature.subHeading}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

```

Our features component should now be utilizing our Strapi data.

We do have to make one more change in the `page.tsx` file to make our code dynamically display our blocks based on what we get from our response.

To accomplish this, we will create a new function called `blockRenderer` and define it in the `page.tsx` file.

It will look like the following:

```jsx
  const blockComponents = {
    "layout.hero-section": HeroSection,
    "layout.features-section": FeatureSection,
  };

  function blockRenderer(block: any) {
    const Component = blockComponents[block.__component as keyof typeof blockComponents];
    return Component ? <Component key={block.id} data={block} /> : null;
  }
```

We can refactor the code in our `page.tsx` component with the following code.

```jsx
export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  console.dir(strapiData, { depth: null });

  const { blocks } = strapiData?.data || [];
  return <main>{blocks.map(blockRenderer)}</main>;
}
```

The completed code in the `page.tsx` file should look like the following.

```jsx
import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

import { HeroSection } from "@/components/custom/hero-section";
import { FeatureSection } from "@/components/custom/features-section";

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
        "layout.features-section": {
          populate: {
            feature: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  console.log(url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.dir(strapiData, { depth: null });
  const { blocks } = strapiData?.data || [];

  return (
    <main>
      {blocks.map(blockRenderer)}
    </main>
  );
}

```

Let's do one more quick refactor. In `src`, create a new folder named `data` with a file called `loaders.tsx`.

And add the following code.

```ts
import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}
```

We will create a reusable function that will help us construct additional methods to load data.

And finally, let's create a new function, `getHomePageData,` to load our home page data.

```jsx
export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);

  url.search = qs.stringify({
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
          "layout.features-section": {
            populate: {
              feature: {
                populate: true,
              },
            },
          },
        },
      },
    },
  });

  return await fetchData(url.href);
}
```

And finally, in the `pate.tsx` file, let's import this new function and delete the previous one.

Our final code should look like the following.

```jsx
import { getHomePageData } from "@/data/loaders";

import { HeroSection } from "@/components/custom/hero-section";
import { FeatureSection } from "@/components/custom/features-section";

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

export default async function Home() {
  const strapiData = await getHomePageData();

  console.dir(strapiData, { depth: null });

  const { blocks } = strapiData?.data || [];

  return (
    <main>
      {blocks.map(blockRenderer)}
    </main>
  );
}

```

Nice. Let's move on and start working on our **Header** and **Footer**

## Building Our Header and Footer With Strapi and Next.js

![013-header.png](https://api-prod.strapi.io/uploads/013_header_7a5c928abe.png)
![014-footer.png](https://api-prod.strapi.io/uploads/014_footer_b469acebc1.png)

Taking a quick look at our **Header** and **Footer**, we see that they are simple enough. In the header, we have two items, `logo text` and `button.`

In the footer, we have `logo text,` `text,` and `social icons.`

Let's first start by taking a look at how we have represented this data in Strapi.

### Modeling Our Header and Footer Data in Strapi

We are going to store the data for our' Header' and' Footer' using a single type.'

Navigating to `Content-Type Builder` under `SINGLE TYPE` and clicking on `Create new single type.`

We are going to call it `Global`. Go ahead and add the following fields.

Text -> Short Text - title
Text -> Long Text - description

![015-global-content.gif](/images/03-epic-next/015-global-content.gif)

Now, let's create the **Header** component. To start with, it will have two links: logo text and a `call to action` button.

![013-header.png](https://api-prod.strapi.io/uploads/013_header_7a5c928abe.png)

In Strapi, inside the global page, let's add the following component.

![016-add-heading-component.gif](/images/03-epic-next/016-add-heading-component.gif)

- Click on `add another field to this single type.`
- Select the `Component` field type
- `Display Name` will be **Header**
- Select `Category` will be `Layout`
- Click on `Configure the component` button
- In the `Name` field, we will enter **header**
- Finally, click on the `Add the first field to component` button

Now let's create two additional components called `logoText` and `ctaButton` to store our logo text and call to action button data.

Since both will be links, we can reuse a previously created **Link** component.

![017-create-logo-text.gif](/images/03-epic-next/017-create-logo-text.gif)

- Select the `Component` field type
- Click on `Use an existing component`
- Click on the `Select component` button
- Inside the `Select a component` field, select **Link** component
- In the `Name` field, we will enter **logoText**
- Select `Single component` and click the `Finish` button

- Select `Add another field to this component`
- Select the `Component` field type
- Click on `Use an existing component`
- - Click on the `Select a component` button
- In the `Name` field, we will enter **ctaButton**
- Inside the `Select a component` field, select **Link** component
- Select `Single component` and click the `Finish` button
- Select Single component and click the Finish button

The final **Header** component should look like the following.

![019-header.png](/images/03-epic-next/019-header.png)

Now that we are getting the hang of modeling content think about how we can represent our footer.

![020-footer.png](https://api-prod.strapi.io/uploads/020_footer_a56d630928.png)

- logoText
- text
- socialLink

We can create the **Footer** the same way we made our **Header**.

Can you do it on your own?

Our **Footer** will have the following fields.

![021-footer-fields.png](/images/03-epic-next/021-footer-fields.png)

Our footer has the following three items.

If you get stuck at any point, you can always ask in the comments or join us at **Strapi Open Office** hours on [Discord](https://discord.com/invite/strapi) 12:30 pm CST Monday - Friday.

Let's add some data to our **Global** single type.

![022-add-global-content.gif](/images/03-epic-next/022-add-global-content.gif)

Now, let's give the proper permissions so we can access the data from our Strapi API.

Navigate to `Setting` -> `USERS AND PERMISSION PLUGIN` -> `Roles` -> `Public` -> `Global` and check the `find` checkbox. We now should be able to make a `GET` request to `/api/global` and see our data.

![023-permissions.png](/images/03-epic-next/023-permissions.png)

Since we have already learned about Strapi's **Populate**, we can jump straight into our frontend code and implement the function to fetch our **Global** data.

### Fetching Our Global Header and Footer Data

Let's navigate to `src/data/loaders.ts` and create a new function called `getGlobalData`; it should look like the following.

```jsx
export async function getGlobalData() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url.href);
}
```

One thing to notice here is that we are using `array` notation in populate, which is a great way to populate items that don't have many nested items.

If you need more help with **Populate** and **Filtering** in Strapi, check out this [post](https://strapi.io/blog/demystifying-strapi-s-populate-and-filtering).

Now that we have our `getGlobalData` function let's use it.

Since our **Header** and **Footer** will live int the `layout.tsx` file, let's call our function there.

Since we can load data within our **React Server Component**, we can call the function there directly.

First, let's import our function.

```jsx
import { getGlobalData } from "@/data/loaders";
```

Then, update the **RootLayout** with the following code.

```jsx
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const globalData = await getGlobalData();
  console.dir(globalData, { depth: null });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

The complete code should look like the following.

```jsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { getGlobalData } from "@/data/loaders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const globalData = await getGlobalData();
  console.dir(globalData, { depth: null });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

Nice. Now restart your Next.js application, and we should see the following output in the terminal console.

```js
{
  data: {
    id: 2,
    documentId: 'fyj7ijjnkxy75h1cbusrafj2',
    title: 'Global Page',
    description: 'Responsible for our header and footer.',
    createdAt: '2024-10-02T18:44:37.585Z',
    updatedAt: '2024-10-02T18:44:37.585Z',
    publishedAt: '2024-10-02T18:44:37.594Z',
    locale: null,
    header: {
      id: 2,
      ctaButton: { id: 11, url: '/', text: 'Login', isExternal: false },
      logoText: { id: 10, url: '/', text: 'Summarize AI', isExternal: false }
    },
    footer: {
      id: 2,
      text: 'Made with love by Paul',
      socialLink: [
        {
          id: 13,
          url: 'www.youtube.com',
          text: 'YouTube',
          isExternal: true
        },
        {
          id: 14,
          url: 'www.twitter.com',
          text: 'Twitter',
          isExternal: true
        },
        {
          id: 15,
          url: 'www.linkedin.com',
          text: 'LinkedIn',
          isExternal: true
        }
      ],
      logoText: { id: 12, url: '/', text: 'Summarize AI', isExternal: false }
    }
  },
  meta: {}
}

```

That is amazing.

### Building Our Header In Next.js

Alright, let's build out our **Header** component for our top navigation.

![013-header.png](https://api-prod.strapi.io/uploads/013_header_7a5c928abe.png)

Just as a reminder, our logo has two items. A **logo** and **button** , so let's first create our `Logo` component.

Navigate to `src/app/components/custom`, create a file called `logo.tsx,` and add the following code.

```jsx
import Link from "next/link";

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

interface LogoProps {
  text?: string;
  dark?: boolean;
}

export function Logo({
  text = "Logo Text",
  dark = false,
}: Readonly<LogoProps>) {
  return (
    <Link className="flex items-center gap-2" href="/">
      <MountainIcon className={"h-6 w-6  text-pink-500"} />
      <span
        className={`text-lg font-semibold ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {text}
      </span>
    </Link>
  );
}
```

It is a simple component that expects `text` as a prop to display the name of our site and a `dark` prop to allow us to make the text white on dark backgrounds.

Next, let's create our actual **Header** component. Navigate to `src/app/components/custom`, create a file called `header.tsx,` and add the following code.

```jsx
import Link from "next/link";
import { Logo } from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    }
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  }
}

export async function Header({ data }: Readonly<HeaderProps>) {
  const { logoText, ctaButton } = data;
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text}/>
      <div className="flex items-center gap-4">
        <Link href={ctaButton.url}><Button>{ctaButton.text}</Button></Link>
      </div>
    </div>
  );
}

```

The component expects our `header` props, which we already get from our `getGlobalData` function found in the `layout.tsx` file.

So let's navigate to `src/app/layout.tsx` file and make the following updates.

First, let's import our **Header** component.

```jsx
import { Header } from "@/components/custom/header";
```

Next, make the following change in the `return` statement.

```jsx
return (
  <html lang="en">
    <body className={inter.className}>
      <Header data={globalData.data.header} /> // add our header and pass in the
      data
      <div>{children}</div>
    </body>
  </html>
);
```

Restart your project, and you should now see our awesome top navigation.

![024-top-nav.png](/images/03-epic-next/024-top-nav.png)

### Building Our Footer In Next.js

Now, let's go ahead and build out our footer.

Our footer will display the following items.

![020-footer.png](https://api-prod.strapi.io/uploads/020_footer_a56d630928.png)

Navigate to `src/app/components/custom,` create a file called `footer.tsx,` and add the following code.

```jsx
import Link from "next/link";
import { Logo } from "@/components/custom/Logo";

interface SocialLink {
  id: number;
  text: string;
  url: string;
}

interface FooterProps {
  data: {
    logoText: {
      id: number,
      text: string,
      url: string,
    },
    text: string,
    socialLink: SocialLink[],
  };
}

function selectSocialIcon(url: string) {
  if (url.includes("youtube")) return <YoutubeIcon className="h-6 w-6" />;
  if (url.includes("twitter")) return <TwitterIcon className="h-6 w-6" />;
  if (url.includes("github")) return <GithubIcon className="h-6 w-6" />;
  return null;
}

export function Footer({ data }: Readonly<FooterProps>) {
  const { logoText, socialLink, text } = data;
  return (
    <div className="dark bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <Logo dark text={logoText.text} />
        <p className="mt-4 md:mt-0 text-sm text-gray-300">{text}</p>
        <div className="flex items-center space-x-4">
          {socialLink.map((link) => {
            return (
              <Link
                className="text-white hover:text-gray-300"
                href={link.url}
                key={link.id}
              >
                {selectSocialIcon(link.url)}
                <span className="sr-only">Visit us at {link.text}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
```

The code is responsible for rendering our **Footer** data.

**selectSocialIcon(url: string)**: A function that determines which social media icon to display based on the URL provided. It supports YouTube, Twitter, and GitHub, returning the corresponding icon component or null if the URL does not match these platforms.

**note**: When adding social links, I only included Twitter, Github, and YouTube. If you have additional links, you will need to add more icons to represent them.

Here is what my response looks like with my social links.

```js
[
  {
    id: 25,
    url: "www.youtube.com",
    text: "YouTube",
    isExternal: true,
  },
  {
    id: 26,
    url: "www.twitter.com",
    text: "Twitter",
    isExternal: true,
  },
  {
    id: 27,
    url: "www.github.com",
    text: "GitHub",
    isExternal: true,
  },
];
```

Now that we have completed our footer, let's add it to the layout.tsx file in the root of our app folder.

First, let's import our **Footer** component.

```jsx
import { Footer } from "@/components/custom/footer";
```

Next, make the following change in the `return` statement.

```jsx
return (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header data={globalData.data.header} />
      {children}
      <Footer data={globalData.data.footer} />
    </body>
  </html>
);
```

Now, if you restart the Next.js application, you should see the following changes.

![025-footer-data.png](https://api-prod.strapi.io/uploads/025_footer_data_0902f2d26e.png)

Yay, we are now getting our data from our Strapi API.

If you don't see the changes, it is because Next.js is caching our old data.

## Let's revisit Next.js Data Caching

Next.js caching is a big topic, so make sure to read the docs [here](https://nextjs.org/docs/app/building-your-application/caching)

In the current state of our app, Next.js is caching our data.

You will get the following output if we run `yarn build`.

```bash
 ✓ Generating static pages (5/5)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         96.3 kB
└ ○ /_not-found                          885 B          85.2 kB
+ First Load JS shared by all            84.3 kB
  ├ chunks/69-3c42ded033075db6.js        29 kB
  ├ chunks/fd9d1056-c7082c319cc53ced.js  53.4 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)  prerendered as static content

✨  Done in 10.65s.

```

Our content is statically generated, so to update our app with the changes, we would have to rebuild our site.

There are two ways we can handle this in `development` while we are working with our app.

We can keep everything as is and use `command-shift-r` to reload the cache, which I was reminded of when chatting with Lee Robinson. I always forget about this. You can follow him on [Twitter](https://twitter.com/leeerob).

Or we can opt out of caching. Outside of the previous method discussed, we can use the `noStore` function; you can read more about it [here](https://nextjs.org/docs/app/api-reference/functions/unstable_noStore).

I will show the code for the `noStore` function, but in this tutorial, we will just use `command-shift-r` to refresh the cache.
So, let's navigate to our `src/data/loaders.ts` file, you can make the following changes.

First, let's import the `noStore` function.

```bash
import { unstable_noStore as noStore } from 'next/cache';
```

Now, let's use it inside the `getGlobalData` that is responsible for our social links.

```ts
export async function getGlobalData() {
  noStore();
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url.href);
}
```

Now run the `yarn build` command, and you will see the following output.

```bash
Route (app)                              Size     First Load JS
┌ λ /                                    5.2 kB         96.3 kB
└ λ /_not-found                          885 B          85.2 kB
+ First Load JS shared by all            84.3 kB
  ├ chunks/69-3c42ded033075db6.js        29 kB
  ├ chunks/fd9d1056-c7082c319cc53ced.js  53.4 kB
  └ other shared chunks (total)          1.86 kB


λ  (Dynamic)  server-rendered on demand using Node.js

✨  Done in 10.48s.
```

Notice that our `/` route now has the `λ` symbol, which demonstrates that it is now server-rendered on demand.

This is due to using `noStore` please note Even though `noStore` is defined at the component level, the entire route becomes dynamic.

If we reorder our social links in our **Strapi Admin** panel now, our changes will reflect on our Next.js frontend.

note: you don't need to use `noStore` I just wanted to show you that it exists, and you can continue to refresh the site with `command-shift-r`.

In future posts we will take look how to use `revalidatePath` to revalidate our cache.

## How To Populate Our Metadata Dynamically In Next.js

We have a `title` and `description` on our **Global** page in Strapi.

![033-metadata.png](/images/03-epic-next/033-metadata.png)

Let's use it as our `metadata` information in our app.

Let's look at the `src/app/layout.tsx` file. We will see the following.

```jsx
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```

This is one way to set metadata in Next.js, but as you notice, it is hardcoded. Let's look at how we can add metadata dynamically.

To dynamically populate our metadata, we must fetch it using our `metadata` function.

We already have our `getGlobalData`, but that function returns not just the `title` and `description` but also the rest of our data to populate our **Header** and **Footer**.

Let's create a new function called `getGlobalPageMetadata,` which only returns the `title` and `description` fields.

Let's navigate to `src/data/loaders.ts` and add the following code.

```jsx
export async function getGlobalPageMetadata() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    fields: ["title", "description"],
  });

  return await fetchData(url.href);
}
```

In the function above, we ask Strapi to return only the `title` and `description,` which are the only data we need for our metadata.

The response will look like the following.

```js
data: {
  id: 4,
  documentId: 'fyj7ijjnkxy75h1cbusrafj2',
  title: 'Global Page',
  description: 'Responsible for our header and footer.'
},

```

Let's implement dynamic metadata inside our `layout.tsx` file.

Let's update our current `metadata` function with the following.

First, let's import the following.

```jsx
import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";
```

Now, replace the previous `export const metadata: Metadata` with the following code.

```jsx
export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();
  const { title, description } = metadata?.data;

  return {
    title: title ?? "Epic Next Course",
    description: description ?? "Epic Next Course",
  };
}
```

Now, our metadata is dynamically set from our Strapi Api.

The completed code should look like the following:

```jsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";

import { Header } from "@/components/custom/header";
import { Footer } from "@/components/custom/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();
  const { title, description } = metadata?.data;

  return {
    title: title ?? "Epic Next Course",
    description: description ?? "Epic Next Course",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const globalData = await getGlobalData();
  console.dir(globalData, { depth: null });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header data={globalData.data.header} />
        {children}
        <Footer data={globalData.data.footer} />
      </body>
    </html>
  );
}
```

Nice job.

## How To Create A Not Found Page In Next.js

Our landing page looks great, but we have a small problem. We have not yet implemented the `login` page, so when we click our link, we get the default not found page.

![028-not-found-old.gif](https://api-prod.strapi.io/uploads/028_not_found_old_f9a90f4139.gif)

But why, if we wanted to make it prettier, how can we accomplish this?

Well, we can create the `not-found.js` page. You can learn more about it [here](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) in the Next.js docs.

Navigate to `src/app,` create a file called `not-found.tsx,` and add the following code.

```jsx
import Link from "next/link";

export default function NotFoundRoot() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <BugIcon className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This page has left the building.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  );
}
```

Now restart your app and navigate to our `login` page. You will be treated to this nicer page. It can be better, but you get the point.

![029-not-found-new.gif](https://api-prod.strapi.io/uploads/029_not_found_new_ac2c9e5e08.gif)

Wouldn't it be nice to show a loaded spinner when navigation pages are displayed? Yes, it would. Let's see how we can do that.

## How To Create A Loading Page In Next.js

There are many ways to handle the loading state in Next.js; we will start with the simplest one.

This creates a file called `loading.tsx`. You can read about other ways [here](https://nextjs.org/docs/app/api-reference/file-conventions/loading).

Navigate to `src/app`, create a file called `loading.tsx`, and add the following code.

```jsx
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="animate-spin h-12 w-12 border-t-4 border-pink-600 rounded-full" />
    </div>
  );
}
```

That is all we need to do. Now, let's restart our application and see the amazing loader in action. If you find my loader too boring, feel free to add your own design flair to your application.

![030-loading-page.gif](https://api-prod.strapi.io/uploads/030_loading_page_3927de1faf.gif)

Finally, let's take a look at how we can handle errors in our application.

## How To Handle Errors In Next.js

Now, let's examine how to handle errors in Next.js to prevent our app from crashing completely.

Right now, if I go to the `src/data/loaders.ts` and add the following, I can throw an error inside the `getHomePageData` function.

```ts
throw new Error("Test error");
```

The complete function will look like the following.

```ts
export async function getHomePageData() {
  throw new Error("Test error");

  const url = new URL("/api/home-page", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });

  return await fetchData(url.href);
}
```

Our app will break with an ugly error.

![031-error.png](https://api-prod.strapi.io/uploads/031_error_b13465b9bb.png)

We can fix this by creating an `error.ts` file to break our app gracefully. You can read more about Next.js errors [here](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

Let's create a file called `error.tsx` inside our app folder and paste it into the following code.

```jsx
"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Error({
  error,
}: {
  error: Error & { digest?: string },
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <BugIcon className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This is an error page. Please try again later.
        </p>
        <p className="text-pink-800 italic">{error.message}</p>
      </div>
    </div>
  );
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
    >
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  );
}
```

Now, when our app crashes, it does not look as scary.

![032-pretty-error.png](https://api-prod.strapi.io/uploads/032_pretty_error_0451782ff0.png)
Let's see if we can fix this.

Excellent, we covered a lot in this post. Let's do a quick recap of what we covered.

## Conclusion

In Part 3 of the Epic Next.js 14 Tutorial series, we focused on completing the home page design of a real-life project. The tutorial covered several key areas:

**Refactoring the Hero Section**: we refactored the Hero Section to use the Next.js Image component for optimized image handling. This included creating a custom StrapiImage component for additional quality-of-life improvements.

**Building the Features Section**: This Section involved modeling the Features Section data in Strapi, creating corresponding components in Next.js, and implementing functionality to display features dynamically from the Strapi CMS.

**Displaying Dynamic Meta Data**: We examined how to get our metadata from Strapi and display it on our `layout.tsx` page.

**Top Header and Footer**: We created our Header and Footer, leveraging Strapi to manage and fetch global data like logo texts and social links.

We finished by covering how to handle **loading**, **not found**, and **errors** pages.

I can't wait to see the next post, where we cover how to create our **Sign In** and **Sign Up** pages. This will include form validation with `Zod`, handling form submission with `server actions`, creating and storing `http only` cookies, and protecting our routes with Next.js `middleware`.

I am so excited. Thanks for checking out this post. I look forward to seeing you in the next one.
