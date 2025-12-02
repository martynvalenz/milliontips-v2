import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertBanner = ({
	title,
	description,
	variant = "default",
}: {
	title: string;
	description?: string;
	variant?: "default" | "destructive" | "info" | "warning" | "success";
}) => {
	return (
		<Alert variant={variant}>
			<CircleAlert />
			<AlertTitle>{title}</AlertTitle>
			{description && <AlertDescription>{description}</AlertDescription>}
		</Alert>
	);
};

export default AlertBanner;
