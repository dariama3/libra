<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions } from '@fullcalendar/core'

const options: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  editable: true,
  selectable: true,
  events: [],
}
</script>

<template>
  <div class="fc-wrapper">
    <FullCalendar :options="options" />
  </div>
</template>

<style>
.fc-wrapper {
  background-color: #f9f9fb;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.fc-wrapper .fc-toolbar-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
}

.fc-wrapper .fc-button {
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
  box-shadow: none !important;
}

.fc-wrapper .fc-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-light) !important;
}

.fc-wrapper .fc-col-header-cell {
  background-color: #f3f4f6;
  padding: 0.5rem 0;
}

.fc-wrapper .fc-col-header-cell-cushion {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  text-decoration: none;
}

.fc-wrapper .fc-daygrid-day {
  background-color: #ffffff;
}

.fc-wrapper .fc-daygrid-day:hover {
  background-color: var(--color-brand-subtle);
}

.fc-wrapper .fc-daygrid-day-number {
  font-size: 0.875rem;
  color: #4b5563;
  text-decoration: none;
  padding: 0.25rem;
}

.fc-wrapper .fc-day-today .fc-daygrid-day-number {
  color: var(--color-brand);
  font-weight: 600;
}

.fc-wrapper .fc-timegrid-slot-label-cushion {
  font-size: 0.75rem;
  color: #9ca3af;
}

.fc-wrapper .fc-scrollgrid {
  border-color: #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}

.fc-wrapper .fc-daygrid-more-link {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-brand);
}
</style>
