# Project 2 report

Write the project report here. Do not include your personal
details (e.g. name or student number).

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
<!-- ○ A brief reflection (5-10 sentences) on the present -->
<!-- performance of the application. -->

## Improving performance

<!-- ○ A brief list of suggestions (5-10 sentences) for improving the -->
<!-- performance of the application. -->
