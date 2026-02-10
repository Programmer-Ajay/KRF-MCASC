export default function JsonLd(){
    const eventScehma={
        "@context":"https://schema.org",
        "@type": "Event",
        "name": "Kartikeya Rindani Event (KRE) 2026",
        "startDate": "2025-02-18T09:00",
        "endDate": "2025-02-21T18:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
      "@type": "Place",
      "name": "Modern College of Arts, Science and Commerce (Autonomous) Shivajinagar",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shivajinagar",
        "addressLocality": "Pune",
        "postalCode": "411005",
        "addressRegion": "MH",
        "addressCountry": "IN"
      }
      },

      "image": [
      "https://kremcasc.in/images/logo.jpg"
    ],
    "description": "Annual technical and cultural festival organized by MCASC featuring Coding, Quiz, Debate, and Short Film competitions.",
    "organizer": {
      "@type": "Organization",
      "name": "MSACS (Modern Student Team codeCrafters Association of Computer Science)",
      "url": "https://kremcasc.in",
    },
    }

    return (
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventScehma) }}
        />
    )
    }
