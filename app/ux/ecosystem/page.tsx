import UXPageLayout from "../components/UXPageLayout";
import type { EcosystemItem } from "./types";
import ecosystemItems from "./ecosystemData.json";

export default function EcosystemPage() {
  return (
    <UXPageLayout
      title="Ekosystem"
      intro="Tabellen nedan är baserad på begrepp som vi bör känna till."
    >
      <article className="space-y-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  Begrepp / koncept
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  Förklaring
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Resurs</th>
              </tr>
            </thead>
            <tbody>
              {(ecosystemItems as EcosystemItem[]).map((item, index) => (
                <tr key={item.concept} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-3 py-2 font-medium">{item.concept}</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">
                    {item.description}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {item.resource ? (
                      <a
                        href={item.resource.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline-offset-2 hover:underline"
                      >
                        {item.resource.label}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Reflektion</h2>
          <p className="text-gray-700">Kommer snart.</p>
        </section>
      </article>
    </UXPageLayout>
  );
}