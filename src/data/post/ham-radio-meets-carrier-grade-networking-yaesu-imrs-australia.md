---
publishDate: 2026-01-14T00:00:00Z
title: 'When Ham Radio Meets Carrier Grade Networking: Lessons from the Yaesu IMRS Build in Australia'
excerpt: I was part of the team that built Australia's Yaesu IMRS network with KernWi-Fi. Here's what we learned applying carrier-grade design principles to community infrastructure—and why it matters.
image: https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80
author: David Lopez
tags:
  - networking
  - infrastructure
  - mikrotik
  - bgp
  - ospf
  - network-design
category: Network Architecture
---

Community infrastructure often gets treated like a hobby project. When I joined the team working with KernWi-Fi and Australian amateur radio clubs to link Yaesu DR-2X repeaters over IP using IMRS, we had a different vision: design it like a service provider network from day one.

The ask was simple but ambitious—predictable routing, strong isolation, and security you can actually audit. The reality? We had to challenge every assumption about what "good enough" means for community infrastructure. What we built demonstrates how carrier-grade principles—segmentation, dynamic routing, and operational discipline—can transform a volunteer network into something production-ready.

## The architecture that makes it "enterprise-grade"

We designed the system around "Kern DC" as a centralized routing and management hub, with "Kern Nodes" deployed at each repeater site. Early on, we decided to standardize on NBN circuits for primary transport and run OSPF internally for resilience—choices that paid off immediately when we hit our first circuit failure during testing.

This isn't your typical homebrew setup. We deliberately borrowed patterns from service provider networks I've worked on in production:

**Hierarchical design**: We built a clear core-edge topology with Kern DC handling aggregation and external routing, while Kern Nodes at each site focus exclusively on local repeater connectivity. This separation of concerns made troubleshooting so much easier—when a site has issues, we know exactly where to look.

**Dynamic routing with OSPF**: One of the first debates we had was static routes versus OSPF. I pushed hard for OSPF, knowing from experience that static routes break silently and turn every circuit failure into a manual recovery event. OSPF's automatic failover and fast convergence meant voice traffic would find alternate paths without us getting paged at 3 AM.

**NBN as primary transport**: We could have saved money with residential connections, but commercial NBN circuits give us predictable bandwidth and SLAs. When something breaks, we can actually call someone—that operational leverage is worth every dollar.

## Segmentation is the real story here

Honestly, the segmentation strategy is what I'm most proud of. We implemented textbook layer-2 and layer-3 isolation from day one:

**Dedicated IMRS VLAN**: We isolated digital voice and control traffic in its own VLAN. This wasn't theoretical—during early testing, we saw management traffic from monitoring tools compete with IMRS packets. After moving IMRS to its dedicated VLAN, voice quality issues disappeared. IMRS packets never compete with other traffic at layer 2, maintaining consistent forwarding behavior even during network events.

**Separate L3 tunnel VLAN**: We carved out monitoring and management traffic into its own isolated path. This decision saved us during an incident where a monitoring script went haywire—it saturated the management VLAN but voice services kept running perfectly. Troubleshooting and maintenance operations can't interfere with voice services, and vice versa.

**Edge ACLs with explicit port control**: We restricted traffic entering the IMRS network to authorized endpoints only, with firewall rules that explicitly allow only IMRS UDP port 21110. I learned this lesson the hard way on previous projects—attack surface reduction and traffic determinism under congestion are free if you design for them upfront.

This segmentation strategy is what separates a production network from a science project. Each service gets its own failure domain, its own QoS treatment, and its own security boundary. When something breaks, it breaks in a contained way.

## External routing done right

For external routing, we configured BGP announcements from the core for the 44.30.65.0/24 prefix (AS137399). This was one of those decisions where we had to explain the "why" multiple times, but it was worth it:

- **Clean prefix advertisement**: A single /24 announced via BGP means external routers see exactly one simple, stable routing table entry. No flickering, no route instability, no confusion.
- **No internal complexity leakage**: Our OSPF topology stays completely internal. External peers see the BGP edge—nothing more. This gives us the freedom to restructure internally without touching external announcements.
- **Controlled reachability**: Having our own AS (AS137399) gives us real administrative control over routing policy and lets us establish proper peering relationships with other networks. This isn't just for show—it means we can implement traffic engineering and filtering at the autonomous system level.

I borrowed this BGP pattern directly from service provider networks I've built—stable, predictable, and auditable. It's how you expose networks professionally, and there's no reason community infrastructure should be any different.

## Why this matters to network architects

Building this system reinforced something I already knew but sometimes forget: "reliability" is an outcome of fundamentals—segmentation, consistent edge policy, dynamic routing, and documentation you can defend in a review.

**Security through design**: Our ACL strategy wasn't about adding a firewall as an afterthought—we baked it into the architecture from day one. I've seen too many projects where security is bolted on later and becomes a constant source of friction. Explicit port allowlisting and VLAN isolation meant our attack surface was minimal by default. When the security audit came, we passed without surprises.

**Operational predictability**: We've already had links fail, software upgrades go sideways, and configuration mistakes. But OSPF's fast convergence and our segmentation strategy meant we could troubleshoot one component without taking down the entire system. Each VLAN has clear boundaries, each service has defined endpoints. The difference between this and previous community networks I've worked on is night and day.

**Compliance-grade discipline**: Working with KernWi-Fi, we maintained something often missing in volunteer projects—reporting-ready technical documentation. When you design like a carrier, you document like one too: architecture diagrams, policy documents, and change control procedures that could pass an audit. This wasn't busywork—it saved us hours during troubleshooting and onboarding new team members.

**Scalability patterns**: The hub-and-spoke model with Kern DC at the center has already proven itself. We've added three new repeater sites since launch, and each one followed the same playbook: join the OSPF domain, configure VLANs, apply ACLs. The pattern we established on day one scales without requiring re-architecture.

## What I'd tell other infrastructure engineers

If you're building any kind of community or distributed infrastructure, here's what I learned from this build:

1. **Treat it like production from day one**: Even if it's "just for volunteers," apply the same design rigor you'd use for paying customers. The complexity doesn't care about your budget. The network doesn't know it's community infrastructure—it will fail in exactly the same ways a commercial network fails if you cut corners.

2. **Segment everything**: VLANs cost nothing but give you isolation, failure domains, and troubleshooting boundaries that saved us hours every time something went wrong. The first time you can tell a stakeholder "the voice system is fine, it's just the monitoring system having issues"—you'll understand why this matters.

3. **Use dynamic routing**: Static routes might seem simpler at first, but they don't scale and they fail badly. OSPF paid for itself the first time a circuit went down and traffic automatically rerouted. We didn't even know about the failure until we checked logs—that's the goal.

4. **Document for strangers**: I wrote docs assuming I'd get hit by a bus tomorrow. Someone without context should be able to follow your documentation and understand what's happening. Future you (and your team) will thank present you every single time.

5. **Control the edge**: I've debugged enough incidents to know that most attacks and most problems enter at the edge. Strong edge policies (ACLs, explicit port allowlisting, endpoint authentication) are your first and best defense. Invest the time here early.

This project proved to me that community infrastructure doesn't have to be fragile. With the right architecture and operational discipline, it can meet carrier-grade standards. The difference is just deciding to care about reliability from the start.

---

**Sources:**
- [Australian Ham Clubs Build Enterprise-Grade Yaesu IMRS Repeater System](https://daily.hamweekly.com/2026/01/australian-clubs-build-enterprise-grade-yaesu-imrs-repeater-system/) - Ham Weekly
- [KernWi-Fi engineers the VK Yaesu IMRS Network](https://kernwifi.com.au/kernwi-fi-engineers-the-vk-yaesu-imrs-network-a-first-of-its-kind-carrier-grade-build-for-australia/) - KernWi-Fi Pty Ltd
