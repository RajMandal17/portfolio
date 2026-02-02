export const resumeData = {
  summary: "Backend Engineer with 2+ years of experience delivering high-performance, low-latency financial and trading systems. Builds scalable architectures, high-throughput matching engines, and real-time data pipelines that balance extreme consistency with sub-millisecond reliability. Specialized in Java (High Concurrency), Spring Boot, Kafka, and Performance Tuning. Focused on engineering excellence through robust LLD, design patterns, and automated testing to ship business value with confidence.",

  experience: [
    {
      title: "Java Backend Developer (Exchange Engineering)",
      company: "Osiz Technologies Pvt Ltd, Madurai",
      period: "Jan 2024 - Present",
      responsibilities: [
        "Engineered a high-performance Matching Engine and Low-Latency OMS using Java 17, optimizing for throughput and consistency in a high-frequency trading environment.",
        "Built real-time market data feed handlers and propagation pipelines using WebSockets and Redis Pub/Sub, supporting 10K+ concurrent connections with minimal jitter.",
        "Designed ACID-compliant transactional workflows for wallet ledgers and fund transfers, ensuring 100% data integrity under heavy concurrent trade requests.",
        "Optimized system throughput by 40% and reduced API latency by implementing distributed Redis caching, SQL query tuning, and connection pooling.",
        "Spearheaded the integration of FIX Connectivity and ultra-low latency request handling layers, expanding platform liquidity reach to institutional clients.",
        "Developed secure Smart Order Routing (SOR) logic that optimized trade execution across multiple liquidity pools, improving retail execution prices by 2% on average.",
        "Improved production debugging efficiency by 50% through the implementation of distributed tracing (correlation IDs), structured logging, and observability dashboards.",
        "Achieved 80%+ automated test coverage using JUnit 5 and Mockito, ensuring zero regressions in critical financial transaction paths.",
        "Monitored and tuned JVM performance, GC logs, and memory allocation patterns, significantly reducing latency spikes during peak trading volumes.",
        "Applied SOLID principles and Strategy/Factory patterns to build an extensible multi-exchange connectivity framework."
      ],
      technologies: ["Java 17/21", "Spring Boot 3", "Low-Latency OMS", "Match Engine", "FIX Connectivity", "Kafka", "Redis", "WebSockets", "Distributed Tracing", "SOR", "Performance Tuning"]
    },
    {
      title: "Java Developer",
      company: "Selica Technology, Bengaluru",
      period: "May 2022 - Jan 2024",
      responsibilities: [
        "Led greenfield development of a comprehensive Hospital Management System (HMS) using Spring Boot microservices, automating workflows for 50+ clinics.",
        "Built a robust Pharmacy inventory module with real-time batch/expiry alerts, reducing inventory wastage and stock-outs by 30%.",
        "Designed a digital prescription and treatment tracking platform supporting PDF exports and secure medical history audit trails.",
        "Enforced role-based access control (RBAC) and secure data handling, ensuring 100% compliance with patient data privacy standards.",
        "Automated deployment pipelines using Docker Compose, reducing production release cycles by 40%."
      ],
      technologies: ["Spring Boot", "React", "MySQL", "Docker", "Spring Security", "PDF Export", "Microservices"]
    }
  ],

  education: [
    {
      degree: "B.E. in Automobile Engineering",
      field: "Automobile Engineering",
      institution: "D. Y. Patil School of Engineering Academy, Pune",
      period: "2018 - 2022",
      gpa: "8.16/10"
    },
    {
      degree: "Diploma in Automobile Engineering",
      field: "Automobile Engineering",
      institution: "G. H. Raisoni Polytechnic College, Nagpur",
      period: "2014 - 2017",
      gpa: null
    }
  ],

  certifications: [
    "Java SE 8 & Java Language Features – Infosys Springboard",
    "Spring & Hibernate Professional Certification",
    "Patent Holder: Social Distancing Device",
    "Agile/Scrum Development Methodology"
  ]
};
