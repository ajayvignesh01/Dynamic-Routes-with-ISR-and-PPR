## What are Dynamic Routes?
- From the [Docs]("https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes"): When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.
- In this repo, we will focus on an improved method to handle the request time scenario, as well as a pages router inspired regenerate method to create or update pages after you’ve built your site.

## What is ISR?
- From the [Docs]("https://vercel.com/docs/incremental-static-regeneration/quickstart#"): You can use Incremental Static Regeneration (ISR) to regenerate your pages without rebuilding and redeploying your site. When a page with ISR enabled is regenerated, the most recent data for that page is fetched, and its cache is updated. There are two ways to trigger regeneration:
  - Background revalidation – Regeneration that recurs on an interval 
  - On-demand revalidation – Regeneration that allows you to purge the cache for an ISR route whenever you want by sending certain API requests to your app
- In this repo, we will focus on On-demand revalidation, and a method to also regenerate the page subsequently.
  - It's important to note that Pages Router `revalidate()` is slightly different from App Router `revalidatePath()`.
    - Pages router **regenerates** the path, meaning the first user and subsequent users will see the new cached page within milliseconds
    - App router **revalidates** the path, meaning the first user will wait for the new page to render, and subsequent users will see the new cached page within milliseconds.
  - We will focus on bringing the regenerating capability from the pages router and combine it with a recently introduced capability of the app router to provide the best of both worlds. Keep reading!

## What is PPR?
- From the [Docs]("https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering"): Partial prerendering allows static portions of a route to be prerendered and served from the cache with dynamic holes streamed in, all in a single HTTP request.
- It is basically the best of both worlds: ISR for the static portions, SSR for the dynamic portions.

## So what's this repo about?
- In this repo, we will explore how we can use the ISR & SSR capabilities of PPR to provide the best user experience in dynamic routes when using the app router.
- It is important to note that this repo focuses on two types of dynamic routes:
  - Generate static pages after building your app.
    - For example, let's say you have a blog, and you want to publish a new article under a dynamic route `blog/[slug]`. You can do so by creating a webhook to hit the `/api/revalidate` api with the path to generate in the POST body.
  - Have changing data as a result of programmatically identifiable actions.
    - For example, in that same blog, if you want to update the home page after publishing the new article. You can do so by creating a webhook to hit the `/api/revalidate` api with the path to regenerate in the POST body.
    - Or if you updated an article... same idea.
  

## Let's get started!
- Clone this repo, and run the development server using `bun dev`
- Open [http://localhost:3000/anyslug](http://localhost:3000) with your browser to see the result.

- On every new slug you visit, PPR kicks in by delivering the static shell instantly, while generating the dynamic part. 
  - Now try reloading the page and notice that the timestamp doesn't change, you are seeing a cached page delivered instantly. You can also confirm this by looking in the server logs (your IDE terminal). You will see that the previous request was a `cache: MISS`, while this request was a `cache: HIT`.

- Now try clicking on the `Regenerate` button and wait for it to complete. Refresh the page, and you will once again be delivered a cached page instantly but notice the time is more recent. This is because our regenerate api route has not only invalidated the cache (`revalidatePath()`), but also regenerated the page, meaning the first user will get a cached page delivered instantly.
  - This is the same behavior as using `revalidate()` in the pages router
  - In the app router, just using `revalidatePath()` only invalidates/purges the cache, and the next user to visit the page has to wait for the dynamic part to be generated at request time.
  - It is important to note that the Regenerate Button is soley to demonstrate the power of on-demand ISR with PPR. Normally, you would call `api/revalidate` from a page different from the one you are trying to regenerate.

## Other patterns...
- For frequently updating data, you can still use PPR, and use `export const dynamic = "force-dynamic"`. You get the benefits of ISR to deliver the instant static shell, while SSR kicks in on every request to make sure the data is up-to-date.
  - This will cause every user to wait for the dynamic part to load in on each request. But the user experience is improved by PPR showing the static shell instantly.
- For data updating at a predictable time interval, you can still use PPR, and combine it with `{ revalidate: 10}` in your fetch requests. Make sure you adjust the time (10 ms) according to your requirements. 
  - This will cause the first user after every 10 seconds to wait for the dynamic part to load, while PPR shows the static shell instantly. All subsequent requests within the next 10 seconds will see a cached page delivered instantly. And then the loop repeats.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
