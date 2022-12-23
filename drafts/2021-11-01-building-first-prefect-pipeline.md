---
title: "Orchestrating a Data Pipeline Using Prefect on GCP"
date: 2021-10-30 12:00:00
featured_image: '/images/prefect.jpeg'
excerpt: "Automating a data pipeline carrying Apple Health data: in this tutorial I'll show you the programming and DevOps tasks necessary to setup and run a Data Pipeline on Google Cloud Platform, orchestrated using Prefect and developed using their design principles."
---
![](/images/prefect.jpeg)

---

So, I've been getting more interested in Data Engineering lately (who [hasn't](https://www.datanami.com/2020/02/12/demand-for-data-engineers-up-50/)?). What began with helping a client get data from their revenue management system to the cloud via a clunky Python script has now become a bit of a more vested interest in the happenings of this field. I happened to run across a post about [Prefect](https://prefect.io) on Reddit (where else?) discussing the differences between it and Apache Airflow. (Full disclaimer, I've never used or worked with Airflow, so this article will not be about that.) Letting my intrigue get the best of me, I decided to think up a little side project for myself to test this out for myself.

I've been wearing an Apple Watch for quite a while now, and while I've used it to track workouts, pace, and sleep, I haven't taken the time to look at much of the data in aggregate. Some of the most interesting data visualizations as well as problems involve a sense of time (**Announcement**: I have a post on K-means adapted for time series data in the works, so check back soon). Needing a reason to build a data pipeline, I figured now was the time I'd run a full export of my data and see what I could learn from it.

## Prefect
Prefect is made up of a couple components, the UI and Agent.

### UI
Prefect UI is where you'll view your flows, schedule runs, and see older versions and data on past runs. The power of Prefect is that this comes setup with a GraphQL API that executes runs, handles errors, restarts runs, and can send notifications to messaging services like Slack or Twilio. For my database nerds, it stores cache and results data on a Postgres Database. All of this comes neatly in a Docker container that you can run on your own server. That said, their full featured UI lives at [cloud.prefect.io](https://cloud.prefect.io). To focus on the pipeline building, you can create an account to access their full-featured UI and you'll have the same tools and more at your fingertips.

### Agent
The Prefect Agent will run on your own private Virtual Machines, Kubernetes cluster, or even Dask cluster. This is where we install Python dependencies, register our flows, and run them. 

An important distinction: **This is the only place your codebase will exist.**

The reason this is so important is because it completely changes the risk landscape from the perspective of IT in your organization. When you register a flow, Prefect generates the metadata on the flow and that is all it needs to be able to make API calls via their cloud UI and GraphQL. Keeping your private codebase on your network or cloud account, always.

## Building the Pipeline

To keep this short and somewhat OS agnostic, I won't go over the specifics of writing the iPhone automation in the Shortcuts app to schedule the export of my Health data. I've been told it's possible to do this on Android as well, but I'll leave it to you to map out how you'll schedule or push your health data periodically from your device. However you do it, you'll want to push the export to somewhere that has an API so you can pick the data up via Python.

### Spinning up your local Env
To start, we need a computer! This could be your local machine, but if you've got some free credits for a cloud platform like I do, you can spin up a VM. I'm using Google Cloud Platform, to create an instance you can follow [this](https://cloud.google.com/compute/docs/instances/create-start-instance) documentation. Depending on you workload, you may be able to use a free tier VM anyways, but for the amount of processing power I need I'm not able to.

### Package Dependencies
Once you've created your VM, SSH into it. Assuming you've got Python installed on your VM (GCP VMs come with it), you can pull the packages you'll need for this from my public Github repo for this project by running (it's a good idea to create a [venv](https://docs.python.org/3/library/venv.html) first to install into):

{% include clipboard.html %}
```bash
$ pip install -r https://raw.githubusercontent.com/trouze/Apple-Health-App/main/requirements.txt
```

This file doesn't include `Pyicloud`, which I use for accessing data on my iCloud. Use whatever you need to access your saved data. Additionally, there are some Prefect optional dependencies we need to specify via this call:

{% include clipboard.html %}
```bash
$ pip install "prefect[gcp,google]"
```

If you were to run your pipeline on Kubernetes, the above call is where you'd specify that additional dependency. You can see all options [here](https://docs.prefect.io/core/getting_started/install.html#installing-optional-dependencies). For this tutorial, I'll just run the agent on a single virtual machine.

### Register your Agent
To facilitate the "handshake" between Prefect's Cloud UI and our Server Agent, we must generate an API key in the UI and make a call via our virtual machine's command line to register the agent. If you've already created an account with [Prefect Cloud UI](cloud.prefect.io), then follow the beautiful diagram below to create an API key.

![](/images/prefect-api-key.png)

Copy the API key that is generated and SSH into your virtual machine. We're going to use a Local Agent, but there are other [agent types](https://docs.prefect.io/orchestration/agents/overview.html#agent-types) that are better for modularity. We'll use local for the simplicity and needs at this point. With the API key copied to the clipboard run the following in the virtual machine bash:

{% include clipboard.html %}
```bash
$ prefect agent local start --key "API_KEY"
```

Great! Now our machine is registered and able to connect to Prefect Cloud UI. You can ctrl+c to shut down the agent, as we'll begin developing an example pipeline and mount it on our machine.

## Building The Pipeline in Python


### Tasks, Secrets, Flows

#### Pushing Pipeline Files to the VM
do this via gcloud command line

### Registering the Flow

### Starting the Agent
nohup prefect agent local start &

### Using the UI to Schedule and Run Flows



## What's Next?
I love this orchestration platform, and the true power of it just might be in ML model training. Using this service, we can schedule runs to retrain our models based on new data, always keeping parameters up to date when data changes. I may work to integrate this into the trading bot project I started a while back, so stay tuned.