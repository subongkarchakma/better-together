
import { LoaderCircle, Sprout } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#C2F10D]">
                <Sprout className="size-9 text-black" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
                Better Together
            </h2>

            <LoaderCircle className="size-9 animate-spin text-[#A5CF00]" />

            <p className="text-sm text-muted-foreground">
                Growing something better...
            </p>
        </div>
    );
}
