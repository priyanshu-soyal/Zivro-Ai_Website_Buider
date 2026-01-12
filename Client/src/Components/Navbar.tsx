import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Custom.css";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/Config/axios";
import { toast } from "sonner";

export default function Navbar() {
  // states
  const [menuOpen, setMenuOpen] = useState(false);
  const [credits, setCredits] = useState(0);

  // navigate
  const navigate = useNavigate();

  // login credentials
  const { data: session } = authClient.useSession();

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setCredits(data.credits);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch credits";
      toast.error(errorMessage);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);
  return (
    <>
      <nav className="z-50 sticky top-0 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-white border-slate-800">
        <Link to={"/"} className="flex gap-2">
          <Zap size={24} />
          <span className="font-audiowide tracking-wider">Zivro</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/">Home</Link>
          <Link to="/projects">My Projects</Link>
          <Link to="/community">Community</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          {!session?.user ? (
            <button
              onClick={() => navigate("/auth/signin")}
              className="px-6 py-1.5 max-sm:text-sm bg-[#22D3EE] active:scale-95 hover:bg-[#22c1d9] transition-all rounded"
            >
              Get started
            </button>
          ) : (
            <>
              <button className="bg-white/10 px-5 py-1.5 text-xs sm:text-sm border text-gray-200 rounded-full">
                {" "}
                Credits : <span className="text-[#22D3EE]">{credits}</span>{" "}
              </button>
              <UserButton size="icon" />
            </>
          )}
          <button
            id="open-menu"
            aria-label="Open menu"
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <div className="relative">
            <button
              aria-label="Close menu"
              className="absolute bottom-30 left-40 active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </button>
          </div>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>
            My Projects
          </Link>
          <Link to="/community" onClick={() => setMenuOpen(false)}>
            Community
          </Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
        </div>
      )}
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10 size-full bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Layer 2: The Neon Spotlight */}
      <div className="absolute inset-0 -z-10 size-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-[#22D3EE] rounded-full blur-[120px] opacity-20" />
        <div className="absolute top-10 left-1/3 w-100 h-75 bg-[#3B82F6] rounded-full blur-[100px] opacity-10" />
      </div>
    </>
  );
}
