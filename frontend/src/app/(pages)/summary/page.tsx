"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MeetingSummary = () => {
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800">
            Meeting Summary for Research Update
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Mar 12, 2023 · 09:13 AM Pacific Time (US and Canada) · ID: 142 534
            5235
          </p>
        </div>

        {/* Quick Recap */}
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Quick recap
          </h2>
          <p className="text-gray-700">
            Julie, from the marketing team, met with company executives Rob and
            Max to discuss the current marketing strategy's success, proposed
            new initiatives, data analytics implementation, competitive analysis
            plans, and budget allocation, with the executives expressing support
            and satisfaction with the overall budget.
          </p>
        </div>

        {/* Next Steps */}
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Next steps
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Develop a detailed proposal for the new data analytics platform.
            </li>
            <li>
              Conduct a competitive analysis and share the results with Rob and
              Max.
            </li>
            <li>
              Allocate resources for the new marketing initiatives and establish
              KPIs to measure their success.
            </li>
          </ul>
        </div>

        {/* Summary */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Summary</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-medium text-gray-800">Marketing strategy</h3>
              <p>
                Julie from the marketing team met with Rob and Max, the
                executives of the company, to discuss the current state of the
                business and future plans. The meeting began with an overview of
                the current marketing strategy and its effectiveness. Julie
                presented data showing that the current strategy has been
                successful in increasing brand awareness and driving sales.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                State of the business
              </h3>
              <p>
                The discussion then turned to future plans and Julie presented
                several new initiatives, including a social media campaign aimed
                at millennials and a targeted email marketing campaign for
                existing customers. Rob and Max were impressed with the ideas
                and asked for more details on the timeline and budget for each
                initiative.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Data and analytics</h3>
              <p>
                Julie also discussed the importance of data and analytics in
                guiding their strategy. She presented a plan to implement a new
                data analytics platform that would allow them to better
                understand their customers and target them with more
                personalized messaging. Rob and Max expressed support for the
                idea and asked for a more detailed proposal.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                Competitive landscape
              </h3>
              <p>
                The discussion then included a discussion of the competitive
                landscape and how the company can stay ahead of its competitors.
                Julie proposed conducting a competitive analysis and presented a
                plan for how this analysis would be conducted. Rob and Max were
                supportive of the idea and asked for regular updates on the
                progress of the analysis.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Marketing budget</h3>
              <p>
                Finally, the meeting concluded with a discussion of the budget
                for marketing initiatives. Julie presented a detailed budget and
                Rob and Max asked several questions about the allocation of
                funds. Julie was able to provide clear explanations for each
                line item and Rob and Max were satisfied with the overall
                budget.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-300 space-x-4">
          <button
            onClick={() => router.push("/home")}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            Back to Home
          </button>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              Share
            </button>
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg">
              Download
            </button>
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
