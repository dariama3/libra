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
/* Wrapper */
.fc-wrapper {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

/* Toolbar title */
.fc-wrapper .fc-toolbar-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Buttons */
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

/* Column headers */
.fc-wrapper .fc-col-header-cell {
  background-color: var(--bg-base);
  padding: 0.5rem 0;
}

.fc-wrapper .fc-col-header-cell-cushion {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
}

/* Day cells */
.fc-wrapper .fc-daygrid-day {
  background-color: var(--bg-surface);
}

.fc-wrapper .fc-daygrid-day:hover {
  background-color: var(--color-cell-hover);
}

.fc-wrapper .fc-daygrid-day-number {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.25rem;
}

.fc-wrapper .fc-day-today .fc-daygrid-day-number {
  color: var(--color-brand);
  font-weight: 600;
}

/* Time grid */
.fc-wrapper .fc-timegrid-slot-label-cushion {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Grid borders */
.fc-wrapper .fc-scrollgrid {
  border-color: var(--border-color);
  border-radius: 0.75rem;
  overflow: hidden;
}

.fc-wrapper td,
.fc-wrapper th {
  border-color: var(--border-color) !important;
}

/* More link */
.fc-wrapper .fc-daygrid-more-link {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-brand);
}
</style>
