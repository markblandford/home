# Threat Modelling with Threat Dragon

This post is about how to perform Threat Modelling using the [STRIDE model](https://en.wikipedia.org/wiki/STRIDE_model). I'll highlight some of the nuances in doing this using [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/). I'm no expert but have create a few threat models in my time and over time, I think I've gained a better understanding. This is my attempt at making the activity a little more approachable. Everything here may not be 100% accurate for all use-cases but it generally works in my experience.

## What is Threat Modelling

Threat modelling is a critical part of a secure development lifecycle. We use a model, such as [STRIDE](https://en.wikipedia.org/wiki/STRIDE_model), to help us identify, review and mitigate potential threats and vulnerabilities within a software system (or application).

The goal is to identify and mitigate threats early, before they become problems. It is critical that everyone in the team responsible for the software application is involved, as everyone brings a different insight. Plus, it helps educate all members of the team, as application security is everyone's responsibility.

## Threat Dragon

Threat Dragon is a free, open-source threat modelling tool developed by [OWASP](https://owasp.org/about/). It enables teams to visually develop the data flows of a system, and document [STRIDE](https://en.wikipedia.org/wiki/STRIDE_model) (and other threat models) threats and mitigations. The output of which is not only visual, but is in JSON, so can be easily added to any source control system.

### Getting Started

Threat Dragon is available in two ways:

1. 🌐 Web version - Simply use within the browser at [https://threatdragon.com](https://threatdragon.com).
2. 💻 Desktop version - Available for download from the [OWASP Threat Dragon GitHub release page](https://github.com/OWASP/threat-dragon/releases).

Once you have it, you can start by creating a new model or importing an existing model. Depending on the threat model chosen, Threat Dragon will suggest the threats on each Data Flow or Process you add.

### Advice when using Threat Dragon

Threat Dragon is a little temperamental but once you get use to it, it is a great tool.

### Save Often

I find it is very easy to make a mistake, drag a Data Flow so it doesn't look like how you want it too. I've even had saves fail before and have had to start over. So **save your work regularly**.

### Selecting Data Flows

If you need to select an existing Data Flow in order to edit the details or threats to it, **click the Arrow Head**, not the line itself. Clicking the line, will...

### Adjusting the position of a Data Flow

Again a little tricky and often you'll find you just have to do a best-effort. If you want to add a 'corner' or a drag-point on a Data Flow, **click anywhere on the line**.

### Out of Scope

If you mark a Process or Data Flow as out of scope, then click away and come back to the out-of-scope item before editing further. You'll find then, the item has changed and for example, you cannot add threats to it.

### Create all of the threats for each element even if N/A

I find it beneficial adding every applicable threat to each process, data flow and store, even if there is no known threat or it's status is N/A. This demonstrates later that the threat was atl east considered and not simply forgotten to be added.

### Review, review and review

The threats against a system are never static. Regularly review the threat model with the team, especially when new integrations are added. This helps keep everyone educated and aware plus offers the opportunity to close outstanding threats or create new ones.

### It is just JSON underneath

I've had models which when loaded, an error is displayed in Threat Dragon. The model is just JSON, so use other linting and validation tools to help resolve such issues.

If you're feeling brave, you can manually edit the JSON in a text editor. For example, if you want to rename something, you could use find-and-replace in a text editor.

### Components & Boundaries in Threat Dragon

When creating your threat model, there are different items you will use to represent your system:

| Item              | Description                                                       | Example use                           |
|-------------------|-------------------------------------------------------------------|---------------------------------------|
| Actor 🧍          | A user or external entity that perform against on the system.     | Customers, other applications or APIs |
| Data Flow ↩️      | Represents the movement of data between elements.                 | HTTP requests, SQL queries            |
| Process 📦        | Represents a component in the system that performs some function. | Web application, API, Auth provider   |
| Store 📁          | Where data is stored.                                             | Database, file system                 |
| Trust Boundary 🤝 | Represents a boarder where control or trust changes.              | Network zones, internal vs public     |

## STRIDE

[STRIDE](https://en.wikipedia.org/wiki/STRIDE_model) is a threat classification model which was developed by Microsoft.

| Threat                      | Description                                                                       | Data Flow ↩️, Process 📦 or Store 📁 in TD |
|-----------------------------|-----------------------------------------------------------------------------------|--------------------------------------------|
| **S**poofing                | Impersonating something or someone else.                                          | 📦                                         |
| **T**ampering               | Modifying data or code, in transit or at rest.                                    | ↩️ & 📦 & 📁                               |
| **R**epudiation             | Denying an action or transaction has taken place. Denying without accountability. | 📦 & 📁                                    |
| **I**nformation Disclosure  | Exposing data to unauthorised parties.                                            | ↩️ & 📦 & 📁                               |
| **D**enial of Service (DoS) | Preventing legitimate people or processes from access a service or resource.       | ↩️ & 📦 & 📁                               |
| **E**levation of Privilege  | Gaining unauthorised access to resources or functionality.                        | 📦                                         |

Each element within the system can be exposed to different threats in different ways. Furthermore, they could be exposed to multiple 'implementations' of the same threat. For example Denial of Service against a process, could come from a DDos attack or from an internal, malicious actor. Each would be represented as a different threat on that process.

## Threats by item / element within a system

Now we know what the threat classifications are in STRIDE and where in the system they apply, we'll now look into those in more detail for each element in the system.

### Data Flow ↩️

| Threat                     | Example                                                            | Potential Mitigations                                                |
|----------------------------|--------------------------------------------------------------------|----------------------------------------------------------------------|
| **Tampering**              | A request is intercepted and altered.                              | Encryption (TLS), signing.                                           |
| **Information Disclosure** | Sensitive information (PII, passwords) is sent in the request URL. | None. Redesign the system and include in the encrypted body instead. |
| **Denial of Service**      | Overwhelming the network.                                          | Load balancing, short connection timeouts.                           |

_I find DoS against the Data Flows as one of the hardest threats to consider and suggest mitigations for._

## Process 📦

| Threat                      | Example                                                                      | Potential Mitigations                                                                                              |
|-----------------------------|------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **Spoofing**                | A malicious actor is able to gain access as another user of the application. | MFA, password hygiene, least-privilege.                                                                            |
| **Tampering**               | Code is maliciously modified with the application.                           | Signed commits, PRs requiring approval, [SAST](https://en.wikipedia.org/wiki/Static_application_security_testing). |
| **Repudiation**             | A malicious actor deletes resources from the application and denies it.      | All actions attributed in audit logs, recording IP addresses etc.                                                  |
| **Information Disclosure**  | An API exposes infrastructure details in error messages and logs.            | Sanitize error messages, logs.                                                                                     |
| **Denial of Service (DoS)** | An API is overwhelmed with requests causing it to become unresponsive.       | Rate limiting, Load Balancing.                                                                                     |
| **Elevation of Privilege**  | A regular account is able to perform admin-level actions.                    | Enforce role-based access, least-privilege and regular reviews.                                                    |

## Store 📁

| Threat                      | Example                                                                                      | Potential Mitigations                                                      |
|-----------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **Tampering**               | A malicious actor is able to change stored, customer data.                                   | Access controls, encryption at rest and in while in use, backups.          |
| **Repudiation**             | A malicious actor changes data and it is not possible to attribute the action to them.       | Enabling audit logs.                                                       |
| **Information Disclosure**  | The data is stored unencrypted and accessible to unauthorised people.                        | Encryption (rest, in use and transit), only store the minimum required.    |
| **Denial of Service (DoS)** | A poorly constructed query is able to be run and causes the database to become unresponsive. | Prevent direct access, optimise queries, real-time performance monitoring. |

## An Example

Here is a small, not very detailed example of a web application, which

1. Uses a 3rd party authentication provider (out of scope).
2. Communicates with a trusted API, which is considered a part of the software system.
3. This API stores data in a database.

![Example Threat Model](/assets/articles/threat-modelling/example-threat-model.png "Example Threat Model in Threat Dragon")

### Steps

1. Create the data flow / model of the application flow within your software system.
   1. If it's large, break it down and create separate threat models. Threat Dragon can have multiple models within the same 'parent' model.
2. Analysis each process, store & data flow following STRIDE.
   1. When you have an element selected, clicking '+ New Threat' will at first default to adding the applicable threats for the element selected. However, you don't have to stick with this, feel free to add more as you see fit.

### The documented threats for the example

#### Out-of Scope

It is fine to mark items out-of-scope. By doing so, we're acknowledging it's existence as a dependency, so we can be aware if anything was to change, or for example, the out-of-scope element was known to be vulnerable, we could more easily see where our system could be exposed and what mitigations we should / have in place.

1. Customer / browser - In this example, I've marked the customer as being out-of-scope as we cannot control customer behaviour or their browser. This will not always be the case however.
2. 3rd Party Auth Provider - We assume it is secure but fundamentally it is not our responsibility to ensure it is, as it is maintained by a 3rd, trusted party.

#### Processes

##### Web App (frontend) 📦

| Threat          | Description | Mitigation |
|-----------------|-------|------------|
| **Spoofing**    | _A malicious actor is able to gain access as another user of the application._ | Mitigated. Authorisation checks are completed using the JWT. |
| **Tampering**   | _Modifying data or code._ | Mitigated. No data is stored with the Frontend application. Commits must be signed, PR reviewed etc. and access to the repo is access controlled. A strict, Content Security Policy is in use. |
| **Repudiation** | _Denying an action or transaction has taken place. Denying without accountability._ | Mitigated. All commits must be signed, PR reviewed etc. All mutable actions are logged by the API and requests for the application are logged. |
| **Information Disclosure** | Some, customer information is stored in the browser local storage. | **OPEN, Medium** Consider hashing or encrypting the data if it must be in Local Storage. |
| **Denial of Service (DoS)** | _Preventing legitimate users from accessing a service or resource._ | Mitigated. The infrastructure has load balancing and rate limiting. |
| **Elevation of Privilege**  | _Gaining unauthorised access to resources or functionality._        | Mitigated. Authorisation checks are carried out and there is no concept of roles within the application. Control to the infrastructure of the application and code is access controlled following least-privilege. |

##### Backend API 📦

| Threat          | Description | Mitigation |
|-----------------|-------|------------|
| **Spoofing**    | A malicious actor is able to gain access as another user of the application. | **OPEN, High**. CORS is used to limit access to just the Web App. However, no authorisation checks are carried out on the requests using the JWT, meaning anyone with a valid JWT can impersonate another customer. |
| **Tampering**   | _Modifying data or code._ | Mitigated. No data is stored with the API. Commits must be signed, PR reviewed etc. and access to the repo is access controlled. |
| **Repudiation** | _Denying an action or transaction has taken place. Denying without accountability._ | All commits must be signed, PR reviewed etc. All requests are logged and can be attributed to a customer's IP address. |
| **Information Disclosure** | A 500 error response shows the stack trace, which exposes the language the API is written in etc. | **OPEN, Medium** This is a risk but a 500 response is very rare and the API is kept free from known vulnerabilities. |
| **Denial of Service (DoS)** | _Preventing legitimate people or processes from access a service or resource._ | Mitigated. The infrastructure has load balancing and rate limiting. |
| **Elevation of Privilege**  | _Gaining unauthorised access to resources or functionality._        | Mitigated. Authorisation checks are carried out and there is no concept of roles within the application. Control to the infrastructure of the application and code is access controlled following least-privilege. |

#### Stores

##### Internal Database 📁

| Threat                      | Description                                                                                  | Mitigation                                                      |
|-----------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **Tampering**               | _Modifying data at rest_                                   | Mitigated. Access to the database is strictly limited using AD Groups. |
| **Repudiation**             | _Denying an action or transaction has taken place. Denying without accountability._ | Mitigated. All changes are recorded in audit logs and the data is backed up periodically. |
| **Information Disclosure**  | Exposing data to unauthorised parties.                        | **OPEN, Low**. Access is controlled via AD Groups, however, some Personal Identifiable Information is sometimes recorded in the logs. Consider, redacting the logs. |
| **Denial of Service (DoS)** | _Preventing legitimate people or processes from access a service or resource._ | Mitigated. Horizontal scaling, multi-region replication and caching. |

#### Data Flows

##### POST /api/{username}/order (Web app -> Backend API) ↩️

| Threat                     | Description                                                            | Mitigations                                                |
|----------------------------|--------------------------------------------------------------------|----------------------------------------------------------------------|
| **Tampering**              | _Modifying data or code, in transit or at rest._ | Mitigated. TLS encryption is used. Although the username is in the URL, it is not used by the API. |
| **Information Disclosure** | The customer's username, is in the URL. | **OPEN, High** The username will not be encrypted and will be cached everywhere, potentially exposing the customer's email address (which is many customer's username). Remove from the URL. |
| **Denial of Service**      | Preventing legitimate people or processes from access a service or resource. | Mitigated. Rate limiting and load balancing. |

##### Authenticate (Web App -> 3rd Party Auth Provider) ↩️

| Threat                     | Description                                      | Mitigations                      |
|----------------------------|-----------------------------------------------|-------------------------------------------|
| **Tampering**              | _Modifying data or code, in transit or at rest._ | Mitigated. TLS encryption is used. |
| **Information Disclosure** | _Exposing data to unauthorised parties._ | Mitigated. TLS & no sensitive data is included in the request. |
| **Denial of Service**      | _Preventing legitimate people or processes from access a service or resource._ | N/A The 3rd party responsibility. |

##### Verify JWT (Backend API -> 3rd Party Auth Provider) ↩️

| Threat                     | Description                                      | Mitigations                      |
|----------------------------|-----------------------------------------------|-------------------------------------------|
| **Tampering**              | TLS 1.1 is used, which is now considered insecure. | **OPEN, Medium**. Upgrade to TLS 1.2 or ideally 1.3. |
| **Information Disclosure** | _Exposing data to unauthorised parties._ | Mitigated. Although only TLS 1.1 & no sensitive data is included in the request. |
| **Denial of Service**      | _Preventing legitimate people or processes from access a service or resource._ | N/A The 3rd party responsibility. |

##### Queries (Backend API -> Database) ↩️

| Threat                     | Description                                      | Mitigations                      |
|----------------------------|-----------------------------------------------|-------------------------------------------|
| **Tampering**              | The request is made without SSL enabled, exposing the credentials and query in the request and response. | **OPEN, Low**. This is an issue but the communication is internal, as the database is on 10.0.0.0 private address space. Enable SSL. |
| **Information Disclosure** | he request is made without SSL enabled, exposing the credentials and query in the request and response. | **OPEN, Low**. This is an issue but the communication is internal, as the database is on 10.0.0.0 private address space. Enable SSL. |
| **Denial of Service**      | _Preventing legitimate people or processes from access a service or resource._ | **OPEN, TBD** We don't know. |

## Conclusion

Hopefully this gives you a better idea about how to use Threat Dragon to perform threat modelling on your application environment.

## Additional Resources

* [GOV.UK - Conducting a STRIDE-based threat analysis](https://www.gov.uk/government/publications/secure-connected-places-playbook-documents/conducting-a-stride-based-threat-analysis).
* [OWASP Threat Dragon project](https://owasp.org/www-project-threat-dragon/).
* [OWASP Threat Modelling Process](https://owasp.org/www-community/Threat_Modeling_Process).
* [OWASP - STRIDE](https://owasp.org/www-community/Threat_Modeling_Process#stride).
* [STRIDE- Wikipedia](https://en.wikipedia.org/wiki/STRIDE_model).
