import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import { DataTable } from "~/components/data-table";
import { SectionCards } from "~/components/section-cards";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { authMiddleware } from "~/middleware/auth";
import data from "../app/dashboard/data.json";

export const Route = createFileRoute("/")({
	server: {
		middleware: [authMiddleware],
	},
	component: App,
});

export default function App() {
	const {
		data: personData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["person"],
		queryFn: async () => {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/users/1",
			);
			if (!response.ok) throw new Error("Failed to fetch person");
			return response.json();
		},
	});

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							{/* TanStack Query Example - Fetch Person API */}
							<div className="px-4 lg:px-6">
								<div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
									<h2 className="mb-3 text-lg font-semibold">
										Person Data (TanStack Query Example)
									</h2>
									{isLoading && (
										<p className="text-sm text-gray-500">Loading...</p>
									)}
									{error && (
										<p className="text-sm text-red-500">
											Error: {error.message}
										</p>
									)}
									{personData && (
										<pre className="max-h-64 overflow-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-800">
											{JSON.stringify(personData, null, 2)}
										</pre>
									)}
								</div>
							</div>
							<SectionCards />
							<div className="px-4 lg:px-6">
								<ChartAreaInteractive />
							</div>
							<DataTable data={data} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
