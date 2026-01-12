import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { ProjectPreview } from "../Components/ProjectPreview";
import type { Project, Version } from "../Types";
import { toast } from "sonner";
import api from "@/Config/axios";
import { authClient } from "@/lib/auth-client";

export default function Preview() {
  // Sessions
  const { data: session, isPending } = authClient.useSession();

  // Hooks :-
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const { projectId, versionId } = useParams();

  // Functions :-
  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/preview/${projectId}`);
      setCode(data.project.current_code);
      if (versionId) {
        data.project.versions.forEach((version: Version) => {
          if (version.id === versionId) {
            setCode(version.code);
          }
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchCode();
    }
  }, [session?.user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="size-7 animate-spin text-[#22D3EE]" />
      </div>
    );
  }
  return (
    <div className="h-screen">
      {code && (
        <ProjectPreview
          project={{ current_code: code } as Project}
          isGenerating={false}
          showEditorPannel={false}
        />
      )}
    </div>
  );
}
