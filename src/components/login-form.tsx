import { Loader2 } from "lucide-react";
import { greet } from "my-package-template";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState<string | null>(null);

	greet({
		message: "Hello from the login form component!",
	});

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error } = await authClient.signIn.magicLink({
			email,
			callbackURL: "/",
		});

		setIsLoading(false);

		if (error) {
			setError(error.message ?? "Something went wrong");
		} else {
			setSent(true);
		}
	}

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-6 h-full absolute inset-0",
				className,
			)}
			{...props}
		>
			<Card className="overflow-hidden  w-full max-w-5xl p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form
						onSubmit={handleSubmit}
						className="p-6 md:p-8 max-w-md mx-auto w-full"
					>
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Welcome back</h1>
								<p className="text-muted-foreground text-balance">
									Login to your account
								</p>
							</div>
							{sent ? (
								<div className="text-center py-4">
									<p className="text-muted-foreground">
										Check your email for a magic link to sign in.
									</p>
								</div>
							) : (
								<>
									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											disabled={isLoading}
										/>
									</Field>
									{error && (
										<p className="text-sm text-destructive text-center">
											{error}
										</p>
									)}
									<Field>
										<Button type="submit" disabled={isLoading}>
											{isLoading && (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											)}
											Send me a ✨magic✨ link
										</Button>
									</Field>
								</>
							)}
							<FieldSeparator />
							<FieldDescription className="text-center">
								We will send you a magic link to your email address for
								password-free login.
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className="bg-muted relative hidden md:block">
						<img
							src="/placeholder.svg"
							alt="starter logo"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="/">Terms of Service</a>{" "}
				and <a href="/">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
