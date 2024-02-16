import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  router.push("/login");
}
