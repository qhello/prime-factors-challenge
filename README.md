# Prime number factors API w/ long-running jobs

This small project exposes an HTTP API endpoint '/primeFactors/X' where X could be any number, the goal is to find X's prime number factors.

**Go check the enclosed Architecture Diagram.png**

Since this computing such factors can be slow in most cases, I've chosen to adapt a "REST long-running jobs" architecture:

- Users asks for prime number factors of X by calling endpoint **/primeFactors/X**; If results hasn't been computed previously, calling this endpoint will create a new **job** which will be handled by a backend service called *worker*. 
In such case, the initial endpoint will return **202 Accepted** to the user, alongside the **Location** header setup to **/job/X**.
- User can now poll the endpoint **/job/X** in order to know the status of the job: if the job is still waiting to be executed by a worker (status = *pending*) or if a worker is currently handling it (status = *in progress*)
- Once the job has been finished, the endpoint **/job/X** will return **303 See Other** with the **Location** header setup to **/primeFactors/X**
- Once the prime number factors of X are known, endpoint **/primeFactors/X** will return **200 OK** with the factos array in the body.

In this project, I'm assuming that jobs can be reused. Therefore one number can only be linked to one job, no matter its status.

## Potential future improvements

- Job ETA calculation / progress information, because endpoint **/job/X** allow us to send extra information in payload, which can improve client's polling cost.
- Improve compute algorithm to reduce job time.
- Job cancellation endpoint.
- Job garbage collection: if a worker crashes, his job should be taken over by another worker. One way of doing it would be to periodically increase a timestamp whilst processing a job, and periodically expire jobs 'in progress' if worker stop showing progress.


## How to use the project

- make sure you have docker installed, with docker-compose
- open terminal, cd to project root
- execute following command: docker-compose build && docker-compose up
- open this link in your browser: http://localhost:3000/primeFactors/100 (change 100 to any number)