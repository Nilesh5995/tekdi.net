---
templateKey: case-study
title: Helping improve accountability of electric supply companies
metakeywords: ["", ""]
metadescription: 
ogimage: /img/tekdi-logo.png

bannerSubTitle: Case Studies

summary: 
tags: 
   - not-for-profit
image: ""

index: 8
---

Prayas is a non-profit working for interests of disadvantaged sections of society. The Energy group is one of the groups under Prayas working for "Comprehensive, analysis-based approach to further public interest in the energy sector with the goal of democratising energy governance through research and intervention in policy and regulatory areas; and offering training and support to civil society groups."

One of the projects undertaken by Prayas was to build a India-wide network of devices that monitor the quality of electrical power. Uptime and voltage fluctuations are some of the key parameters monitored. The data captured by these devices is available on a public dashboard for everybody to view. The goal of the project was to make this data available to civil groups to rally support for improved access to good quality power.

Prayas needed a technology partner to implement a public platform that had the visualizations based on the data and to also make available the raw data to researchers. Prayas came to us just before they were nominated for the Google Impact Awards in 2013. Tekdi was able to quickly build a prototype of the dashboards, so that it could be presented as part of the presentation for the awards.


### Solution
Post the initial prototype, we evolved the dashboards to be able to show other metrics based on the available data. We also refined the dashboards to take care of no data cases or deal with devices that went offline. Technical details of the implementation are given below

![ESMI Architecture](/img/case-studies/prasyas-esmi-architecture.png)

The devices are plugged into electrical sockets at various locations throughout the country. The devices capture data every minute, and the captured data is uploaded to a central server periodically. The PHP based platform that we built has a background process picks up data from the central location and transforms it into JSON files that can be easily read by the graph libraries. 

![One of the dashboards - showing voltage fluctuations](/img/case-studies/prayas-esmi.png)

The project was one of the winners of the <a href="https://impactchallenge.withgoogle.com/india2013/charities/prayas" target="_blank">Google Impact Challenge</a> in 2013. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/vQO58WvbCuA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<p></p>

### Technologies
- PHP & MySQL
- Google Charts for visualisations
