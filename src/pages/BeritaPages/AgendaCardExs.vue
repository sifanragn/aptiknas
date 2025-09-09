<template>
  <div class="grid md:grid-cols-[150px_1fr] gap-6 items-start text-center md:text-left md:gap-8 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <!-- Image and Date Badge -->
    <div class="relative w-full mx-auto md:mx-0 max-w-[150px]">
      <img 
        :src="item.image" 
        :alt="item.title" 
        class="rounded-2xl w-40 h-40 object-cover"
      >
      <!-- Date Badge -->
      <div class="absolute -top-2 -right-2 bg-green-600 text-white px-3 py-2 rounded-xl shadow-lg">
        <div class="font-medium text-xs uppercase tracking-wide">{{ formattedDate.day }}</div>
        <div class="text-xl font-bold leading-none">{{ formattedDate.date }}</div>
        <div class="font-medium text-xs mt-0.5">
          {{ formattedDate.monthYear }}
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col items-center md:items-start">
      <!-- Status Badge -->
      <span class="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-800 font-medium mb-3">
        {{ item.category }}
      </span>
      
      <h3 class="text-xl font-semibold text-gray-900 mb-2 leading-tight">{{ item.title }}</h3>
      
     <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full mb-3">
  <!-- Location -->
  <div class="flex items-center text-sm text-gray-600">
    <svg class="w-4 h-4 mr-1.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
    <span class="truncate">{{ item.location }}</span>
  </div>

  <!-- Time -->
  <div class="flex items-center text-sm text-gray-600">
    <svg class="w-4 h-4 mr-1.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span class="truncate">{{ item.time }}</span>
  </div>
</div>

      <p class="text-sm text-gray-600 mb-4 leading-relaxed" v-html="item.description"></p>

      <button
        class="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium text-sm flex items-center gap-2 group"
        @click="$emit('card-click', item)"
      >
        Lihat Detail
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      image: '',
      date: '',
      title: '',
      category: '',
      location: '',
      time: '',
      description: '',
      status: 'upcoming'
    })
  }
});

const emit = defineEmits(['card-click']);

const formattedDate = computed(() => {
  if (!props.item.date) {
    return { day: 'Sen', date: '15', monthYear: 'Sep 2024' };
  }

  try {
    const [day, datePart] = props.item.date.split(',');
    const [date, month, year] = datePart.trim().split(' ');
    
    return {
      day: day.trim().substring(0, 3),
      date,
      monthYear: `${month} ${year}`
    };
  } catch (error) {
    console.error('Error formatting date:', error);
    return { day: 'Sen', date: '15', monthYear: 'Sep 2024' };
  }
});
</script>

<style scoped>
/* Custom styling untuk efek hover */
.hover\:shadow-lg {
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.hover\:shadow-lg:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Smooth transitions */
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease;
}

.transition-transform {
  transition: transform 0.2s ease;
}
</style>