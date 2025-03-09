// handle eventaggregator component
import EventAggregator from "@/app/components/EventAggregator";

export default function CalendarPage() {
    return (
        <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">University of Dundee Events Calendar</h1>
        </div>
        <EventAggregator />
        </div>
    );
    }