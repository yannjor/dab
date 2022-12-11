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

1. Start up minikube: `minicube start`.

2. Enable ingress and metrics-server add-ons:
```
minikube addons enable ingress
minikube addons enable metrics-server
```
3. Create minikube tunnel: `minikube tunnel`.

4. Open up the dashboard: `minikube dashboard`.

5. Build the images with mincube:
```sh
minikube image build -t ui ./ui
minikube image build -t api ./api
minikube image build -t flyway-migrations ./flyway
minikube image build -t flyway-migrations ./flyway

```
6. Install the CloudNativePG operator: `kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.18/releases/cnpg-1.18.0.yaml`

9. Apply all the deployments, services, jobs, scalers and cluster:

```sh
kubectl apply -f ./kubernetes/my-database-config.yaml
kubectl apply -f ./kubernetes/my-database-migration-job.yaml
kubectl apply -f ./kubernetes/my-ui.yaml,./kubernetes/my-ui-service.yaml
kubectl apply -f ./kubernetes/my-ui.yaml,./kubernetes/my-ui-service.yaml
kubectl apply -f ./kubernetes/my-api.yaml,./kubernetes/my-api-service.yaml
kubectl apply -f ./kubernetes/my-ui-hpa.yaml,./kubernetes/my-api-hpa.yaml
```

10. Check the ingress URL in the dashboard and open it.

## Testing results

### Google Lighthouse

| Page          | Performance | Accessibility | Best practices | SEO |
|---------------|-------------|---------------|----------------|-----|
| Main page     | 100         | 82            | 92             | 100 |
| Message page  | 100         | 83            | 92             | 100 |

### k6

|                  | Requests/s | Duration median | Duration 95% | Duration 99% |
|------------------|------------|-----------------|--------------|--------------|
| GET Main page    | 1794       | 2.97ms          | 15.96ms      | 17.02ms      |
| GET Message page | 1665       | 4.81ms          | 13.92ms      | 15ms         |
| POST message     | 1830       | 3.96ms          | 11.32ms      | 12.27ms      |
| POST reply       | 1698       | 4.07ms          | 14.87ms      | 15.69ms      |

## Reflections

The performance of the application is rather good right now. The k6 and
lighthouse test results reflect this, with overall good speed and ability to
handle over a thousand requests per second. The visual side of the application is
very basic however, with no styling. In addition, I was a bit surprised of the
SEO score from Google lighthouse, as the application is basically a SPA with
everything rendered client side. Thus, SEO should not be so good. Deploying the
application with kubernetes works, but is a bit annoying to set up manually.

## Improving performance

Performance could possibly be improved by using some hybrid client and server
side rendering, for example Next.js or Astro. This would also be better in terms
of SEO. Using a different API server may also yield better results, as Express
does have the overhead of the Node runtime. There is also a lot of room for
improvement on the visual side, to improve the user experience. The deployment
with kubernetes is quite cumbersome at the moment, and could perhaps be improved
with some script to start up everything instead of doing everything manually.
Merging the configurations to a single file may also be beneficial.
Database operations might also be improved by using an intermediate cache
instead of writing and reading directly from the disk.
