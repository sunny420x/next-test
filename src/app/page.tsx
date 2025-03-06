import Image from "next/image";
import Link from "next/link";
import { fetchApi } from "./utills/fetch";

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

function TeamMemberCard({
  name,
  description,
  photo,
  slug,
}: Readonly<TeamMemberProps>) {
  const imageUrl = `${process.env.API_URL ?? "http://localhost:1337"
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
        className="size-16 rounded-full mx-auto"
      />
      <div className="px-6 py-3">
        <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{name}</h3>
        <p className="text-sm/6 font-semibold text-indigo-600">{description}</p>
      </div>
    </Link>
  );
}

export default async function Home() {
  const teamMembers: any = await getTeamMembers();

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Sunny420x</h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">Next.js Test Project</p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              <a href="/our-team">Team <span aria-hidden="true">&rarr;</span></a>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-300">Projects</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">0</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-300">Totals earns</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">0 k</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">Meet our leadership</h2>
            <p className="mt-6 text-lg/8 text-gray-600">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            <div className="flex items-center gap-x-6">
              {teamMembers.data.map((member: TeamMemberProps) => (
                <TeamMemberCard key={member.documentId} {...member} />
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
