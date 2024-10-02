This post is part 2 of many in our Epic Next.js Series.  You can find the outline for upcoming posts here.

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

![03-create-first-component.gif](/images/02-epic-next/03-create-first-component.gif)

We will create the following fields.

Media -> Single Media - image
Text -> Short Text - heading
Text -> Long Text - subHeading

Note: Change it to only allow images for media in advanced settings.

![04-create-hero-section.gif](/images/02-epic-next/04-create-hero-section.gif)

For our link, we will create a component that we can reuse.

Go ahead and create a new component called **Link** and save it under **components**.

![05-create-link-component.gif](/images/02-epic-next/05-create-link-component.gif)

Our Link component will have the following fields.
Text -> Short Text -> url
Text -> Short Text -> text
Boolean -> isExternal

Note: for isExternal in the advanced setting, change the default value to be set to false.

Let's go ahead and add them now.

![06-adding-link-fields.gif](/images/02-epic-next/06-adding-link-fields.gif)

Finally, please return to our **Hero Section** component and add our newly created **Link** component.

![07-adding-link-component.gif](/images/02-epic-next/07-adding-link-component.gif)

The completed fields in our **Hero Section** component should look like the following:

![08-hero-section-fields.png](/images/02-epic-next/08-hero-section-fields.png)

Finally, let's add our newly created component to our **Home Page** via dynamic zones.

![09-add-hero-to-home-page.gif](/images/02-epic-next/09-add-hero-to-home-page.gif)

We can accomplish this by going to `Content-Type Builder,` selecting the **Home Page** under `SINGLE TYPES` and clicking on `Add another field to this single type.`

Select the `Dynamic Zone` field, give it a name called `blocks,` and click `Add components to the zone.`

Finally, select `Use an existing component` and choose our **Hero Section** component.

Great, we now have our first component that has been added to our **Home Page**

Before creating our **Features Section** component, let's see if we can get our current component from our API.

### Fetching The Hero Section Component Data

First, let's add some data.

![10-adding-data-home-page.gif](/images/02-epic-next/10-adding-data-home-page.gif)

Now make sure that we have proper permission in the **Settings**

![11-permissions.png](/images/02-epic-next/11-permissions.png)

Now, let's test our API call in **Postman**. But before we do, we need to specify in Strapi all the items we would like to populate.

Looking at our content, we need to populate the following items: `blocks,` `image,` and `link.`

![12-home-populate.png](/images/02-epic-next/12-home-populate.png)

Before we construct our query, quick note, as of Strapi 5, we need to use the `on` flag to populate our dynamic zones data.

You can learn more about it in the [Strapi docs](https://docs.strapi.io/dev-docs/api/document-service/populate#components--dynamic-zones).

Remember, we can construct our query using the [Strapi Query Builder](https://docs.strapi.io/dev-docs/api/rest/interactive-query-builder).

We can populate our data with the following query.

``` js
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

![13-home-query.png](/images/02-epic-next/13-home-query.png)

`http://localhost:1337/api/home-page?populate[blocks][on][layout.hero-section][populate][image][fields][0]=url&populate[blocks][on][layout.hero-section][populate][image][fields][1]=alternativeText&populate[blocks][on][layout.hero-section][populate][link][populate]=true`


Here is the [complete URL](http://localhost:1337/api/home-page?populate[blocks][on][layout.hero-section][populate][image][fields][0]=url&populate[blocks][on][layout.hero-section][populate][image][fields][1]=alternativeText&populate[blocks][on][layout.hero-section][populate][link][populate]=true)

![14-postman-request.png](/images/02-epic-next/14-postman-request.png)

We will get the following data after making a `GET` request in **Postman**.

``` json
{
    "data": {
        "id": 3,
        "documentId": "fcnlk9xwoqmogfxvfim713y4",
        "title": "Home Page",
        "description": "This is our first single type",
        "createdAt": "2024-10-01T18:33:35.081Z",
        "updatedAt": "2024-10-01T23:15:19.426Z",
        "publishedAt": "2024-10-01T23:15:19.436Z",
        "locale": null,
        "blocks": [
            {
                "__component": "layout.hero-section",
                "id": 2,
                "heading": "Epic Next.js Tutorial",
                "subHeading": "It's awesome just like you.",
                "image": {
                    "id": 1,
                    "documentId": "fzwtij74oqqf9yasu9mit953",
                    "url": "/uploads/computer_working_3aee40bab7.jpg",
                    "alternativeText": null
                },
                "link": {
                    "id": 2,
                    "url": "/login",
                    "text": "Login",
                    "isExternal": false
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

``` js
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

``` js
{
  data: {
    id: 2,
    documentId: 'fcnlk9xwoqmogfxvfim713y4',
    title: 'Home Page',
    description: 'This is our first single type',
    createdAt: '2024-10-01T18:33:35.081Z',
    updatedAt: '2024-10-01T18:33:35.081Z',
    publishedAt: '2024-10-01T18:33:35.090Z',
    locale: null
  },
  meta: {}
}
```

That is because we need to tell Strapi what items we would like to populate. We already know how to do this; it is what we did earlier in the section when using **Strapi Query Builder**.

We will use the query that we defined previously.

``` js
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

It will allow us to generate our query string by passing our object from above.

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

  console.dir(strapiData, { depth: null });

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
  data: {
    id: 3,
    documentId: 'fcnlk9xwoqmogfxvfim713y4',
    title: 'Home Page',
    description: 'This is our first single type',
    createdAt: '2024-10-01T18:33:35.081Z',
    updatedAt: '2024-10-01T23:15:19.426Z',
    publishedAt: '2024-10-01T23:15:19.436Z',
    locale: null,
    blocks: [
      {
        __component: 'layout.hero-section',
        id: 2,
        heading: 'Epic Next.js Tutorial',
        subHeading: "It's awesome just like you.",
        image: {
          id: 1,
          documentId: 'fzwtij74oqqf9yasu9mit953',
          url: '/uploads/computer_working_3aee40bab7.jpg',
          alternativeText: null
        },
        link: { id: 2, url: '/login', text: 'Login', isExternal: false }
      }
    ]
  },
  meta: {}
}
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

Now that we have our basic component, let's import in our home page.

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

  console.dir(strapiData, { depth: null });

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

export function HeroSection({ data }: { readonly data: any }) {
  console.dir(data, { depth: null });
  return (
    <header className="relative h-[600px] overflow-hidden">
      <img
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
        height={1080}
        src="https://images.pexels.com/photos/4050314/pexels-photo-4050314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          Summarize Your Videos
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          Save time and get the key points from your videos
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href="/login"
        >
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

![16-hero-section-ui.png](https://api-prod.strapi.io/uploads/16_hero_section_ui_0c21f56aba.png)

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

  console.dir(strapiData, { depth: null });

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
  heading: 'Epic Next.js Tutorial',
  subHeading: "It's awesome just like you.",
  image: {
    id: 1,
    documentId: 'fzwtij74oqqf9yasu9mit953',
    url: '/uploads/computer_working_3aee40bab7.jpg',
    alternativeText: null
  },
  link: { id: 2, url: '/login', text: 'Login', isExternal: false }
}

```

Let's use this response structure do define our interface.

Let's create the following interfaces.

```jsx
interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface Link {
  id: number;
  url: string;
  label: string;
}

interface HeroSectionProps {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}
```

And update our **HeroSection** component use our types.

```js
export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
  // ...rest of the code
}

```

Finally, let's add our data from Strapi instead of hard coding it by making the following changes to our **HeroSection** component.

```jsx
import Link from "next/link";

interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface Link {
  id: number;
  url: string;
  text: string;
}

interface HeroSectionProps {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
  console.dir(data, { depth: null });
  const { heading, subHeading, image, link } = data;
  const imageURL = "http://localhost:1337" + image.url;

  return (
    <header className="relative h-[600px] overflow-hidden">
      <img
        alt={image.alternativeText ?? "no alternative text"}
        className="absolute inset-0 object-cover w-full h-full"
        height={1080}
        src={imageURL}
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-40">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          {subHeading}
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={link.url}
        >
          {link.text}
        </Link>
      </div>
    </header>
  );
}
```

We are now getting and displaying our data from Strapi but here are still more improvements that we must make in this component.

Like to use Next **Image** and not have to hard code "http://localhost:1337" path that we append to our image url but instead should get it from our `.env` variable.

We will do this in the next post, where we will finish up our **Hero Section** component and start working on the **Features Component**

But before I go, let's touch briefly on Next.js caching.

## We Have A Small Problem

Out of the box, Next.js caches things by default.   For instance, if we go to our Strapi Admin, update the image inside our **Hero Section** and restart our app. We will see that the image will not update.

There are many ways to solve this issue. And in Next 15 caching will not be done by default.


But for now we can just do a hard refresh in your browser with "command + r".

You can read more about it on the Next.js [docs](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching).

You can also make the following update in our `getStrapiData` function inside our `page.tsx` file.

By passing `{ cache: 'no-store' }` inside our fetch, we will opt out of data caching by Next.

``` jsx
async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, { cache: 'no-store' });
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}
```

But I will leave it up to you witch path to take.

But make sure to read the [docs](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching) to learn more about it.

## Conclusion

We are making some great progress. In this post, we started working on displaying our **Hero Section** content.  

In the next post, we will create the **StrapiImage** component using the Next **Image** component to make rendering Strapi images easier. 

Finish up our **Hero Section** and start working on our **Features Section**.

I hope you are enjoying this series so far. Thank you for your time, and I will see you in the next one.

You can find the code in the following repo [here](https://github.com/PaulBratslavsky/epic-next-course/tree/02-epic-next).





