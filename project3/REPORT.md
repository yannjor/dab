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

2. Enable ingress add-on: `minikube addons enable ingress`.

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

9. Apply all the deployments, services, jobs and cluster:

```sh
kubectl apply -f ./kubernetes/my-database-config.yaml
kubectl apply -f ./kubernetes/my-database-migration-job.yaml
kubectl apply -f ./kubernetes/my-ui.yaml,./kubernetes/my-ui-service.yaml
kubectl apply -f ./kubernetes/my-ui.yaml,./kubernetes/my-ui-service.yaml
kubectl apply -f ./kubernetes/my-api.yaml,./kubernetes/my-api-service.yaml
```

10. Check the ingress URL in the dashboard and open it.

## Testing results

### Google Lighthouse

| Metric         | Score |
|----------------|-------|
| Performance    | 100   |
| Accessibility  | 82    |
| Best Practices | 92    |
| SEO            | 100   |

### k6

|              | Requests/s | Duration median | Duration 95% | Duration 99% |
|--------------|------------|-----------------|--------------|--------------|
| Main page    | 1794       | 2.97ms          | 15.96ms      | 17.02ms      |
| Message page | 1665       | 4.81ms          | 13.92ms      | 15ms         |


## Reflections


## Improving performance

