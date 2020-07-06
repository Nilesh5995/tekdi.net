---
templateKey: case-study
title: Mobile Website and UI revamp for India's Unique Indentity Program
metakeywords: ["", ""]
metadescription: 
ogimage: /img/tekdi-logo.png

bannerSubTitle: Case Studies

summary: Revamp of the UIDAI website to make it responsive. In addition, UI design for all public web properties and style guides for internal portals.
tags: 
   - cms
   - government-public-sector
   - publishing-media-news

image: /img/case-studies/aadhaar-dashboard.png

index: 2
---

The Aadhaar project by Indian Government operates on a massive scale. Unique Identification Authority of India (UIDAI), which handles this project, under the Ministry of Electronics and Information Technology (MeitY) has issued more than 120 crores (1.2 billion) Aadhaar numbers to the residents of India till date. For context, the Aadhaar number in India is somewhat similar to the Social Security Number in the US.

One account which can link to everything else — bank accounts, subsidies, mobile SIMs, academic records, and the list goes on. Just to get your head around the mammoth task undertaken by the Indian government, below are a few mind-boggling stats.

![default](/img/case-studies/aadhaar-dashboard.png)

With the Digital India push of the government and increasing penetration of the internet and smartphones, UIDAI realized that their website needed to be responsive, and render itself well on mobile devices.

What started off as a project to make the template responsive soon snowballed into a full-fledged rebuild to make the Joomla leaner and cleaner with much-simplified information architecture. 

The first few weeks were an insightful journey to identify information architecture. There were about 15 types of content - news, tenders, videos, radio broadcast recordings and a lot more. Each type of content had different metadata/fields and needed to be presented in a certain way. At this stage, we also discovered that the existing implementation had a separate Joomla component for each of the content types.

We discovered news, tenders, vacancies, and other such components. At the end of this information architecture exercise, we also had a very clear idea that all the content on the site can be managed by using only Joomla’s CMS capabilities, we will not need any 3rd party extensions for content management. 

> Meanwhile, we also looked at the traffic numbers - roughly 2 million page views a day and around 50 million hits a month! We realized we were set to rebuild one of the busiest Joomla sites! 

The initial months went by smooth and mainly involved the template and migrating the data from custom components over to Joomla content + custom fields. In all, we ended up with around 50,000 articles across 13 languages. We also had Urdu as one of the languages so it was interesting to make an RTL template.

Another interesting bit was migrating the FAQs. In the old site, all the FAQs were coded as HTML into a single article. So around 100 questions and answers crammed into a single article. We wrote some crafty jQuery that read the HTML and dumped a CSV to the console. And this was later easily imported as articles. Smooth!

> Due to the kind of traffic we wanted to serve the message was clear from the first day - Optimize. We ran performance tests and optimized everything that was possible. SQL Queries, JS files everything we could. Here, our mantra of sticking to the core really helped us, since the surface area was limited to core Joomla and a handful of extensions we used. 

All the optimization that we did in the test environment didn’t prepare us for the actual hordes of visitors that hit us when we flipped the switch one night. The first launch -- within minutes the site crashed and we had to revert to the old one. This, in spite of having 6 servers serve the site. We realized the cache storage folder wasn’t created so the site had to be rolled back in minutes on the launch evening. We made another attempt a couple of days back, and the site stayed on for longer but we quickly saw load averages jumping up like crazy till the servers started dying out.

The next time we wanted to be even more careful and went overboard with optimization. A few interesting areas that came up in the optimization

- When analyzing access logs for slowest requests, we saw the slowest requests were the MP3 files (the site has several audio recordings). We were sure there was something wrong since the audio is not accessed that much. Upon thinking over it dawned us - the HTML5 audio tag always preloads the resource to find the duration, and the home page was loading the last 5 audio resources. We disabled preloading, and voila, no more MP3 in the slowest requests. This turned out to be the biggest optimization that we did. 
- In addition, we also found an issue with a long-running query for a custom contacts module, which was replaced by Joomla’s code to fetch custom fields and we were sorted. 
- We also did some additional JS & CSS optimization to shave off all extra kilobytes we can, just for good measure. 

We decided that we should take a new site to live in a staged manner, and started by making it live only on 2 of the 6 VMs serving the site. We left it at 2/6 servers overnight, and the next day, around 11 am which is the typical peak load time, the access logs and the load averages were reporting good. We had our first “Phew” moment in weeks! We let is stay like that for another, after which we pushed the new site to 4/6 servers. And finally, after 3 days all 6 servers were serving the new site!