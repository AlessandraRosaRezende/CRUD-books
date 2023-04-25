export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    invalidData: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
    successful: 200,
  };

  return statusHTTPMap[status] ?? 500;
}
