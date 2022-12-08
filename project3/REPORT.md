# Project 3 report

## Running the application

To run the application, simply run `docker-compose up`. This starts the
application on port 7800.

## Running performance tests

The performance testing k6 scripts can be found in the `k6` directory. These can
be run like this:

```
k6 run --summary-trend-stats "med,p(95),p(99)" k6/mainpage.js 
```

## Deploying with Kubernetes


## Testing results

### Google Lighthouse

| Metric         | Score |
|----------------|-------|
| Performance    | 92    |
| Accessibility  | 100   |
| Best Practices | 92    |
| SEO            | 91    |

### k6

|              | Requests/s | Duration median | Duration 95% | Duration 99% |
|--------------|------------|-----------------|--------------|--------------|
| Main page    | 1794       | 2.97ms          | 15.96ms      | 17.02ms      |
| Message page | 1665       | 4.81ms          | 13.92ms      | 15ms         |


## Reflections


## Improving performance

