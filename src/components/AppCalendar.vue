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
  <div class="bg-gray-100 rounded-2xl p-5 border border-gray-200 shadow-sm">
    <FullCalendar :options="options" />
  </div>
</template>
