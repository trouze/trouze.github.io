---
title: "My First dbt-core Contribution!"
date: 2023-08-03 12:00:00
featured_image: '/images/prefect.jpeg'
excerpt: "Automating a data pipeline carrying Apple Health data: in this tutorial I'll show you the programming and DevOps tasks necessary to setup and run a Data Pipeline on Google Cloud Platform, orchestrated using Prefect and developed using their design principles."
---
I recently made my first `dbt-core` open-source contribution! This contribution adds `unmodified` and `old` [state selection](https://docs.getdbt.com/reference/node-selection/methods#the-state-method) methods to the dbt CLI. The main motivation is to make it easy to exclude late-binding views from our dbt job's DAG, reducing the runtime overhead. You can see some details that precipitated this contribution [here](https://github.com/dbt-labs/dbt-core/issues/7564). 

You can watch a short demo on the contribution below:

<iframe width="766" height="431" src="https://www.youtube.com/embed/RB6CxbQQ_YM?si=UDomcCa34LDSMJw7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

To take it for a spin yourself, you might run a command that excludes the intersection of views and unchanged models from the DAG:

```bash
dbt run -s config.materialized:view,state:unmodified --state ./path/to/artifats
```

If you end up using this feature extension, I'd love to hear from you! When I worked on this, I did it entirely inspired by the late-binding view use-case, but I'd be curious to hear how you put it to use in your dbt jobs. As always, reach out to me via tyler [at] tylerrouze.com or comment below!