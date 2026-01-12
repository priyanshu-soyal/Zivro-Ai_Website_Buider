import { useState } from "react";
import { appPlans } from "../../Assets/dummyProjects";
import "../Custom.css";
import { Check } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
}

export default function Pricing() {
  // Hooks :-
  const [plans] = useState<Plan[]>(appPlans);

  // handle Purchase
  const handlePurchase = async (planId: string) => {
    console.log(planId);
  };
  return (
    <>
      <div className="w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh]">
        <div className="text-center mt-16">
          <h2 className="font-audiowide text-gray-100 text-3xl font-medium">
            Choose Your Plan
          </h2>
          <p className="font-Baumans text-gray-400 text-md max-w-md mx-auto mt-2">
            Start your free and scale up as you grow. find the perfect plan for
            your content creation needs.
          </p>
        </div>
        {/* Pricing card */}
        <div className="pt-14 py-4 px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-4">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className="p-6 bg-black/20 ring ring-[#22D3EE]/10 mx-auto w-full max-w-sm rounded-lg text-white shadow-lg hover:ring-[#22D3EE] transition-all duration-400 flex flex-col"
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="my-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-300">
                    {" "}
                    / {plan.credits} credits
                  </span>
                </div>

                <p className="text-gray-300 mb-6">{plan.description}</p>

                <ul className="space-y-1.5 mb-6 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-[#22D3EE] mr-2" />

                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(plan.id)}
                  className="mt-auto w-full py-2 px-4 bg-[#22D3EE] hover:bg-[#22D3EE] active:scale-95 text-sm rounded-md transition-all"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
