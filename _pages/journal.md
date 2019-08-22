---
  permalink: /journal/
  title: "Journal"
  header:
    image: "/images/nicole-harrington-ohK_uJJm2G8-unsplash.jpg"
---
<hr>
<div class="{{ include.type | default: "list" }}__item">
<p>{% for post in site.posts %}
  <span><a href="{{ post.url | preprend: site.baseurl }}"><img src=" {{ post.image }}" align="left"></a></span>
  <span><a class="post-link" href="{{ post.url | preprend: site.baseurl }}"></a></span>
  <span><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></span>
  <br>
{% if post.read_time %}
  <span class="page__meta"><i class="far fa-clock" aria-hidden="true"></i> {% include read-time.html %}</span>
{% endif %}
<br>
<span class="post-meta"></span>
<span class="post-meta">{{ post.author }}</span>
<span>{{ post.excerpt }}</span>
<span><a class="btn btn-default" href="{{ post.url | prepend: site.baseurl }}">Continue Reading</a></span><br>
<hr>
{% endfor %}
