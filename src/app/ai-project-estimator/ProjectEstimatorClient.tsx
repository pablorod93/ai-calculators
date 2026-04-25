"use client";

import { useState, useMemo, useCallback } from "react";
import { projectTemplates, type ProjectTemplate } from "@/data/projects";
import ProjectSelector from "@/components/ProjectSelector";
import ProjectConfigurator from "@/components/ProjectConfigurator";
import ProjectCostResults from "@/components/ProjectCostResults";
import AdBanner from "@/components/AdBanner";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function ProjectEstimatorClient() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<ProjectTemplate | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, number>>({});

  const handleSelectTemplate = useCallback((template: ProjectTemplate) => {
    setSelectedTemplate(template);
    // Initialize with default values
    const defaults: Record<string, number> = {};
    template.params.forEach((p) => {
      defaults[p.id] = p.defaultValue;
    });
    setParamValues(defaults);
  }, []);

  const handleParamChange = useCallback((paramId: string, value: number) => {
    setParamValues((prev) => ({ ...prev, [paramId]: value }));
  }, []);

  const estimation = useMemo(() => {
    if (!selectedTemplate) return null;
    return selectedTemplate.estimate(paramValues);
  }, [selectedTemplate, paramValues]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Project Cost Estimator
        </h1>
        <p className="text-gray-600">
          Describe your project and we&apos;ll estimate how much it will cost to
          run with different AI models. No token math needed.
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Pick project type */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <ProjectSelector
            templates={projectTemplates}
            selectedId={selectedTemplate?.id ?? null}
            onSelect={handleSelectTemplate}
          />
        </div>

        <AdBanner />

        {/* Step 2: Configure */}
        {selectedTemplate && (
          <ProjectConfigurator
            template={selectedTemplate}
            values={paramValues}
            onChange={handleParamChange}
          />
        )}

        {/* Step 3: Results */}
        {estimation && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <ProjectCostResults
              inputTokensPerRequest={estimation.inputTokensPerRequest}
              outputTokensPerRequest={estimation.outputTokensPerRequest}
              requestsPerDay={estimation.requestsPerDay}
              explanation={estimation.explanation}
            />
          </div>
        )}

        <AdBanner />
        <RelatedCalculators items={[
          { title: "AI Token Cost Calculator", href: "/ai-cost-calculator", description: "Dig into per-token costs across 30+ models." },
          { title: "GPU Cost Calculator", href: "/gpu-cost-calculator", description: "Compare cloud GPU costs if you're self-hosting." },
          { title: "AI Fine-Tuning Cost Calculator", href: "/ai-fine-tuning-calculator", description: "Estimate fine-tuning costs for a custom model." },
        ]} />
      </div>
    </div>
  );
}
