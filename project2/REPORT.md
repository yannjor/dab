# Project 2 report

## Running the application

To run the application, simply run `docker-compose up`. This starts the
application on port 7800.

## Running performance tests

The performance testing k6 scripts can be found in the `k6` directory. These can
be run like this:

```
k6 run --summary-trend-stats "med,p(95),p(99)" k6/mainpage.js 
```

## Testing results

### Google Lighthouse

| Metric         | Score |
|----------------|-------|
| Performance    | 92    |
| Accessibility  | 100   |
| Best Practices | 92    |
| SEO            | 91    |

### k6

|             | Requests/s | Duration median | Duration 95% | Duration 99% |
|-------------|------------|-----------------|--------------|--------------|
| Main page   | 1866       | 2.82ms          | 14.49ms      | 15.58ms      |
| Submissions | 1652       | 4.44ms          | 14.26ms      | 15.54ms      |

## Reflections

The application performs quite well right now. The main page, could be faster
however if compared to the previous project. This is likely because the
exercises are fetched from the database and rendered client-side. There is not
that big a difference between the main page and posting to the submissions
endpoint. The application is not very well optimized for SEO, since the
exercises are rendered on the client with javascript. Currently, there is also
no caching system in place, so submissions with the exact same code are
unnecessarily being graded.

## Improving performance

Performance for the main page could likely be improved by rendering the
exercise pages server side, or by having them be static html pages generated
with for example Astro. The grading performance might be improved by using
multiple consumers running concurrently. In addition, the grading performance
could be improved by using a cache of submissions so as to avoid unnecessary
grading. It may also be interesting to test some other message queuing system,
for example RabbitMQ, to see how well it compares in this application compared
to Kafka. The polling mechanism implemented in the UI could certainly be
improved, for example by using server-sent events or websockets.
