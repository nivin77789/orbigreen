# Orbigreen Techsource — Website Content Reference

Complete documentation of all user-facing content on the Orbigreen Techsource website. Each section mirrors the site structure and includes headlines, body copy, CTAs, forms, and data in full detail.

---

## Table of Contents

1. [Brand & Global Information](#1-brand--global-information)
2. [Navigation & Site Routes](#2-navigation--site-routes)
3. [Homepage](#3-homepage)
4. [About Page](#4-about-page)
5. [Products Page](#5-products-page)
6. [Services Page](#6-services-page)
7. [Service Detail Pages](#7-service-detail-pages)
8. [Global Presence / Get in Touch](#8-global-presence--get-in-touch)
9. [Contact Page](#9-contact-page)
10. [Request Quotation Page](#10-request-quotation-page)
11. [Media / Blog Page](#11-media--blog-page)
12. [Blog Articles (Full Text)](#12-blog-articles-full-text)
13. [Resources Page](#13-resources-page)
14. [Footer](#14-footer)
15. [Chatbot Assistant](#15-chatbot-assistant)
16. [Site Loader](#16-site-loader)

---

## 1. Brand & Global Information

| Field | Content |
|-------|---------|
| **Company name** | Orbigreen Techsource |
| **Tagline** | Smart. Sustainable. Sourcing. |
| **Site title** | Orbigreen Techsource — Industrial Sourcing Excellence |
| **Meta description** | Orbigreen Techsource — Single-window sourcing for industrial engineering machinery, parts, and services. Smart. Sustainable. Sourcing. |
| **Open Graph title** | Orbigreen Techsource — Industrial Sourcing Excellence |
| **Open Graph description** | Smart. Sustainable. Sourcing. Global industrial procurement, engineered. |

### Contact Details

| Field | Value |
|-------|-------|
| **Phone (display)** | +91 99718 63450 |
| **Phone (tel link)** | +919971863450 |
| **WhatsApp** | https://wa.me/919971863450 |
| **Email** | info@orbigreen.com |
| **Office address** | SCO 26, First Floor, Saraswati Vihar, Dhakoli, Zirakpur, Punjab – 160104, India |

### Brand Colors

| Token | Hex |
|-------|-----|
| Primary (teal) | `#0B5F7E` |
| Secondary (green) | `#5CBF2A` |
| Accent (lime) | `#8DD128` |
| Hero background | `#34A4BF` |
| Section background | `#FFFFFF` |

---

## 2. Navigation & Site Routes

### Primary Navigation

| Label | Route |
|-------|-------|
| Home | `/` |
| About | `/about` |
| Products | `/products` |
| Services | `/services` |
| Get in Touch | `/global-presence` |
| Media | `/blog` |

### Navigation CTAs

- **Desktop:** Quote (small screens) / Request Quote (large screens) → `/quotation`
- **Mobile menu:** Request Quotation → `/quotation`, Contact Us → `/contact`

### All Routes

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About |
| `/resources` | Resources *(routed, not in main nav)* |
| `/products` | Products |
| `/services` | Services listing |
| `/services/:slug` | Individual service detail |
| `/contact` | Contact |
| `/quotation` | Request Quotation |
| `/global-presence` | Global Presence / Get in Touch |
| `/blog` | Media / Blog |
| `/blog/:slug` | Blog post |
| `/admin/blog` | Admin blog editor *(internal)* |

---

## 3. Homepage

**Route:** `/`

---

### 3.1 Hero Video Section

| Element | Content |
|---------|---------|
| **Kicker** | Orbigreen Techsource |
| **Headline line 1** | Driving Sustainable |
| **Headline line 2** | Industrial Solutions |
| **Subheadline** | Engineering-led sourcing for OEMs worldwide. |
| **CTA 1** | Our Products → `/products` |
| **CTA 2** | Our Services → `/services` |

---

### 3.2 Services Marquee

Scrolling banner linking to all six services:

1. Training, Consultancy & Advisory → `/services/consultancy-advisory`
2. Global Sourcing → `/services/global-sourcing`
3. Engineering Services → `/services/engineering-services`
4. Quality & Inspection Services → `/services/quality-inspection`
5. Site & Installation Services → `/services/site-installation`
6. Logistics → `/services/transport-logistics`

---

### 3.3 How We Work (Scroll-Driven Workflow)

| Element | Content |
|---------|---------|
| **Section label** | How We Work |
| **Headline** | A clear, engineered **sourcing workflow.** |
| **Progress UI** | Step 01–06 of 06 with percentage indicator |

#### Step 01 — Requirement Understanding

Review technical drawings, specifications, and full project scope.

#### Step 02 — Supplier Identification

Select qualified manufacturers based on capability, capacity, and certifications.

#### Step 03 — Costing & Quotation

Coordinate RFQs and commercial evaluation to arrive at optimal landed cost.

#### Step 04 — Production Planning

Freeze manufacturing schedules and quality plans aligned to milestones.

#### Step 05 — Quality Assurance

Conduct in-process and final inspections, documenting quality at every stage.

#### Step 06 — Delivery Management

Coordinate logistics and documentation to ensure on-time, in-full shipments.

---

### 3.4 Closing CTA (End of Scroll Section)

| Element | Content |
|---------|---------|
| **Headline line 1** | Ready to Optimize |
| **Headline line 2** | Your Supply Chain! |
| **Body** | Let's discuss how Orbigreen Techsource can streamline your sourcing and secure your procurement process. |

---

### 3.5 How Can We Help (FAQ Prompts)

| Element | Content |
|---------|---------|
| **Section label** | How can we help! |
| **Headline** | Find the right support path in seconds. |

| # | Prompt | CTA Button | Link |
|---|--------|------------|------|
| 1 | Are your procurement costs higher than they should be! | Global Sourcing | `/services/global-sourcing` |
| 2 | Need expert support for equipment erection and commissioning! | Site & Installation | `/services/site-installation` |
| 3 | Facing supplier quality or PPAP challenges! | Quality & Inspection | `/services/quality-inspection` |
| 4 | Need precision-machined parts or tooling solutions delivered on time! | Explore Products | `/products` |
| 5 | Developing a new product and need engineering support! | Engineering Services | `/services/engineering-services` |
| 6 | Looking to improve supplier performance and reduce risk! | Consultancy & Advisory | `/services/consultancy-advisory` |
| 7 | Not sure where to start! | Talk to an Expert | `/global-presence` |

---

### 3.6 Product Categories Preview

*(Homepage shows first 4 of 10 products)*

| Element | Content |
|---------|---------|
| **Section label** | Product categories |
| **Headline** | Industrial components, **sourced to spec** |
| **Description** | Precision-machined, fabricated, and assembled parts — qualified across global supply networks and delivered to your engineering standards. |
| **Link** | View all products → `/products` |

| # | Title | Category | Description | CTA |
|---|-------|----------|-------------|-----|
| 01 | Castings | Metalwork | High-quality castings for diverse industrial applications. | Request sourcing → `/quotation` |
| 02 | Forging | Metal Forming | Closed-die, open-die, and precision forgings for industrial, automotive, and heavy-engineering applications. | Request sourcing |
| 03 | Machining | Precision | CNC and precision machining for tight-tolerance components. | Request sourcing |
| 04 | Fabrication | Structural | Custom metal fabrication for structural and industrial use. | Request sourcing |

---

### 3.7 Industries We Serve

| Element | Content |
|---------|---------|
| **Section label** | Industries We Serve |
| **Headline** | Sourcing across **12 sectors** |
| **Description** | Qualified suppliers, quality assurance, and logistics for diverse manufacturing programs. |

| Industry | Tagline |
|----------|---------|
| Automotive | Chassis, powertrain & stamped parts |
| Oil & Gas | Pressure vessels, skids & piping |
| Power & Energy | Turbines, boilers & grid components |
| White Goods | Stamped housings & appliance parts |
| Aerospace | Traceable machining & fabrication |
| Construction | Structural steel & heavy equipment |
| Off-Highway | Drivetrain, hydraulics & chassis |
| Agriculture | Tractor & harvester components |
| Railways | Bogie, brake & rail-grade parts |
| Mining | Wear parts & heavy fabrications |
| Electronics | Enclosures, brackets & housings |
| Industrial Machinery | Custom parts & OEM assemblies |

---

## 4. About Page

**Route:** `/about`

---

### 4.1 Hero

| Element | Content |
|---------|---------|
| **Section label** | Who we are |
| **Headline** | About **Orbigreen Techsource** |
| **Body** | Integrated sourcing for industrial engineering — combining supplier networks, procurement, and quality management to improve supply chain efficiency. We support OEMs worldwide with a single-window approach from components to delivery. |
| **CTA 1** | Get in Touch → `/contact` |
| **CTA 2** | Our Services → `/services` |
| **Capability pills** | Supplier · Quality · Engineering · Procurement · Delivery |

---

### 4.2 Company Overview

#### Who We Are

- A future-driven company shaping engineering and sustainable innovation
- Focused on delivering innovative, eco-friendly industrial solutions
- Strong presence in India with deep customer and supplier connections

#### Our Strengths

- Expertise in Sales, Project management, Procurement, and site execution
- Access to capable manufacturing partners with Manufacturing Cooperation agreements
- Commitment to compliance with international standards ASME U, U2, R, PED

#### Our Vision

- Partnering with global technology leaders and OEMs
- Bringing advanced and technology solutions to industry
- Supporting the industrial sector with proven, sustainable technologies

---

### 4.3 Our Story

| Element | Content |
|---------|---------|
| **Section label** | Our Story |
| **Headline** | Why we exist |

**Paragraph 1:** We were built on a simple idea: industrial companies need one partner for the full complexity of global sourcing — from drawing intake and supplier identification to quality assurance and on-time delivery — without managing multiple vendors alone.

**Paragraph 2:** We operate as a global sourcing partner, not a manufacturer. Our network manages your supply chain with visibility and predictability.

---

### 4.4 A Global Sourcing Partner

| Element | Content |
|---------|---------|
| **Section label** | A Global Sourcing Partner |
| **Headline** | People, technology, and supplier ecosystems — managed end to end. |

**Paragraph 1:** Our approach enables better visibility, scalability, and operational predictability across procurement and supply chain operations. We work as an extension of your team.

**Paragraph 2:** By centralizing sourcing, quality, and logistics through a single partner, you reduce complexity, mitigate supplier risk, and free internal teams to focus on core product development.

---

### 4.5 Core Capabilities

| Element | Content |
|---------|---------|
| **Section label** | What we deliver |
| **Headline** | Core capabilities across your supply chain |

| Capability | Description |
|------------|-------------|
| Supplier Sourcing | Global network of vetted industrial suppliers and strategic partnerships across multiple regions. |
| Quality Management | Rigorous quality control, inspections, and compliance at every stage of the supply chain. |
| Engineering Coordination | Technical expertise across manufacturing domains from design to production. |
| Procurement | Streamlined procurement processes and strategic sourcing for cost efficiency. |
| Delivery Management | On-time logistics, shipping coordination, and end-to-end supply chain management. |

---

### 4.6 Our Values

| Element | Content |
|---------|---------|
| **Section label** | Our Values |
| **Headline** | The principles that guide how we work every day |

| Value | Description |
|-------|-------------|
| Results-Driven | We focus on measurable outcomes — cost savings, lead time reduction, and quality improvement for every engagement. |
| Global Mindset | We think and operate across borders, connecting you with the right suppliers and solutions wherever they are. |
| Integrity & Transparency | We build long-term relationships on trust, clear communication, and ethical practices in every transaction. |
| Agility | We adapt quickly to changing requirements, market conditions, and your evolving business needs. |

---

### 4.7 How We Work With You

| Element | Content |
|---------|---------|
| **Section label** | How We Work With You |
| **Headline** | A collaborative, transparent process from first contact to final delivery |

**01 — Understand & Plan**  
We start by understanding your requirements, volumes, quality standards, and timelines. From there we define scope, identify risks, and agree on a clear plan.

**02 — Source & Qualify**  
We tap our global network to source and qualify suppliers, run technical and commercial evaluations, and recommend the best fit for your project.

**03 — Execute & Assure Quality**  
We coordinate production, manage quality inspections and audits, and keep you updated at every stage so you stay in control without the operational burden.

**04 — Deliver & Support**  
We manage logistics and delivery to your door, and support installation and commissioning when needed. Our relationship continues with ongoing supply and continuous improvement.

---

### 4.8 Closing CTA

| Element | Content |
|---------|---------|
| **Section label** | Partner With Us |
| **Headline** | Discover how our integrated sourcing approach can transform your supply chain |
| **Body** | Better visibility, lower risk, and a single partner you can rely on — from first quote to final delivery. |
| **CTA** | Get in Touch → `/contact` |

---

## 5. Products Page

**Route:** `/products`

---

### 5.1 Hero

| Element | Content |
|---------|---------|
| **Section label** | Product Catalog |
| **Headline** | Our **Products** |
| **Description** | Precision-machined, fabricated, and assembled industrial components — qualified across global supply networks and delivered to your engineering standards. |
| **CTA 1** | Request Quotation → `/quotation` |
| **CTA 2** | Our Services → `/services` |

---

### 5.2 Product Categories (All 10)

| Element | Content |
|---------|---------|
| **Section label** | Product categories |
| **Per-card CTA** | Request sourcing → `/quotation` |
| **Page bottom CTA** | Request sourcing → `/quotation` |

| # | Title | Category | Description |
|---|-------|----------|-------------|
| 01 | Castings | Metalwork | High-quality castings for diverse industrial applications. |
| 02 | Forging | Metal Forming | Closed-die, open-die, and precision forgings for industrial, automotive, and heavy-engineering applications. |
| 03 | Machining | Precision | CNC and precision machining for tight-tolerance components. |
| 04 | Fabrication | Structural | Custom metal fabrication for structural and industrial use. |
| 05 | Pressure Vessels | Tanks | Engineered pressure vessels and industrial storage tanks compliant with international standards. |
| 06 | Stamping Parts | Assemblies | Stamped metal parts and assemblies for high-volume production. |
| 07 | Proprietary Machines | Custom | Custom machinery and specialized components for unique manufacturing needs. |
| 08 | Fasteners | Fixings | Industrial fasteners and fixing solutions for assembly and construction. |
| 09 | Transmission & Gears | Powertrain | Transmission systems, gears, and power transmission components. |
| 10 | Assemblies | Integrated | Sub-assemblies and fully integrated mechanical assemblies — sourced, inspected, and delivered ready for installation. |

---

### 5.3 Closing CTA

| Element | Content |
|---------|---------|
| **Section label** | Get Started |
| **Headline** | Need a custom sourcing program! |
| **Body** | Share your drawings, quantities, and delivery targets — we'll qualify suppliers and build a procurement plan around your product requirements. |
| **CTA** | Discuss your requirement → `/quotation` |

---

## 6. Services Page

**Route:** `/services`

---

### 6.1 Hero

| Element | Content |
|---------|---------|
| **Section label** | What We Offer |
| **Headline** | Our Services |
| **Description** | Comprehensive industrial sourcing, engineering, and quality solutions designed to optimize your operations end to end. |
| **CTA 1** | Request Quotation → `/quotation` |
| **CTA 2** | Get in Touch → `/global-presence` |

---

### 6.2 Services Listing

| Element | Content |
|---------|---------|
| **Section label** | Services we offer |
| **Card CTA** | Learn more → `/services/{slug}` |
| **Page bottom CTA** | Request quotation → `/quotation` |

| # | Title | Short Description | URL Slug |
|---|-------|-------------------|----------|
| 01 | Training, Consultancy & Advisory | Professional consulting services to help businesses optimize procurement and sourcing. | `consultancy-advisory` |
| 02 | Global Sourcing | International sourcing solutions to connect you with the best suppliers worldwide. | `global-sourcing` |
| 03 | Engineering Services | Engineering support for manufacturing projects from concept to production. | `engineering-services` |
| 04 | Quality & Inspection Services | Quality assurance throughout the supply chain ensuring compliance and excellence. | `quality-inspection` |
| 05 | Site & Installation Services | Support during project implementation for smooth, on-time delivery. | `site-installation` |
| 06 | Logistics | End-to-end freight coordination, customs clearance, and on-time delivery across global supply routes. | `transport-logistics` |

---

### 6.3 Closing CTA

| Element | Content |
|---------|---------|
| **Section label** | Get Started |
| **Headline** | Optimize your sourcing operations |
| **Body** | Tell us about your project requirements — we'll recommend the right combination of sourcing, engineering, and quality services for your program. |
| **CTA** | Discuss your requirement → `/quotation` |

---

## 7. Service Detail Pages

**Route pattern:** `/services/:slug`

### Shared Layout Elements

| Element | Content |
|---------|---------|
| **Back link** | ← All Services |
| **Label** | Service 01–06 |
| **CTA 1** | Get in Touch → `/quotation` |
| **CTA 2** | Get in Touch → `/global-presence` |
| **Overview label** | Overview |
| **More services headline** | Explore our other capabilities |
| **Bottom label** | Get Started |
| **Bottom headline** | Ready to discuss {service title}! |
| **Bottom body** | Tell us about your program requirements and our team will recommend the right approach for your sourcing and delivery goals. |
| **Bottom CTA** | Discuss your requirement → `/quotation` |

---

### 7.1 Training, Consultancy & Advisory

**URL:** `/services/consultancy-advisory`

| Field | Content |
|-------|---------|
| **Short description** | Professional consulting services to help businesses optimize procurement and sourcing. |
| **Section title** | Transforming Your Supply Chain Strategy |
| **Overview** | Navigating the complexities of global procurement requires unparalleled expertise and insight. Our consultancy and advisory services are meticulously tailored to empower your business with strategic guidance, reducing costs while maximizing efficiency and reliability. |
| **Focus label** | Key Focus Areas |

**Focus areas:**
- Supply chain strategy
- Procurement advisory
- Cost optimization
- Supplier evaluation
- Sourcing transformation

| Field | Content |
|-------|---------|
| **Partner section title** | Why Partner With Us! |
| **Partner description** | Our team brings decades of combined experience across multi-national industries, deploying data-backed methodologies to uncover hidden value in your supply chain and procurement structures. |
| **Quote** | Driving competitive advantage through optimized strategic sourcing, enabling businesses to scale profitably. |

---

### 7.2 Global Sourcing

**URL:** `/services/global-sourcing`

| Field | Content |
|-------|---------|
| **Short description** | International sourcing solutions to connect you with the best suppliers worldwide. |
| **Section title** | Connecting You Globally |
| **Overview** | Overcome geographical boundaries with our premier global sourcing capabilities. We identify, qualify, and manage top-tier vendors worldwide, guaranteeing you secure access to high-quality materials and cost-effective resourcing that meets your exacting standards. |
| **Focus label** | Capabilities Include |

**Capabilities:**
- Supplier identification
- Vendor qualification
- Procurement management
- Cost-effective sourcing

| Field | Content |
|-------|---------|
| **Partner section title** | Our Extensive Network |
| **Partner description** | With an expansive network spanning multiple continents and diverse manufacturing hubs, we mitigate supplier risks while opening doors to unparalleled production capacities and emerging markets. |
| **Quote** | Bridging global markets to deliver tailored sourcing solutions with unfailing reliability. |

---

### 7.3 Engineering Services

**URL:** `/services/engineering-services`

| Field | Content |
|-------|---------|
| **Short description** | Engineering support for manufacturing projects from concept to production. |
| **Section title** | From Concept to Reality |
| **Overview** | Bring your ideas to life and scale your manufacturing with our end-to-end engineering support. We assist your technical teams in finalizing designs, evaluating feasibility, and implementing effective manufacturing methodologies to ensure your product hits the market successfully. |
| **Focus label** | Core Competencies |

**Competencies:**
- Design engineering
- Technical evaluation
- Product development
- Manufacturing engineering

| Field | Content |
|-------|---------|
| **Partner section title** | Technical Excellence |
| **Partner description** | Our team of industry-leading engineers applies rigorous evaluation frameworks to bridge the gap between initial ideation and final-scale production, resolving pain points preemptively. |
| **Quote** | Precision-driven engineering accelerating development pipelines and securing product lifecycles. |

---

### 7.4 Quality & Inspection Services

**URL:** `/services/quality-inspection`

| Field | Content |
|-------|---------|
| **Short description** | Quality assurance throughout the supply chain ensuring compliance and excellence. |
| **Section title** | Uncompromising Compliance |
| **Overview** | Protecting your brand reputation requires absolute certainty. Our comprehensive quality assurance services guarantee that every unit produced meets rigorous international standards and precise client specification, stopping errors before they disrupt your chain. |
| **Focus label** | Inspection Details |

**Inspection areas:**
- Factory inspection
- Production monitoring
- Quality audits
- Compliance checks

| Field | Content |
|-------|---------|
| **Partner section title** | Auditing at Source |
| **Partner description** | Our boots-on-the-ground approach ensures thorough factory audits and localized production monitoring, granting full visibility and shielding our clients from non-compliance. |
| **Quote** | Fortifying your products with an unwavering commitment to quality assurance at every production stage. |

---

### 7.5 Site & Installation Services

**URL:** `/services/site-installation`

| Field | Content |
|-------|---------|
| **Short description** | Support during project implementation for smooth, on-time delivery. |
| **Section title** | Seamless Implementations |
| **Overview** | Completing a project successfully depends heavily on proper installation and commissioning. Our dedicated site services teams supervise operations directly on-site, ensuring complex equipment is seamlessly integrated and optimally functional from day one. |
| **Focus label** | Operational Support |

**Support areas:**
- On-site supervision
- Equipment installation
- Commissioning
- Operational support

| Field | Content |
|-------|---------|
| **Partner section title** | Expert Mobilization |
| **Partner description** | Our personnel bring localized logistical solutions directly to your facilities, reducing setup times and minimizing unnecessary operational downtime. |
| **Quote** | Delivering reliable, hands-on construction and technical installation that guarantees operational continuity. |

---

### 7.6 Logistics

**URL:** `/services/transport-logistics`

| Field | Content |
|-------|---------|
| **Short description** | End-to-end freight coordination, customs clearance, and on-time delivery across global supply routes. |
| **Section title** | Moving Your Supply Chain Forward |
| **Overview** | Reliable logistics is the backbone of global sourcing. We coordinate multimodal transport, customs documentation, and last-mile delivery — ensuring your components and equipment arrive on schedule, in spec, and with full shipment visibility. |
| **Focus label** | Logistics Capabilities |

**Capabilities:**
- Freight forwarding
- Customs & documentation
- Multimodal shipping
- Warehouse coordination
- Delivery tracking

| Field | Content |
|-------|---------|
| **Partner section title** | Seamless Global Movement |
| **Partner description** | Our logistics partners span air, sea, and road networks across key trade corridors — reducing transit risk and giving you predictable lead times from factory floor to your facility. |
| **Quote** | Connecting sourcing excellence with dependable transport — so your supply chain never stops moving. |

---

## 8. Global Presence / Get in Touch

**Route:** `/global-presence`

---

### 8.1 Hero

| Element | Content |
|---------|---------|
| **Section label** | Get in Touch |
| **Headline** | Our global presence **& network** |
| **Form toggles** | Contact Us · Request Quotation |

The hero includes an inline **Contact Form** or **Quotation Form** (compact mode) depending on the selected toggle.

---

### 8.2 Active Hubs (Global Network Map)

| Element | Content |
|---------|---------|
| **Section label** | Active Hubs |
| **Map alt text** | Orbigreen global supply network map showing connected hubs across North America, South America, EMEA, and Asia Pacific |

**Active hub regions:** North America · South America · EMEA · Asia Pacific

---

### 8.3 Closing CTA

| Element | Content |
|---------|---------|
| **Section label** | Get Started |
| **Headline** | Expand your supply base **with confidence** |
| **Body** | Tell us your target regions and product categories — we'll map the right network for your program. |
| **CTA 1** | Request Quotation → `/quotation` |
| **CTA 2** | Contact Us → `/contact` |

---

## 9. Contact Page

**Route:** `/contact`

---

### 9.1 Hero

| Element | Content |
|---------|---------|
| **Section label** | Get in Touch |
| **Headline** | Contact **Orbigreen** |
| **Body** | Reach our team for general enquiries, partnership discussions, or follow-up on an active sourcing program. For detailed quotes with attachments, use the quotation form. |
| **CTA** | Request Quotation with attachments → `/quotation` |

---

### 9.2 Contact Section

| Element | Content |
|---------|---------|
| **Section label** | Contact Us Today |
| **Headline** | Let's build your / supply advantage. |
| **Phone** | +91 99718 63450 |
| **Email** | info@orbigreen.com |
| **Office** | SCO 26, First Floor, Saraswati Vihar, Dhakoli, Zirakpur, Punjab – 160104, India |
| **CTA** | Request Quotation → `/quotation` |

---

### 9.3 Contact Form Fields

**Compact header (on Global Presence page):**
- **Label:** Contact Us
- **Subtext:** Send a quick message — our team will respond within one business day.

| Field | Required |
|-------|----------|
| Full name | Yes |
| Work email | Yes |
| Tell us about your sourcing requirement *(textarea)* | Yes |

**Submit button:** Send message *(changes to **Sent** on submit)*

---

## 10. Request Quotation Page

**Route:** `/quotation`

---

### 10.1 Hero

| Element | Content |
|---------|---------|
| **Section label** | Get a Quote |
| **Headline** | Request a **Quotation** |
| **Body** | Submit your sourcing requirement with drawings or specifications attached. Our team will review and respond with supplier options, lead times, and commercial terms. |

---

### 10.2 What to Include Checklist

| Item | Detail |
|------|--------|
| Drawings & models | Part drawings, 3D models, or reference images |
| Material & standards | Material grade, tolerances, and quality standards |
| Volume | Annual volume or batch quantity |
| Delivery | Delivery location and target timeline |

---

### 10.3 Contact Information on Page

- **Phone:** +91 99718 63450
- **Email:** info@orbigreen.com
- **Office:** SCO 26, First Floor, Saraswati Vihar, Dhakoli, Zirakpur, Punjab – 160104, India

---

### 10.4 Trust Badges

- 24h review
- Supplier options
- Commercial terms

---

### 10.5 Quotation Form Fields

| Field | Required | Notes |
|-------|----------|-------|
| Company name | Yes | |
| Contact person | Yes | |
| Work email | Yes | |
| Phone | Yes | |
| Category | Yes | Dropdown — see options below |
| Quantity / volume | No | |
| Requirement details — material, tolerances, delivery, timeline | Yes | Textarea |
| File upload | No | Attach drawings, specs, or images |

**Category dropdown options:**
1. Castings & Forging
2. Machining & Fabrication
3. Assemblies & Stamping
4. Pressure Vessels & Tanks
5. Fasteners & Transmission
6. Engineering Services
7. Global Sourcing
8. Logistics
9. Site Installation
10. Other

**Accepted file types:** image/*, .pdf, .dwg, .dxf, .step, .stp, .iges, .igs, .zip, .doc, .docx, .xls, .xlsx *(multiple files allowed)*

**Submit button:** Submit request *(changes to **Sent** on submit)*

---

## 11. Media / Blog Page

**Route:** `/blog`

---

### 11.1 Page Header

| Element | Content |
|---------|---------|
| **Headline** | MEDIA |

---

### 11.2 Gallery Section

| Element | Content |
|---------|---------|
| **Headline** | Gallery |
| **Description** | Industrial sourcing in action — capabilities, supplier programs, and quality workflows. |

| Title | Label |
|-------|-------|
| Precision Machining | Components |
| Fabrication Programs | Manufacturing |
| Global Sourcing | Supplier Network |
| Quality Inspection | Assurance |
| Delivery Coordination | Logistics |

---

### 11.3 Blogs Section

| Element | Content |
|---------|---------|
| **Headline** | Blogs |
| **Loading state** | Loading articles… |
| **Empty state** | No articles published yet. / Check back soon for new insights. |

---

### 11.4 Page Footer CTA

Need sourcing support for your program! **Request a quotation** → `/quotation`

---

### 11.5 Blog Post Page CTA (All Posts)

| Element | Content |
|---------|---------|
| **Headline** | Discuss your sourcing program |
| **Body** | Talk to our team about supplier qualification, quality planning, or global sourcing support. |
| **CTA 1** | Request Quotation → `/quotation` |
| **CTA 2** | Contact Us → `/contact` |

**Error state (post not found):**
- **Headline:** Article not found
- **Body:** This post may have been removed or is not published yet.
- **CTA:** Back to Media → `/blog`

---

## 12. Blog Articles (Full Text)

---

### Article 1: Global Sourcing — Cheap Unit Cost vs True Landed Cost

| Field | Value |
|-------|-------|
| **URL slug** | `global-sourcing-cost-vs-landed-cost` |
| **Category** | Sourcing Insights |
| **Author** | Orbigreen Editorial |
| **Published** | 12 May 2026 |
| **Tags** | Global Sourcing, Procurement, Cost |

**Excerpt:** Why procurement teams should evaluate freight, duties, quality fallout, and lead-time risk — not just piece price.

**Full article:**

> Many sourcing programs start with a simple question: who can supply this part at the lowest unit price! On paper, that approach looks efficient. In practice, the lowest quote rarely equals the lowest total cost.
>
> Landed cost includes freight, insurance, customs duties, inspection, rework, inventory carrying cost, and the operational burden of managing distant suppliers. A part that saves 8% on FOB price can still increase total program cost if quality escapes or logistics delays production.
>
> Orbigreen Techsource helps OEMs compare suppliers on engineering fit, manufacturing capability, and delivery reliability — not price alone. We model scenarios across regions, align quality plans early, and coordinate logistics so procurement decisions reflect real business impact.
>
> If you are rebalancing supply between India, China, Turkey, or Southeast Asia, start with a landed-cost framework before locking long-term awards.

---

### Article 2: Supplier Quality & PPAP — What OEMs Should Verify Early

| Field | Value |
|-------|-------|
| **URL slug** | `supplier-quality-ppap-readiness` |
| **Category** | Quality |
| **Author** | Orbigreen Editorial |
| **Published** | 20 May 2026 |
| **Tags** | Quality, PPAP, Inspection |

**Excerpt:** A practical checklist for PPAP readiness, process controls, and inspection planning before production release.

**Full article:**

> Quality issues discovered after tooling transfer are expensive to fix. PPAP and supplier quality planning should begin during supplier selection — not after the first shipment.
>
> Key verification areas include process capability, control plans, measurement systems, material traceability, and corrective-action discipline. For castings, forgings, and machined parts, dimensional stability and heat-treatment records matter as much as final inspection reports.
>
> Our quality and inspection services support desktop audits, on-site reviews, in-process checks, and pre-shipment verification. We align documentation with customer standards and close gaps before parts reach your line.
>
> Strong supplier quality is not a gate at the end of sourcing — it is a continuous program managed across engineering, procurement, and operations.

---

### Article 3: Engineering-Led Sourcing for OEM Product Programs

| Field | Value |
|-------|-------|
| **URL slug** | `engineering-led-sourcing-for-oems` |
| **Category** | Engineering |
| **Author** | Orbigreen Editorial |
| **Published** | 1 June 2026 |
| **Tags** | Engineering, OEM, NPI |

**Excerpt:** How technical evaluation, DFM input, and supplier coordination accelerate new product introduction.

**Full article:**

> Industrial sourcing succeeds when engineering and procurement work from the same technical baseline. Drawings, tolerances, material specs, and process requirements must be validated before commercial awards.
>
> Engineering-led sourcing reduces redesign cycles, prevents unmanufacturable proposals, and improves supplier accountability. It is especially critical for assemblies, pressure equipment, and precision-machined components where small specification gaps create major field risk.
>
> Orbigreen supports OEM teams with supplier identification, technical reviews, manufacturing cooperation agreements, and program execution through delivery. We act as a single window — from component sourcing to site support when required.
>
> For new product launches, invest early in supplier engineering alignment. It protects schedule, cost, and brand reputation over the full product lifecycle.

---

## 13. Resources Page

**Route:** `/resources` *(available but not linked in main navigation)*

---

### 13.1 Hero

| Element | Content |
|---------|---------|
| **Section label** | Knowledge Hub |
| **Headline** | Resources |
| **Description** | Guides, insights, FAQs, and case studies to help procurement and engineering teams source with confidence. |

---

### 13.2 Guides

**Description:** Practical breakdowns of sourcing, quality, and cost control — written for engineering and procurement teams.

1. Cheap sourcing vs landed cost
2. How to qualify overseas suppliers
3. Quality planning for industrial components

*(Each card displays "Read more →" — placeholder links, no destination yet)*

---

### 13.3 Insights

**Description:** Market intelligence, diversification strategies, and operational best practices from active sourcing programs.

1. China+1 strategy (and common pitfalls)
2. Supplier risk management
3. Lead time reduction playbook

---

### 13.4 FAQ

**Description:** Fast answers to common questions about global sourcing, inspections, and working models.

1. What is global sourcing!
2. Agent vs buying office
3. When do you need factory audits!

---

### 13.5 Case Studies

**Description:** Real-world examples of cost savings, quality improvement, and delivery performance gains.

1. Cost-down & benchmarking
2. Quality stabilization
3. Supply chain transparency rollout

---

### 13.6 Closing CTA

| Element | Content |
|---------|---------|
| **Section label** | Need help! |
| **Headline** | Talk to an expert |
| **Body** | Share your drawings, specs, or sourcing goals — we'll recommend the right sourcing, quality, and delivery approach. |
| **CTA** | Discuss your requirement → `/contact` |

---

## 14. Footer

Present on all pages.

---

### 14.1 Follow Us (Social Links)

| Platform | URL |
|----------|-----|
| LinkedIn | https://www.linkedin.com/company/orbigreen-techsource |
| Facebook | https://www.facebook.com/orbigreentechsource |
| Instagram | https://www.instagram.com/orbigreentechsource |
| WhatsApp | https://wa.me/919971863450 |

---

### 14.2 Reach

- +91 99718 63450
- info@orbigreen.com
- SCO 26, First Floor, Saraswati Vihar, Dhakoli, Zirakpur, Punjab – 160104, India

---

### 14.3 Quick Links

| Label | Route |
|-------|-------|
| Home | `/` |
| About | `/about` |
| Media | `/blog` |
| Get in Touch | `/global-presence` |
| Request Quotation | `/quotation` |
| Contact | `/contact` |

---

### 14.4 Services Links

| Service | Route |
|---------|-------|
| Training, Consultancy & Advisory | `/services/consultancy-advisory` |
| Global Sourcing | `/services/global-sourcing` |
| Engineering Services | `/services/engineering-services` |
| Quality & Inspection Services | `/services/quality-inspection` |
| Site & Installation Services | `/services/site-installation` |
| Logistics | `/services/transport-logistics` |

---

### 14.5 Copyright

© 2026 Orbigreen Techsource. All rights reserved.

---

## 15. Chatbot Assistant

Floating widget on all pages.

---

### 15.1 UI Labels

| Element | Content |
|---------|---------|
| **Widget title** | Orbigreen Assistant |
| **Subtitle** | Typically replies instantly |
| **Input placeholder** | Type your question… |
| **Footer link** | Contact our team → `/quotation` |

---

### 15.2 Welcome Message

> Hi! I'm the Orbigreen assistant. Ask about our services, sourcing markets, or how to get in touch.

---

### 15.3 Quick Reply Buttons

1. Our services
2. Sourcing markets
3. Contact details
4. Get a quote

---

### 15.4 Scripted Responses

| Trigger (message contains) | Response |
|----------------------------|----------|
| **our services** | We offer training, consultancy & advisory, global sourcing, engineering services, quality & inspection, site & installation, and transport & logistics. |
| **sourcing markets** | We source across China, Vietnam, India, and Turkey with on-the-ground teams for supplier qualification, audits, and delivery management. |
| **contact details** | Phone: +91 99718 63450 · Email: info@orbigreen.com · Office: SCO 26, First Floor, Saraswati Vihar, Dhakoli, Zirakpur, Punjab – 160104, India. |
| **get a quote** / **price** / **cost** / **quote** | Submit your requirement on our Request Quotation page — you can attach drawings, specs, and reference files for a detailed commercial proposal. |
| **hello** / **hi** | Hello! How can we help with your industrial sourcing needs today! |
| **product** | We source castings, machining, fabrication, pressure vessels, stamping parts, proprietary machines, fasteners, and transmission components. |
| **Default fallback** | I can help with services, sourcing markets, products, or contact info. Try a quick reply below or visit our contact section. |

---

## 16. Site Loader

Shown while the app bootstraps on first load.

| Element | Content |
|---------|---------|
| **Label** | Preparing experience |
| **Progress label** | Loading assets |
| **Indicator** | Percentage 0–100% |

---

## Development Quick Reference

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

**Tech stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Lenis (smooth scroll)

---

*Last updated: June 2026 — content sourced from live site data files and page components.*
