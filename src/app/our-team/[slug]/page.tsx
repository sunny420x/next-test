import Image from 'next/image';

import { BlockRenderer, TeamPageBlock } from "@/app/Components/blocks";
import { fetchApi } from "@/app/utills/fetch";

interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function getTeamMember(slug: string) {
    const res = await fetchApi<ApiResponse<UserProfile>>("/api/team-members", {}, {
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
      }
    }
  }, 
  { slug: { $eq: slug } });

  if (!res?.data?.data) {
    throw new Error("Invalid API response structure");
  }

  return res.data.data.length > 0 ? res.data.data[0] : null;
}
interface UserProfile {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  photo: {
    id: number;
    alternativeText: string;
    name: string;
    url: string;
  };
  blocks: TeamPageBlock[];
}

export default async function TeamMemberDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) return <p>No member found</p>;

  const teamMember = (await getTeamMember(slug)) as UserProfile;
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${teamMember.photo.url}`;

  return (
    <main className="container mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
        <div className="px-4 sm:px-0">
            <h3 className="text-3xl font-semibold text-gray-900">Team Member Information</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-100">
            <div className="grid grid-cols-4 gap-4">
                <Image
                src={imageUrl}
                alt={teamMember.name}
                width={300}
                height={300}
                className="mt-4 rounded"
                />
                <dl className="divide-y divide-gray-100 p-4">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">ชื่อ</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{teamMember.name}</dd>
                        <dt className="text-sm/6 font-medium text-gray-900">คำอธิบาย</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{teamMember.description}</dd>
                    </div>
                    <hr/>
                </dl>
            </div>
        </div>
        {teamMember.blocks.map((block: TeamPageBlock) => (
            <BlockRenderer key={block.id} block={block} />
        ))}
    </main>
  );
}