import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      {companions.length === 0 ? (
        <h1>
          Welcome To Learnova! Start You Journey To Feel The Explosion of
          Knowledge.
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-4">Popular Companions</h1>
      )}

      <section className="home-section">
        {companions.length === 0 ? (
          <div className="text-center text-gray-500"></div>
        ) : (
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        )}
      </section>

      <section className="home-section">
        {recentSessionsCompanions.length === 0 ? (
          <>
            <CompanionsList
              title="Recently completed sessions"
              companions={[
                {
                  id: "",
                  name: "No sessions yet",
                  topic: "Please create a companion to start learning",
                  subject: "english",
                  duration: 0,
                  color: "#f0f0f0",
                },
              ]}
              classNames="w-2/3 max-lg:w-full"
            />
          </>
        ) : (
          <CompanionsList
            title="Recently completed sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
          />
        )}
        <CTA />
      </section>
    </main>
  );
};

export default Page;
