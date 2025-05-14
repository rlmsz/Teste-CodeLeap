import PostFeed from "@/components/PostFeed";
import { PostForm } from "@/components/PostForm";
import WelcomeForm from "@/components/WelcomeForm";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { usePostsData } from "@/hooks/api";

export const Index = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

const AppContent = () => {
  const { hasUsername,username } = useUser()
  const { data: posts = [], isLoading, isError } = usePostsData()

  if (!hasUsername) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <WelcomeForm />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-[800px] max-w-screen justify-self-center bg-white">
      <header className="bg-codeleap-blue px-[37px] py-[27px] text-start text-[22px] font-bold leading-[26px] text-white">
        CodeLeap Network
      </header>

      <main className="px-6 py-6">
        <PostForm />
        
        {isLoading && <p>Loading…</p>}
        {isError && <p>Failed to load posts</p>}

        {!isLoading && !isError && <PostFeed posts={posts} username={username} />}
      </main>
    </div>
  )
}