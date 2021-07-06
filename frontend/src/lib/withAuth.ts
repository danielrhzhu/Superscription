import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
export const withAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(`/`);
    }
  }, [loading, data, router]);
};
