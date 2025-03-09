'use client';
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
export default function Nav() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
return (
<nav className="sticky top-0 bg-background/80 backdrop-blur-sm z-50 border-b">
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between h-16">
    <Link href="/" className="flex items-center gap-2">
      <GraduationCap className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">Campus Companion</span>
    </Link>
    
    <div className="flex gap-4">
      <Link href="/buddy-match">
        <Button variant="ghost">Find Buddies</Button>
      </Link>
      <Link href="/resources">
        <Button variant="ghost">Resources</Button>
      </Link>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <Button variant="ghost">{user.email}</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  </div>
  
</div>
</nav>
);
};