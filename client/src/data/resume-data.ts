export const resumeData = {
  summary: "Backend Engineer with 2+ years of experience building high-throughput, low-latency trading and financial systems using Java and Spring Boot. Specialized in designing high-performance order matching engines, Low-Latency OMS, and real-time market data feed handlers. Strong expertise in concurrency optimization, ACID-compliant transactional workflows, and distributed architectures using Kafka and Redis. Proficient in LLD, performance tuning (JVM/GC), and engineering scalable microservices with strict reliability requirements.",

  experience: [
    {
      title: "Java Backend Developer",
      company: "Osiz Technologies Pvt Ltd, Madurai",
      period: "Jan 2024 - Present",
      responsibilities: [
        "Engineered a high-performance order matching engine and Low-Latency OMS using Java 17 and Spring Boot, optimizing for throughput and consistency.",
        "Implemented real-time market data feed handlers and data propagation pipelines using WebSockets, STOMP, and Redis Pub/Sub.",
        "Designed ACID-compliant transactional workflows for wallet ledgers and fund transfers, ensuring 100% data integrity under heavy concurrent load.",
        "Optimized system throughput by 40% through Redis caching, SQL query tuning, and connection pooling optimizations.",
        "Integrated distributed tracing (correlation IDs) and structured logging to improve production debugging and observability.",
        "Applied SOLID principles and Strategy/Factory patterns to build an extensible multi-exchange connectivity framework.",
        "Implemented FIX connectivity and ultra-low latency request handling for trade execution paths.",
        "Developed secure Smart Order Routing (SOR) logic to optimize trade execution across multiple liquidity pools.",
        "Enhanced system reliability with idempotency, retry safety, and request throttling for financial endpoints.",
        "Achieved 80%+ test coverage using JUnit 5 and Mockito, ensuring zero regression in critical trading paths.",
        "Monitored and tuned JVM performance, GC logs, and memory allocation patterns to reduce latency spikes."
      ],
      technologies: ["Java 17/21", "Spring Boot 3", "Low-Latency OMS", "Match Engine", "FIX Connectivity", "Kafka", "Redis", "WebSockets", "Distributed Tracing", "SOR", "JUnit 5"]
    },
    {
      title: "Java Developer",
      company: "Selica Technology, Bengaluru, Karnataka",
      period: "May 2022 - Jan 2024",
      responsibilities: [
        "Led end-to-end development of a comprehensive Hospital Management System (HMS) using Spring Boot microservices and React",
        "Implemented patient registration, appointment booking, digital prescription, and visit history features for OPD workflows",
        "Developed IPD admission, bed allocation/transfer, nursing vitals, treatment tracking, and discharge summary generation with PDF export",
        "Built a robust Pharmacy module for inventory management (batch/expiry/stock), prescription fulfillment, sales billing, and returns/refunds with real-time alerts and audit logging",
        "Enforced role-based access control and audit trails for sensitive operations, ensuring compliance and traceability",
        "Automated deployment with Docker Compose and maintained MySQL databases with advanced queries, indexing, and stored procedures"
      ],
      technologies: ["Spring Boot", "React", "MySQL", "Docker Compose", "Spring Security", "PDF Export"]
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
    "Java SE 8 Features – Infosys Springboard",
    "Java Language Features – Infosys Springboard",
    "Spring & Hibernate for Beginners",
    "Patent Holder: Social Distancing Device"
  ]
};
