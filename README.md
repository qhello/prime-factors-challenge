# Prime number factors API w/ long-running jobs

This small project exposes an HTTP API endpoint '/primeFactors/X' where X could be any number, the goal is to find X's prime number factors.

![Architecture diagram](https://raw.githubusercontent.com/qhello/prime-factors-challenge/master/Architecture%20diagram.png)

Since this computing such factors can be slow in most cases, I've chosen to adapt a "REST long-running jobs" architecture:

- Users asks for prime number factors of X by calling endpoint **/primeFactors/X**; If results hasn't been computed previously, calling this endpoint will create a new **job** which will be handled by a backend service called *worker*. 
In such case, the initial endpoint will return **202 Accepted** to the user, alongside the **Location** header setup to **/job/X**.

- User can now poll the endpoint **/job/X** in order to know the status of the job: if the job is still waiting to be executed by a worker (status = *pending*) or if a worker is currently handling it (status = *in progress*)

- Once the job has been finished, the endpoint **/job/X** will return **303 See Other** with the **Location** header setup to **/primeFactors/X**

- Once the prime number factors of X are known, endpoint **/primeFactors/X** will return **200 OK** with the factos array in the body.

In this project, I'm assuming that jobs can be reused. Therefore one number can only be linked to one job, no matter its status.

## How to use the project

- Make sure you have Docker w/ Docker Compose installed & launched

- Open a terminal, type following commands:

    `git clone https://github.com/qhello/prime-factors-challenge.git`
    
    `cd prime-factors-challenge/`
    
    `docker-compose build`
    
    `docker-compose up --scale worker=1` (Worker service can easily be scaled up this way)

- open this link in your browser: http://localhost:3000/primeFactors/100 (change 100 to any number)

## Potential future improvements

- Job ETA calculation / progress information, because endpoint **/job/X** allow us to send extra information in payload, which can improve client's polling cost.

- Job garbage collection: if a worker crashes, his job should be taken over by another worker. One way of doing it would be to periodically increase a timestamp whilst processing a job, and periodically expire jobs 'in progress' if worker stop showing progress.

- Improve worker polling cost by using MongoDB's change stream

- Job cancellation endpoint.

- Improve compute algorithm to reduce job time: cache prime number list. That’s the most CPU intense operation, because we have to iterate through all numbers, and because the gap between two consecutive prime number increases exponentially.

- Extra architecture optimization: having a fleet of backend processes whose role would only to discover prime numbers, job workers would then use this list directly to find factors. Or would wait if given number contain a prime factor not yet discovered.

- For medium scale application: deploy API & Worker & MongoDB separately, scaling will be easier this way (Horizontal scaling instead of Vertical scaling).

- Use Redis (results & prime number list cache) & Message Queue (job queue) services for larger scale application (where DB might become the bottleneck).
