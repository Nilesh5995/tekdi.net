---
templateKey: case-study
title: Bringing alive a platform for inclusive access to education
metakeywords: ["", ""]
metadescription: 
ogimage: /img/tekdi-logo.png

bannerSubTitle: Case Studies

summary: 
tags: 
   - product-engineering
   - education
   - learning-edtech
image: ""

index: 1
---

India is home to the largest youth population in the world. There is increasing demand of good quality education from parents and students themselves. However the geographical and socio-economic factors hinder inclusive access to good quality education for masses. However, internet penetration has improved and this can be leveraged to distribute content effectively. The Ekstep foundation was formed in 2014 with a goal of providing access to learning opportunities for every child.

They did this by creating a open, online learning platform where content creators, expert teachers and organisations working for childrens' education could come together and collaborate to create high quality content. A complete pedagogy of learning concepts across numeracy and literacy is available in the platform so content can be tagged according to the learning outcomes it should produce. 

The content created on the platform was consumed via a mobile app. A bigh highlight of the platform is the ability to view the content offline. When a child is viewing the content on a phone, a telemetry layer allows understanding the usage patterns and the learning outcomes of the child. This information is used to suggest newer content to learn and also shared with content creators to improve the quality of content.

![Ekstep](/img/case-studies/ekstep.jpg)

The platform is built using a microservices architecture, and by itself does not have a UI. Ekstep foundation approached us in 2016. They were looking for a partner who can take the APIs and build a face for the platform so that all the planned use cases for the platform could start coming alive. **Tekdi was called in to build the UI, and add a community and collaboration layer to the platform**. In addition, a **developer section** complete with API documentation, API key management and API sandbox was also created to facilitate external developers to build on top of the platform.

> Tekdi's experience in building community platforms and effortless user experiences helped us get the first version of the "Community Portal" up and running in just a couple of months. We leveraged several home-grown as well as 3rd party open source plugins and libraries to optimise the build effort.

## Solution
The microserivce platform had several components - the learning service, language service, search service, analytics service to name a few. The Community Portal was the face of the platform, enabling content creation, communities and a partner ecosystem to use the portal for achieveing Ekstep's goal of improving access to education for 200 million children. A summary of each of these sections follows

### UX & UI Design
Working with the product managers at Ekstep, the team conducted user research to understand the users of the platform. The product managers' thoughts about the user experience, combined with interviews with potential users of the platform allowed us to create an effortless user experience for the various types of users of the portal. 

### Content creation, collaboration and review
One of the key features of the Portal, this enables creators to create content and send for review. Creators can also add additional collaborators to help with building the content. To facilitate interaction between the collaborators a comment system was built similar to commenting in Google Slides. For this **the team leveraged "JLike" and "REST API Toolkit" which are open source products built and maintained by Tekdi**. Using this, we were also able to build a review workflow where the reviewer is able to provide feedback on various aspects of the content before it could be published.

### Wordnet
The wordnet is a rich, multilingual, thesaurus.com like experience. However the UI for the Wordnet includes pictures, translations, example usage and rhymhing words which makes it easy for the child to understand. The wordnet is also used during the content creation to add flashcards to content. This was a custom module created as a frontend for the language service.

A crowd-sourced word enrichment tool was also built, that allowed approved contributors to add information to words. Grade suitability, example usaes, translations, picture, parts of speech are some of the attributes that could be updated.

![The Wordnet in the Community Portal](/img/case-studies/ekstep-wordnet.png)

### Question Bank
Questions are a way to reinforce learning and also track learning outcomes. In the platform, questions can be added to content by searching in the question bank. We built a question create interface that allows creating several question types - Multiple choice, fill in the blanks, match the following and several others that the plugin driven platform supports. 

### Communities
Communities on an open platform help foster collaboration and discussion which can increase the quality of content by cross exchange of ideas. The **team used their experience of building communities** to build infrastructure similar to facebook groups that allowed discusions, polls and media to be shared by group members. 

![Communities in the Ekstep Portal](/img/case-studies/ekstep-groups.png)

### Developer Onboarding
The open platform allowed external developers to use the APIs and build for other learning use cases that the platform did not support. Flows were built to create and manage API keys for the Ekstep platform complete with scope selection and a choice of creating sandbox or live credentials. 

> The portal that Tekdi built had an underlying service component that was responsible for the API communication. This allowed the UI to evolve independently without needing to bother about changes in APIs

## Working in a complex multi-partner environment
Due to the nature and size of the platform, Ekstep had onboarded multiple partners to build the platform. Initially each partner handled a separate part of the platform, but eventually the teams became cross-pollinated as cross functional skills were needed. Since all partners were aligned to Ekstep's mission and the platform's success, collaboration was effortless.

## Open platform and Open Source
The platform is built as an open one, where any external developer can leverage the APIs to build functionality. In fact the platform uses extensible architecture in several components which allows creating features without modifying the platform core. 

Moreover, the platform itself is built entirely on an open source stack, and this open philosophy resonates very well with Tekdi, which made the project a joy to work on.

## Tools & Technologies Used
- PHP (Joomla)
- JavaScript (AngularJS, Angular and various libraries)
- MySQL
- NFS for distributed storage
- AWS Load Balancer for High Availability
- GitHub, Jenkins & Ansible for SCM and Continuous Deployment
