import Image from "next/image";
import Link from "next/link";
import { fetchApi } from "../utills/fetch";

async function getTeamMembers() {
  const res = await fetchApi("/api/team-members", {}, {
    photo: {
      fields: ["alternativeText", "name", "url"],
    },
  });

  return res.data;
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

// Card component to display each team member
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
      </div>
    </Link>
  );
}

export default async function OurTeam() {
  // Fetch the team members data
  const teamMembers: any = await getTeamMembers();

  // Handle loading state or empty data
  if (!teamMembers || !teamMembers.data || teamMembers.data.length === 0) {
    return (
      <main className="container mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
        <h1 className="text-3xl font-bold mb-4">Our Team</h1>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Everyone providing their time and efforts for our team.</p>
        <p>No team members found.</p>
      </main>
    );
  }

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
