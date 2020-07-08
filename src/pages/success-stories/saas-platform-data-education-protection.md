---
templateKey: case-study
title: SaaS platform for data protection education and audit
metakeywords: ["", ""]
metadescription: 
ogimage: /img/tekdi-logo.png
bgimage:

bannerSubTitle: Case Studies

summary: 
tags: 
   - product-engineering
image: ""

index: 3
---

## Background
Data Protection Education is a service provider and platform that allows enterprises and organisations to understand and mitigate the risks arising out of data protection. With the GDPR coming into effect in the EU, data rights and data protection have become a key factor in an organisation’s Governance, Risk and Compliance profile. 

DPE wanted to build a platform containing a suite of audit tools to understand the risk profile of organisations. Initially the platform was targeted at Schools in the UK, and was later expanded to charities, local authorities and other businesses.

## Solutions Given
### Product Management
Throughout the duration of the project, Tekdi played a product management role. There was a continuous process of understanding business needs and converting them into features that can be built by the team. We used our expertise of building products to carefully pick the features that are really needed by end users. Even at a feature level, we chose to build only an MVP, and expand on the feature once we see traction.

### Product Engineering Services
Since this was a data protection and data education project, we conducted additional training and sensitisation of team members to educate them about GDPR regulations, data security and the risks of breaches. 

It is a SaaS platform where schools and other organisations can sign up and add team members in different roles. Admin, Manager and Staff are some key roles in the system. The platform is a collection of multiple tools for assessment, documentation and training of staff, the key tools are described below

**Compliance Manager**  
An online compliance training tool, this lets Admins assign compliance documents to be read by staff members. Although the tool automatically marks the document as completed once the staff member reads it, it allows each staff member to manually acknowledge that they have understood the document. The staff user can also mark once they have used the learning from the document in their day to day work. A report of these staff actions is available to the admins.

**Record of Process & Document Generator**  
This tool allows the organisation to define the various internal processes and tools through which data flows in the organisation. Based on this information, the tool creates the risk profile and proposes mitigations. The tool has built in intelligence to classify the risks based on parameters like
Data is processed manually or via a electronic system
Is any outdated software or software with known security issues being used

Based on these processes, the organisation admin is also able to export a dynamically created process outline document that can be shared with parties seeking this information from the organisation.

**Manage Data Access Requests (Subject Access Request)**  
This tool is used by members of the organisations to submit subject access requests i.e. requests to receive a copy of one's own information with the organisation. 

**DevOps and multi-site**  
Since the platform is evolving continuously there was a need to set up a multi environment staged deployment pipeline. This allowed us to have separate Dev, QA & Production environments where features could be previewed by various stakeholders before promoting to production.

In addition, we also set up a copy of the same platform branded for different verticals - charity and local authorities was also set up. 
Support and maintenance
We set up a ticketing system for end users to raise any questions. Tekdi handles the L2 and L3 tickets, while the L1 tickets are handled by the customer. 

### Technologies Used
- PHP (Joomla)
- MySQL
- Gitlab, Jenkins & Ansible for SCM and Continuous Deployment
