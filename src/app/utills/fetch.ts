import { cookies } from 'next/headers';
import qs from 'qs';
 
interface FetchResponse<T> {
    data: T | null;
    status?: number;
    error?: {};
}

export const fetchApi = async <T>(
  path: string,
  options: RequestInit & {} = { method: "GET" },
  populate?: any,
  filters?: any
): Promise<FetchResponse<T>> => {
  let headers = {}
  const cookie = await cookies();
  const accessToken = cookie.get('access_token')?.value || ""
  if(accessToken != "") {
    headers = { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
    };
  } else {
    headers = { "Content-Type": "application/json" };
  }

  let url: any;

  let queryParams: any = {};
  if (populate) queryParams.populate = populate;
  if (filters) queryParams.filters = filters; 

  const newUrl = new URL(path, process.env.API_URL);
  newUrl.search = qs.stringify(queryParams, { encodeValuesOnly: true });

  url = newUrl.toString(); // Convert URL object to string

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) console.log(response);

    const result = await response.json();
    return { data: result, status: response.status };
  } catch (error: unknown) {
    return { data: null, status: 500, error: "error" };
  }
};