import qs from "qs";
import Image from "next/image";
import Link from "next/link";

async function getTeamMembers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
      blocks: {
        on: {
          "blocks.testimonial": {
            populate: {
              photo: {
                fields: ["alternativeText", "name", "url"],
              },
            },
          },
          "blocks.spoiler": {
            populate: true,
          },
          "blocks.rich-text": {
            populate: true,
          },
        },
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;
}

interface TeamMemberProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  photo: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  };
}

function TeamMemberCard({
  name,
  description,
  photo,
  slug,
}: Readonly<TeamMemberProps>) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${photo.url}`;
  return (
    <Link
      href={`/our-team/${slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt={photo.alternativeText || name}
        width={300}
        height={300}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600">{}</p>
      </div>
    </Link>
  );
}

export default async function OurTeam() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="container mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
      <h1 className="text-3xl font-bold mb-4">Our Team</h1>
      <p className="mb-8 mt-0">Everyone providing their time and efforts for our team.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.data.map((member: TeamMemberProps) => (
          <TeamMemberCard key={member.documentId} {...member} />
        ))}
      </div>
    </main>
  );
}