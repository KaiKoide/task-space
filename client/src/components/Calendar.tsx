import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { useTaskStore } from "@/store/useStore";

function Calendar() {
	const { tasks } = useTaskStore();

	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			events={tasks.map((task) => ({
				title: task.title,
				date: task.dueDate,
			}))}
			headerToolbar={{
				left: "prev,next today",
				center: "title",
				right: "dayGridMonth,dayGridWeek",
			}}
			eventClassNames="bg-blue-500 text-white text-sm rounded-md p-1"
			dayCellClassNames="border border-gray-200 hover:bg-gray-100"
			views={{
				dayGridMonth: {
					dayHeaderClassNames: "text-gray-700 font-bold",
				},
			}}
		/>
	);
}

export default Calendar;
