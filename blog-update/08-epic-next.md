
We are making amazing progress. We are now in the final stretch. In this section, we will look at Search and Pagination.

- [Part 1: Learn Next.js by building a website](https://strapi.io/blog/epic-next-js-14-tutorial-learn-next-js-by-building-a-real-life-project-part-1-2)
- [Part 2: Building Out The Hero Section of the homepage](https://strapi.io/blog/epic-next-js-14-tutorial-part-2-building-out-the-home-page)
- [Part 3: Finish up up the homepage Features Section, TopNavigation and Footer](https://strapi.io/blog/epic-next-js-14-tutorial-learn-next-js-by-building-a-real-life-project-part-3)
- [Part 4: How to handle login and Authentication in Next.js](https://strapi.io/blog/epic-next-js-14-tutorial-part-4-how-to-handle-login-and-authentication-in-next-js)
- [Part 5: File upload using server actions](https://strapi.io/blog/epic-next-js-14-tutorial-part-5-file-upload-using-server-actions)
- [Part 6: Get Video Transcript with OpenAI Function](https://strapi.io/blog/epic-next-js-14-tutorial-part-6-create-video-summary-with-next-js-and-open-ai)
- [Part 7: Strapi CRUD permissions](https://strapi.io/blog/epic-next-js-14-tutorial-part-7-next-js-and-strapi-crud-permissions)
- **Part 8: Search & pagination in Nextjs**
- [Part 9: Backend deployment to Strapi Cloud](https://strapi.io/blog/epic-next-js-14-tutorial-part-9-backend-deployment-to-strapi-cloud)
- [Part 10: Frontend deployment to Vercel](https://strapi.io/blog/epic-next-js-14-tutorial-part-10-frontend-deployment-to-vercel)


![001-search-pagination.png](https://api-prod.strapi.io/uploads/001_search_pagination_8f67ded833.png)

## How To Handle Search In Next.js 

Let's jump in and look at how to implement search with Next.js and Strapi CMS.

First, create a new file inside our `src/components/custom` folder called `search.tsx` and add the following code.

```tsx
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
```

The secret to understanding how our **Search** component works is to be familiar with the following hooks from Next.js.

* **`useSearchParams`** [docs reference](https://nextjs.org/docs/app/api-reference/functions/use-search-params) It is a Client Component hook that lets you read the current URL's query string.

We use it in our code to get our current parameters from our url.

Then, we use the new `URLSearchParams` to update our search parameters. You can learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).

* **`useRouter`** [docs reference](https://nextjs.org/docs/pages/api-reference/functions/use-router) : Allows us to access the router object inside any function component in your app. We will use the replace method to prevent adding a new URL entry into the history stack.

* **`usePathname`** [docs reference](https://nextjs.org/docs/app/api-reference/functions/use-pathname): This is a Client Component hook that lets you read the current URL's pathname. We use it to find our current path before concatenating our new search parameters.

* **`useDebouncedCallback`** [npm reference](https://www.npmjs.com/package/use-debounce): Used to prevent making an api call on every keystroke when using our Search component.

Install the `use-debounce` package from [npm](https://www.npmjs.com/package/use-debounce) with the following command.

```bash
yarn add use-debounce
```

Now, let's look at the flow of our Search component's work by looking at the following.

```tsx
return (
  <div>
    <Input
      type="text"
      placeholder="Search"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  </div>
);
```

We are using the `defaultValue` prop to set the current search parameters from our URL.

When the `onChange` fires, we pass the value to our `handleSearch` function.

```tsx
const handleSearch = useDebouncedCallback((term: string) => {
  console.log(`Searching... ${term}`);
  const params = new URLSearchParams(searchParams);
  params.set("page", "1");

  if (term) {
    params.set("query", term);
  } else {
    params.delete("query");
  }

  replace(`${pathname}?${params.toString()}`);
}, 300);
```

Inside the `handleSearch` function, we use `replace` to set our new search parameters in our URL.

So whenever we type the query in our input field, it will update our URL.

Let's now add our `Search` component to our code.

Navigate to the `src/app/dashboard/summaries/page.tsx` file and update it with the following code.

```tsx
import Link from "next/link";
import { getSummaries } from "@/data/loaders";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "@/components/custom/search";

interface LinkCardProps {
  documentId: string;
  title: string;
  summary: string;
}

function LinkCard({ documentId, title, summary }: Readonly<LinkCardProps>) {
  return (
    <Link href={`/dashboard/summaries/${documentId}`}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="leading-8 text-pink-500">
            {title || "Video Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="w-full mb-4 leading-7">
            {summary.slice(0, 164) + " [read more]"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

interface SearchParamsProps {
  searchParams?: {
    query?: string;
  };
}

export default async function SummariesRoute({
  searchParams,
}: Readonly<SearchParamsProps>) {
  const { data } = await getSummaries();
  // this will gran our search params from the URL that we will pass to our getSummaries function
  const query = searchParams?.query ?? "";
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <span>Query: {query}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: LinkCardProps) => (
          <LinkCard key={item.documentId} {...item} />
        ))}
      </div>
    </div>
  );
}

```

![002-search-component.gif](https://api-prod.strapi.io/uploads/002_search_component_1acc5e3645.gif)

Excellent. Now that our `Search` component works, let's move on to the second part. We'll pass our query search through our `getSummaries` function and update it accordingly to allow us to search our queries.

To make the search work, we will rely on the following parameters.

* **sorting**: we will sort all of our summaries in descending order, ensuring that the newest summary appears first.

* **filters**: The filters we will use `$or` operator to combine our search conditions. This means the search will return summaries based on the fields we will filter using `$containsi,` which will ignore case sensitivity.

Let's look inside our `src/data/loaders.ts` file and update the following code inside our `getSummaries` function.

```ts
export async function getSummaries() {
  const url = new URL("/api/summaries", baseUrl);
  return fetchData(url.href);
}
```

Here are the changes we are going to make.

```ts
export async function getSummaries(queryString: string) {
  const query = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { summary: { $containsi: queryString } },
      ],
    },
  });
  const url = new URL("/api/summaries", baseUrl);
  url.search = query;
  return fetchData(url.href);
}
```

We will create a `query` to filter our summaries on the `title` and `summary.`

Now, we have one more step before testing our search. Let's navigate back to the `src/app/dashboard/summaries` folder and make the following changes inside our `page.tsx` file.

We cannot pass and utilize our query params since we just updated our `getSummaries` function.

```jsx
const { data } = await getSummaries(query);
```

Now, let's see if our search is working.

![003-testing-search.gif](https://api-prod.strapi.io/uploads/003_testing_search_5df12f053e.gif)

Great. Now that our search is working, we can simply move forward with our pagination.

## How To Handle Pagination In Your Next.js Project

### Pagination Basics

Pagination involves dividing content into separate pages and providing users with controls to navigate to the first, last, previous, following, or specific page.

This method improves performance by reducing the amount of data loaded simultaneously. It makes it easier for users to find specific information by browsing through a smaller subset of data.

Let's implement our pagination, but first, let's walk through the code example below, which we will use for our **`PaginationComponent`** inside of our Next.js project.

It is based on the Shadcn UI component that you can take a look at [here](https://ui.shadcn.com/docs/components/pagination);

So, run the following command to get all the necessary dependencies.

```bash
npx shadcn@latest add pagination
```

And add the following code to your `components/custom` folder file called `pagination-component.tsx`.

```tsx
"use client";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  pageCount: number;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      onClick={() => router.push(href)}
      className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </Button>
  );
};

export function PaginationComponent({ pageCount }: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="p-2 font-semibold text-gray-500">
            Page {currentPage}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

Again, we are using our familiar hooks from before to make this work, `usePathname,` `searchParams,` and `useRouter` in a similar way as we did before.

We are receiving `pageCount` via props to see our available pages. Inside the `PaginationArrow` component, we use `useRouter` to programmatically update our URL via the `push` method on click.

Let's add this component to our project. In our `components/custom` folder, create a `PaginationComponent.tsx` file and paste it into the above code.

Now that we have our component, let's navigate to `src/app/dashboard/summaries/page.tsx` and import it.

```tsx
import { PaginationComponent } from "@/components/custom/pagination-component";
```

Now update our `SearchParamsProps` interface to the following.

```tsx
interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}
```

Now, let's create a `currentPage` variable to store the current page we get from our URL parameters.

```tsx
const currentPage = Number(searchParams?.page) || 1;
```

Now, we can pass our `currentPage` to our `getSummaries` function.

```tsx
const { data } = await getSummaries(query, currentPage);
```

Now, let's go back to our `loaders. tsx` file and update the `getSummaries` with the following code to utilize our pagination.

```tsx
export async function getSummaries(queryString: string, currentPage: number) {
  const PAGE_SIZE = 4;

  const query = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { summary: { $containsi: queryString } },
      ],
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });
  const url = new URL("/api/summaries", baseUrl);
  url.search = query;
  return fetchData(url.href);
}
```

In the above example, we use Strapi's `pagination` fields and pass `pageSize` and `page` fields. You can learn more about Strapi's pagination [here](https://docs.strapi.io/dev-docs/api/rest/sort-pagination);

Now back in our `src/app/dashboard/summaries/page.tsx`, let's make a few more minor changes before hooking everything up.

If we look at our `getSummaries` call, we have access to another field that Strapi is returning called `meta.` Let's make sure we are getting it from our response with the following.

```tsx
const { data, meta } = await getSummaries(query, currentPage);
console.log(meta);
```

We will see the following data if we console log our `meta` field.

```js
{ pagination: { page: 1, pageSize: 4, pageCount: 1, total: 4 } }
```

Notice that we have our `pageCount` property. We will use it to tell our **`PaginationComponent`** the number of pages we have available.

So, let's extract it from our `meta` data with the following.

```tsx
const pageCount = meta.pagination.pageCount;
```

And finally, let's use our **`PaginationComponent`** with the following.

```tsx
<PaginationComponent pageCount={pageCount} />
```

The completed code should look like the following.

```tsx
import Link from "next/link";
import { getSummaries } from "@/data/loaders";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "@/components/custom/search";
import { PaginationComponent } from "@/components/custom/pagination-component";

interface LinkCardProps {
  documentId: string;
  title: string;
  summary: string;
}

function LinkCard({ documentId, title, summary }: Readonly<LinkCardProps>) {
  return (
    <Link href={`/dashboard/summaries/${documentId}`}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="leading-8 text-pink-500">
            {title || "Video Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="w-full mb-4 leading-7">
            {summary.slice(0, 164) + " [read more]"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

export default async function SummariesRoute({
  searchParams,
}: Readonly<SearchParamsProps>) {
  // this will gran our search params from the URL that we will pass to our getSummaries function
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const { data, meta } = await getSummaries(query, currentPage);
  const pageCount = meta.pagination.pageCount;

  if (!data) return null;
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <span>Query: {query}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: LinkCardProps) => (
          <LinkCard key={item.documentId} {...item} />
        ))}
      </div>
      <PaginationComponent pageCount={pageCount} />
    </div>
  );
}

```

Now, the moment of truth: Let's see if it works. Make sure you add more summaries since our page size is currently set to 4 items. You need to have at least 5 items.

![004-pagination.gif](https://api-prod.strapi.io/uploads/004_pagination_afff3d808b.gif)

Excellent, it is working.

## Conclusion

This Next.js with Strapi CMS tutorial covered how to implement search and pagination functionalities. Hope you are enjoying this tutorial.

We are almost done. We have two more sections to go, including deploying our project to Strapi Cloud and Vercel.

See you in the next post.
