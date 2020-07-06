---
templateKey: case-study
title: Cloud-based Interview Management System
metakeywords: ["video interview", "hiring software", "cloud", "SaaS"]
metadescription: 
ogimage: /img/case-studies/large_interview.png

bannerSubTitle: Case Studies

summary: 
tags: 
   - business-process-transformation
image: /img/case-studies/large_interview.png

index: 7
---

As technology advances at lightning-fast speed, the recruitment industry is under immense pressure to attract (and retain) the best talent – quickly and cost-effectively. HR departments are always on the lookout to streamline their interview process.

Deploying a technology-backed Interview Management System is a great way to make the interview process efficient, reduce the time to hire, efficiently schedule and set up interviews, and track them over time. 

In the hiring process, interviews are one of the most expensive elements as they need valuable resources to be available to conduct the interviews. 

One of our clients, who is working in the recruitment space for a long time, on-boarded us to solve this problem. They wanted to make the entire hiring process more efficient and scalable through

* Online pre-interview screening tests
* Online asynchronous interviews 
We were called upon to build a technology product that would help them achieve this. 

## Designing the Product 
Product design & solution architecture was a very important part of this project. 

We worked with the client to detail out the solution architecture & wireframes of the SAAS-based product. The initial design phase comprised of defining key user roles, journeys, and the features of the product. 

At a broad level, we agreed that the product would allow companies to register, manage their users, create Job descriptions, and create tests to evaluate candidates. We decided to develop a system that would enable companies to define video questions & create asynchronous interviews that multiple candidates can attend at a time that is convenient for them. 

![default](/img/case-studies/large_designingtheproduct.png)

## Choosing the Platform
During the design phase, we realized that we would need to choose a platform that would give us a solid base and framework to build more specific features in the product. 

We decided to go with Joomla because 
* The Joomla core with its strong User Management & Access control, Multilingual Core, Versioning, Menu Management, Categories, Tags, and Fields makes for a really strong foundation. 
* Joomla has a strong ecosystem of 7500+ extensions that add powerful capabilities to the core. 
* That apart, over the years, Techjoomla has built up a strong base of open source horizontal extensions, which add enterprise capabilities to Joomla like reporting, REST APIs, user hierarchy management, user Clusters & role-based access control, Universal content manager, quiz management & much more! 

All of this, coupled with the strong engineering base that Joomla’s robust model view controller (MVC) based architecture, offered us an excellent foundation for building the complex system. 

## Details of features
### Company Registration, Profile & User Management
Since this was a product that would be used by HR professionals in companies, the product needed the following features

* A way for companies to onboard their own users & assign roles to them
* A way to manage their logo & information for each company - this would be showcased to candidates applying for a job
* Linking of the company profile to their careers page, job portals, social media platforms, and more

We used the ‘JA Job Board’ extension for Company profiles. The company sub-users were managed using our open source products sub-users & role-based ACL.  

### Job Descriptions

Once the company profile is set up, the next step is to set up a Job Description (JD). Providing an updated and accurate job description is critical in hiring the best talent. We created a feature in the product that allows seamless creation, management, storage, and integration of hundreds of job descriptions with ease. JA Jobboard was customized to allow this. 

### Test Management

![default](/img/case-studies/large_testmanagement.png)

Depending on the position the company was hiring for, we needed to allow companies an option to set up a test to screen the applicants before moving them to the interview stage. 

This was enabled via our open source product com_tmt. We customized it for this system. One of the key features the client wanted was to offer was a pre-built question bank. Companies could use these question banks for quick and easy creation of the tests. Of course, there also needed an option for each company to manage its own private question bank. 

The test tool allowed the creation, storage, and management of multiple-choice questions. 

Using such an online interview process, companies can make faster, evidence-based hiring decisions. By having a ready bank of test questions, the Interview Management System can help companies eliminate the need to interview every single candidate, remove bias, and save time on the hiring process. 

### Inviting the candidates
Another key feature needed in the product was to allow recruiters to invite candidates to enter the hiring process for a Job Description either one-by-one or en masse. The hiring process could include a pre-screen test followed by an interview or for certain specific positions, a direct interview.

On receiving an invite, candidates should be able to register on the portal and appear for an online test/video interview for the given job description. The client wanted to track all the invites based on whether the candidate opened the invite mail, or they registered using the same or no. 

This Invitation system was powered by our product Invitex.

### The Product Core - the Asynchronous Video Interview System
The core of this platform was its ability to conduct hundreds of asynchronous interviews at any time that is convenient for the candidates.

For this particular feature of the product, we developed a custom extension and provided the interfaces and database tie-ins of the tool. The video recording and streaming was achieved by integrating ‘Wowza Streaming Engine’ hosted on Amazon. The completed video recordings are synced to an Amazon S3 bucket. JA AmazonS3 was used for the S3 sync.

The interview tool consists of the following working pieces. 

#### Video recording and Question bank management
This is used to provide companies with a professionally recorded question bank of interview questions that they can use to construct their interviews. It also allows them to record video questions of their own and store them to their private question bank.

In the early years of the project, a flash-based recording tool was used for recording the questions. Later on, we migrated to HTML5-based recording. 

#### Interview Authoring tool
The interview authoring tool is an easy to use drag and drop interface, which allows users to browse through various question banks and construct interviews as per the job requirement. If the question they need is not available in the question banks, they have an option to record questions of their own.

#### Interview tool

![default](/img/case-studies/large_interview.png)

This was one of the critical features of the product. We wanted to ensure that the candidate gets an experience that is as close to a real interview as possible. The interface of this tool was designed to match a real-world interview. 

Through this tool, an interview question is played, and the candidates can respond by recording their answers. 

The product also included a trial interview for candidates so that they understand the best practices of attending an online interview. 

These video interviews emulated real-time conversations with candidates and helped save time in the recruitment process. It was also seen that video interviews against telephonic ones offered much more insight on the body language and other such softer aspects.

#### Reporting
The client wanted to see how the system was performing and get insights on the performance of the system.

To demonstrate the impact, we built reports that could measure and monitor the progress and success of the interview process. The reports provided a detailed understanding of candidate test/ interview results. While these were built as part of the custom development when this product was built, if we were doing this project now or were to refactor them, they would be built using our TJ Reports system.

#### Self-service signup & eCommerce
Initially, the go-to-market strategy for the product was through traditional B2B sales. As the product gained traction, there was a lot of value in adding a way for companies to subscribe to the product and pay online. This was delivered by integrating some custom workflows and the Payplans extension. 

## Cost-effective development, rapid prototyping & faster go to market by using Joomla and the spirit of open source
By using Joomla, some ready to use extensions from the extension directory, and our own Joomla-based open source products and libraries, we were able to build this product in record time. It not only accelerated the go-to-market but since we used a lot of ready code, the cost of development was also optimized. 

This project was an exemplary implementation of the 'Spirit of Open Source', a product first development strategy, that we follow to reduce project-specific development and encourage utilizing and giving back to opensource. 

If you want to know more about how you can use Joomla to build your next killer product, let’s connect!

