---
title: "Orchestrating a Data Pipeline Using Prefect on GCP"
date: 2021-10-30 12:00:00
featured_image: '/images/<>.jpeg'
excerpt: "Automating a data pipeline carrying Apple Health data: in this tutorial I'll show you the programming and DevOps tasks necessary to setup and run a Data Pipeline on Google Cloud Platform, orchestrated using Prefect and developed using their design principles."
---
![](/images/<>.jpeg)

---

Outline:

- discuss the challenges to scaling dbt cloud jobs currently (namely slot concurrency, startup times, no shallow cloning)
- break down the abstract solution to the issue (docker, shallow clone, fargate)
- walkthrough how we can do this with [Modal](https://modal.com/)
- include commentary on using web endpoints and delivering a payload to change the job command(s)

```python
from modal import Stub, web_endpoint
import modal

dbt_img = modal.Image.debian_slim().pip_install("dbt-snowflake","GitPython").apt_install("git")

volume = modal.SharedVolume()
stub = modal.Stub("run-dbt-demo")

@stub.function(image=dbt_img,shared_volumes={"/app/dbt": volume},secret=modal.Secret.from_name("a8snowflake"))
@web_endpoint()
def run_dbt():
    import git
    from dbt.cli.main import dbtRunner, dbtRunnerResult
    import os, shutil
    shutil.rmtree('/app/dbt/dbt-slim-ci',ignore_errors=True)
    repo = git.Repo.clone_from("https://github.com/trouze/dbt-slim-ci.git","/app/dbt/dbt-slim-ci")
    deps = ['deps']
    cli_args = ['run']
    os.chdir('/app/dbt/dbt-slim-ci')
    dbt = dbtRunner()
    deps: dbtRunnerResult = dbt.invoke(deps)
    res: dbtRunnerResult = dbt.invoke(cli_args)
    if res.success == False:
        print("dbt invocation failed")
        print(res.exception)
    else:
        print(res.result)

if __name__ == "__main__":
    with stub.run():
        run_dbt.call()
```