# Comparing bit.ly implementations

## Running the applications

The different implementations (express, oak, flask) can be found in their
respective directories.

To run one of them, simply navigate to the directory and run `docker-compose
up`. This starts the application on port 3000.

## Running performance tests

The performance testing k6 scripts can be found in the `k6` directory. These can
be run one by one in the order suggested by the file names.

For example:
```
k6 run --summary-trend-stats "med,p(95),p(99)" k6/1_mainpage.js 
```
To run the performance test for the main page.

## Testing results

### Main page

| Clone             | Requests/s | Duration median | Duration 95% | Duration 99% |
|-------------------|------------|-----------------|--------------|--------------|
| Node.js + Express | 8165       | 1.03ms          | 2.11ms       | 2.62ms       |
| Node.js + Oak     | 4776       | 1.68ms          | 3.74ms       | 5.31ms       |
| Python + Flask    | 1890       | 5.08ms          | 6.22ms       | 7.47ms       |

### Submitting form

| Clone             | Requests/s | Duration median | Duration 95% | Duration 99% |
|-------------------|------------|-----------------|--------------|--------------|
| Node.js + Express | 3373       | 2.57ms          | 4.74ms       | 7.68ms       |
| Node.js + Oak     | 2278       | 4.03ms          | 6.75ms       | 8.63ms       |
| Python + Flask    | 529        | 18.3ms          | 25.46ms      | 29.97ms      |

### Redirection

| Clone             | Requests/s | Duration median | Duration 95% | Duration 99% |
|-------------------|------------|-----------------|--------------|--------------|
| Node.js + Express | 4661       | 1.9ms           | 2.99ms       | 4.2ms        |
| Node.js + Oak     | 2885       | 3.06ms          | 5.46ms       | 7.21ms       |
| Python + Flask    | 560        | 17.33ms         | 23.67ms      | 27.32ms      |

### Random redirection

| Clone             | Requests/s | Duration median | Duration 95% | Duration 99% |
|-------------------|------------|-----------------|--------------|--------------|
| Node.js + Express | 4096       | 2.4ms           | 3.39ms       | 4.63ms       |
| Node.js + Oak     | 2564       | 3.49ms          | 6.44ms       | 7.96ms       |
| Python + Flask    | 557        | 17.48ms         | 23.79ms      | 27.23ms      |


## Reflections

We see that the Node.js + Express version of the application performs the best
in all categories, followed by Node.js + Oak version, and the Python + Flask
version coming in as a distant third. The performance differences between the
different sites are not so surprising, with the form submission being the
slowest and main page the fastest. The differences between the express and oak
version may be due to the fact that oak is primarily a middleware framework for
Deno, with Node.js support only added later. Oak is also less mature than
Express.

The reason for Flask's slowness on the other hand is rather surprising. One
reason may be that the server was run as a development server, not made for
production deployment. For production, Flask recommends to use a WSGI server
instead, such as gunicorn. The code used to communicate with the database may
also not be the most efficient, and may slow down operations by connecting and
closing a connection each time it executes a query.


## Improving performance

For the Flask application, improvements could likely be made by switching to use
a production WSGI server instead of a development server. In addition, the code
that communicates with the database could probably be made faster. This is also
probably true for the Express and Oak versions, as I do not have that much
experience with writing this type of code.

The `/random` route is pretty slow and scales poorly with the size of the
database, because it fetches all entries and picks a random one. This could be
improved for example by generating a random id within the range of possible id's
and requesting only the entry with that id.

Other than this, using some other database than Postgres may also yield better
results, or could at least be an area to explore more if performance were the
most critical aspect. Database operations could also be improved by using an
intermediate cache instead of writing and reading directly from the disk.
