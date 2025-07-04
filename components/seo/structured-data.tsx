interface StructuredDataProps {
  type: "Organization" | "Person" | "WebSite" | "BreadcrumbList";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}

// Predefined structured data for common use cases
export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: "Informatika 24 - Universitas Linggabuana PGRI Sukabumi",
        description: "Komunitas mahasiswa Informatika angkatan 2024 Universitas Linggabuana PGRI Sukabumi",
        url: "https://if24-unlip.vercel.app",
        logo: "https://if24-unlip.vercel.app/logo.png",
        sameAs: ["https://instagram.com/informatika24", "https://github.com/informatika24", "https://youtube.com/@informatika24"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "General Inquiry",
          email: "informatika24@example.com",
        },
      }}
    />
  );
}

export function WebSiteStructuredData() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: "LinkHub - Informatika 24",
        description: "Platform digital untuk menghubungkan mahasiswa informatika angkatan 2024",
        url: "https://if24-unlip.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://if24-unlip.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}
