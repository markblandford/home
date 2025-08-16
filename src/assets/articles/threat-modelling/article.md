# Threat Modelling with Threat Dragon

This post is about how to perform Threat Modelling using the [STRIDE model](https://en.wikipedia.org/wiki/STRIDE_model). I'll also highlight some tips with using [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/), and some practices I choose to follow.

## What is Threat Modelling

Threat modelling is a critical part of a secure development lifecycle. We use a model, such as [STRIDE](https://en.wikipedia.org/wiki/STRIDE_model), to help us identify, review and mitigate potential threats and vulnerabilities within a software system (or application).

The goal is to identify and mitigate threats early, before they become problems. It is critical that everyone in the team responsible for the software application is involved, as everyone can bring a different perspective. Furthermore, it helps educate all members of the team, as application security is everyone's responsibility.

## The STRIDE Threat Model

[STRIDE](https://en.wikipedia.org/wiki/STRIDE_model) is a threat classification model which was developed by Microsoft.

| Threat  | Description |
|---------|-------------|
| **S**poofing | Impersonating something or someone else. |
| **T**ampering | Modifying data or code, in transit or at rest. |
| **R**epudiation | Denying an action or transaction has taken place. Denying without accountability. |
| **I**nformation Disclosure | Exposing data to unauthorised parties. |
| **D**enial of Service (DoS) | Preventing legitimate people or processes from access a service or resource. |
| **E**levation of Privilege | Gaining unauthorised access to resources or functionality. |

Each element within the system can be exposed to different threats in different ways. Furthermore, they could be exposed to multiple 'implementations' of the same threat. For example Denial of Service against a process, could come from a DDos attack or from an internal, malicious actor. Each would be represented as a different threat on that process.

## Quick Reference

### STRIDE Threat Classification Overview

| Threat | Description | Key Question |
|--------|---------------|--------------|
| **Spoofing** | Impersonating others or systems. | _"Can someone pretend to be someone else?"_ |
| **Tampering** | Modifying data or code. | _"Can someone alter information?"_ |
| **Repudiation** | Denying actions occurred. | _"Can someone deny they did something?"_ |
| **Information Disclosure** | Exposing sensitive data. | _"Can someone see information they shouldn't?"_ |
| **Denial of Service** | Blocking legitimate access. | _"Can someone prevent the system from working?"_ |
| **Elevation of Privilege** | Gaining unauthorised access. | _"Can someone do things they're not allowed to?"_ |

### Threats by Threat Dragon Element

| Element | Applicable Threats | Common Examples |
|---------|-------------------|-----------------|
| **🧑 Actor** | _None directly_ | Customers, other systems. |
| **↩️ Data Flow** | **T**ampering, **I**nfo Disclosure, **D**oS | HTTP requests, database queries, API calls. |
| **📦 Process** | **All STRIDE threats** | Web apps, APIs, microservices. |
| **📁 Store** | **T**ampering, **R**epudiation, **I**nfo Disclosure, **D**oS | Databases, file systems, browser storage. |
| **🤝 Trust Boundary** | _Defines the threat context_ | Network perimeters, different infrastructure. |

### Common Mitigations

| Threat Type | Typical Mitigations |
|-------------|-------------------|
| **Spoofing** | MFA, authentication. |
| **Tampering** | Encryption, input validation. |
| **Repudiation** | Audit logs, digital signatures. |
| **Information Disclosure** | Encryption, access controls, limit data stored. |
| **Denial of Service** | Rate limiting, load balancing, monitoring. |
| **Elevation of Privilege** | Role-Based Access controls, least privilege, regular reviews. |

## Threat Dragon

Threat Dragon is a free, open-source threat modelling tool developed by [OWASP](https://owasp.org/about/). It enables teams to visually develop the data flows of a system, and document threats and mitigations. It supports [STRIDE](https://en.wikipedia.org/wiki/STRIDE_model), which this article focuses on, and other threat models. The output of Threat Dragon is not only visual, but is in JSON, so can be easily added to any source control system.

### Getting Started

Threat Dragon is available in two ways:

1. 🌐 Web version - Simply use within the browser at [https://threatdragon.com](https://threatdragon.com).
2. 💻 Desktop version - Available for download from the [OWASP Threat Dragon GitHub release page](https://github.com/OWASP/threat-dragon/releases).

Simply create a new model and start adding elements - Threat Dragon will suggest applicable STRIDE threats for each component you add.

### Tips with using Threat Dragon

Threat Dragon is a little temperamental but once you get use to it, it is a great tool.

#### Interface Navigation

* **Save frequently** - Models can be lost easily and saves sometimes fail.
* **Click arrow heads on Data Flows** to select data flows (not the line itself).
* **Click anywhere on Data Flows** to add corners/drag points.

#### Threat Analysis Best Practices

* **Different elements have different threats** - A Tampering threat on a Data Flow is different compared to a Process or Store. The mitigations will be different too.
* **Include all applicable threats** - Even mark as N/A to show they were considered.
* **Mark out-of-scope elements** - Document dependencies you can't control, but be aware they may change behaviour after marking as out-of-scope.
* **Review regularly** - Threats change as systems evolve, especially when adding new integrations.

#### Troubleshooting

* Models are JSON underneath - use JSON linting tools if Threat Dragon shows errors.
  * You can manually edit JSON files for bulk changes (find/replace for renaming).

## An Example

Here is a small, not very detailed example of a web application, which

1. Uses a 3rd party authentication provider (out of scope).
2. Communicates with a trusted API, which is considered a part of the software system.
3. This API stores data in a database.

![Example Threat Model](/assets/articles/threat-modelling/example-threat-model.png "Example Threat Model in Threat Dragon")

### Steps

1. Create the data flow / model of the application flow within your software system.
   1. If it's large, consider breaking it down and create, smaller separate threat models for logical parts of the flow. Threat Dragon can have multiple models within the same 'parent' model.
2. Analysis each process, store & data flow following STRIDE.
   1. When you have an element selected, clicking '+ New Threat' will at first default to adding the applicable threats for the element selected. However, you don't have to stick with this, feel free to add more as you see fit.

### The documented threats for the example

#### Out-of Scope

1. Customer / browser - In this example, I've marked the customer as being out-of-scope as we cannot control customer behaviour or their browser. This will not always be the case however.
2. 3rd Party Auth Provider - We assume it is secure but fundamentally it is not our responsibility to ensure it is, as it is maintained by a 3rd, trusted party.

#### Processes

##### Web App (frontend) 📦

| Threat | Risk | Status | Mitigation |
|--------|------|--------|------------|
| **Spoofing** | A malicious actor is able to gain access as another user of the application. | 🟢 Mitigated | Tokens are only stored in secure, httpOnly, SameSite cookies so cannot be accessed by anything else. XSS & CSP is in use too. |
| **Tampering** | Modifying data or code. | 🟢 Mitigated | 🔒 Code reviews, signed commits, and access controls are enforced. No data is stored with the Frontend application. |
| **Repudiation** | Denying an action or transaction has taken place. Denying without accountability. | 🟢 Mitigated | 📜 Audit logs are maintained with user identifiers. All commits must be signed |
| **Information Disclosure** | Some, customer information is stored in the browser local storage. | 🔴 Open (High) | Avoid using localStorage or sessionStorage. |
| **Denial of Service** | Preventing legitimate users from accessing a service or resource. | 🟢 Mitigated | ⚖️ Uses CDN caching and load balancing. |
| **Elevation of Privilege** | Gaining unauthorised access to resources or functionality. | 🟢 Mitigated | 🔑 Authorisation checks are carried out and there is no concept of roles within the application. Control to the infrastructure of the application and code is access controlled following least-privilege. |

##### Backend API 📦

| Threat | Risk | Status | Mitigation |
|--------|------|--------|------------|
| **Spoofing** | A malicious actor is able to gain access as another user of the application. | 🔴 Open (High) | CORS is used to limit access to just the Web App domain. However, no authorisation checks are carried out on the requests using the JWT, meaning anyone with a valid JWT can impersonate another customer. |
| **Tampering** | Modifying data or code. | 🟢 Mitigated | 🔒 Signed commits, code reviews, and access controls. No data is stored with the API. |
| **Repudiation** | Denying an action or transaction has taken place. Denying without accountability. | 🟢 Mitigated | 📜 Log all requests with user ID from the JWT and associated actions. |
| **Information Disclosure** | A 500 error response shows the stack trace, which exposes the language the API is written in etc. | 🔴 Open (Medium) | Return generic or sanitised error responses. |
| **Denial of Service** | Preventing legitimate people or processes from access a service or resource. | 🟢 Mitigated | ⚖️ Rate limiting, load balancing, and request timeouts. |
| **Elevation of Privilege** | Gaining unauthorised access to resources or functionality. | 🟢 Mitigated | 🔑 Role-based access control and least privilege enforced at the API code & infrastructure. |

#### Stores

##### 📁 Internal Database

| Threat | Risk | Status | Mitigation |
|--------|------|--------|------------|
| **Tampering** | Queries or stored data could be manipulated. | 🔴 Open (High) | Use parameterised queries, restrict database accounts, and enforce strict schema validation. |
| **Repudiation** | Denying an action or transaction has taken place. Denying without accountability. | 🟢 Mitigated | 📜 Database logs are maintained. |
| **Information Disclosure** | Personally identifiable information stored in plain text. | 🔴 Open (High) | Encrypt sensitive fields at rest & while in use. Ensure there are strict access controls to the database. |
| **Denial of Service** | Preventing legitimate people or processes from access a service or resource. | 🟢 Mitigated | ⚖️ Apply query limits, use indexes, and enable monitoring and alerts. |

#### ↔️ Data Flows

##### POST /api/{username}/order - 📦 Web App ↔ 📦 Backend API

| Threat | Status | Key Issue |
|--------|---------|-----------|
| **Tampering** | 🟢 Mitigated | TLS encryption. |
| **Information Disclosure** | 🔴 Open (High) | Username is in URL path. |
| **Denial of Service** | 🟢 Mitigated | Rate limiting, API gateway. |

##### Authenticate - 📦 Web App ↔ 📦 Third-Party Authentication Provider

| Threat | Status | Key Issue |
|--------|---------|-----------|
| **Tampering** | 🟢 Mitigated | TLS encryption. |
| **Information Disclosure** | 🟢 Mitigated | TLS with no sensitive data in request. |
| **Denial of Service** | ⚪ N/A | Third-party dependency risk. However, if they suffer a DoS, what impact will it have on us? |

##### Verify JWT - 📦 Backend API ↔ 📦 Third-Party Authentication Provider

| Threat | Status | Key Issue |
|--------|---------|-----------|
| **Tampering** | 🔴 Open (Medium) | TLS 1.1 used (insecure) |
| **Information Disclosure** | 🔴 Open (Low) | TLS 1.1 used (insecure) |
| **Denial of Service** | ⚪ N/A | Third-party dependency risk. However, if they suffer a DoS, what impact will it have on us? |

##### Queries - 📦 Backend API ↔ 📁 Internal Database

| Threat | Status | Key Issue |
|--------|---------|-----------|
| **Tampering** | 🔴 Open (Low) | No SSL on internal connections. |
| **Information Disclosure** | 🔴 Open (Low) | Credentials / queries unencrypted. |
| **Denial of Service** | 🟢 Mitigated | Resource limits & monitoring. |

## Conclusion

Threat modelling with STRIDE and Threat Dragon can help teams to methodically analyse software systems, to help them identify vulnerabilities before they become issues.

### Key takeaways

* **Include everyone** - Developers, architects, QAs, business stakeholders each bring unique perspectives.
* **Be comprehensive** - Document all threats, even those marked N/A, to demonstrate they have been considered.
* **Review regularly** - Systems evolve, and so should the threat model.

Threat Dragon may have its quirks, but it is free, accessible and fairly straight-forward to use. The JSON-based output is ideal for source control.

Remember: the goal isn't for bullet-proof security, it is about understanding and documenting the known risks.

## Additional Resources

* [GOV.UK - Conducting a STRIDE-based threat analysis](https://www.gov.uk/government/publications/secure-connected-places-playbook-documents/conducting-a-stride-based-threat-analysis).
* [OWASP Threat Dragon project](https://owasp.org/www-project-threat-dragon/).
* [OWASP Threat Modelling Process](https://owasp.org/www-community/Threat_Modeling_Process).
* [OWASP - STRIDE](https://owasp.org/www-community/Threat_Modeling_Process#stride).
* [STRIDE- Wikipedia](https://en.wikipedia.org/wiki/STRIDE_model).
