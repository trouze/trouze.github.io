---
title: "Algorithmic Trading Series: Setting up Cloud Ops"
date: 2021-01-05 12:00:00
featured_image: '/images/stock_trade.jpg'
excerpt: "The beginning of a series on connecting to TD Ameritrade's API via Python to execute trades, building algorithms to search for opportunities, and leveraging cloud computing to automate it all for us."
---
Outline:
- Setup w/ Google cloud ($300 in credits), you won't reach that limit for a very long time- we'll use free tiers
- Create VM instance, install python (sudo apt-get install python3), upload files
- Create start/stop fn's, show diagram of how fns and scheduler work together
- Create start/stop schedulers via pub/sub
- Set crontab in VM instance

![](/images/stock_trade.jpg)

Welcome back to the next step in our journey to developing an automated trading bot! If you followed along in my [last post](https://tylerrouze.com/blog/td-ameritrade-api-setup), you should have set up authorization to programmatically access TD Ameritrade's API. At this point, you should have the following information:

- Your API key
- A file named `token` that contains your refresh token
- Python script `td_bot.py` which generated the token file

If you didn't save your API key, go to [TDA Developer](https://developer.tdameritrade.com), login and go to "My Apps". Your API key is also known as your Consumer key, and will be listed when you click on the app you created in from the last post. Be sure to add `@AMER.OAUTHAP` to the end of it and put it in the `td_bot.py` script as a string.

```python
api_key = 'XXXXX@AMER.OAUTHAP'
```


## Setting up an account with TD Ameritrade
