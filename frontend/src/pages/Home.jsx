import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import CategoryCard from "../components/CategoryCard";
import PostCard from "../components/PostCard";

import posts from "../data/posts";
import categories from "../data/categories";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <SectionTitle
          title="Popular Categories"
          subtitle="Explore blogs from different topics."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
            />
          ))}

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <SectionTitle
          title="Latest Articles"
          subtitle="Fresh content from our writers."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}

        </div>

      </section>
    </>
  );
}