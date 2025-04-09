<template>
    <section class="video-listing py-5">
      <div class="container">
        <!-- Filter Controls -->
  
        <div class="listing-controls mb-5">
          <div class="row g-3 align-items-end">
            <div class="col-md-6">
              <div class="search-box">
                <label for="videoSearch" class="form-label">Search Videos</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-search"></i>
                  </span>
                  <input v-model="searchQuery" type="text" class="form-control" id="videoSearch"
                    placeholder="Search by title, description, etc." @input="handleSearch">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="filter-controls">
                <label for="categoryFilter" class="form-label">Filter by Category</label>
                <select v-model="selectedCategory" class="form-select" id="categoryFilter" @change="filterVideos">
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-if="loading" class="loading-state text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading videos...</p>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="filteredVideos.length === 0" class="empty-state text-center py-5">
          <i class="bi bi-film text-muted" style="font-size: 3rem;"></i>
          <h4 class="mt-3">No videos found</h4>
          <p class="text-muted">Try adjusting your search or filter criteria</p>
          <button class="btn btn-outline-primary mt-3" @click="resetFilters">
            Reset Filters
          </button>
        </div>
  
        <!-- Video Grid -->
        <div v-else class="videos-grid">
          <div v-for="video in paginatedVideos" :key="video.id" class="video-card">
            <div class="card h-100">
              <div class="card-img-container">
                <img :src="video.thumbnail" class="card-img-top" :alt="video.title" @error="setDefaultThumbnail">
                <div class="card-img-overlay">
                  <span class="badge bg-primary">{{ video.resolution || 'HD' }}</span>
                  <span class="badge bg-dark ms-2">{{ video.duration || 'N/A' }}</span>
                </div>
                <div class="hover-actions">
                  <router-link :to="`/videos/${video.id}`" class="btn btn-primary btn-sm">
                  <i class="bi bi-play-fill"></i> Play
                  </router-link>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ video.title }}</h5>
                <p class="card-text text-muted small">
                  {{ truncateDescription(video.description) }}
                </p>
                <div class="video-meta">
                  <span class="text-muted small">
                    <i class="bi bi-person-fill"></i> {{ video.user?.name || 'Unknown' }}
                  </span>
                  <span class="text-muted small ms-2">
                    <i class="bi bi-tag-fill" :style="{ color: video.category.color }"></i> {{ video.category.name }}
                  </span>
                </div>
              </div>
              <div class="card-footer bg-transparent">
                <small class="text-muted">{{ formatDate(video.created_at) }}</small>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Pagination -->
        <nav v-if="filteredVideos.length > 0" class="mt-5">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage">
                <i class="bi bi-chevron-left"></i>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="goToPage(page)">
                {{ page }}
              </button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage">
                <i class="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { debounce } from 'lodash-es';
  
  // Data
  const videos = ref([]);
  const loading = ref(true);
  const searchQuery = ref('');
  const selectedCategory = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 9;
  
  // Fetch videos from API
  const fetchVideos = async () => {
    try {
      loading.value = true;
      const response = await fetch('https://video-app.cortia.com.ng/api/v1/videos');
      const data = await response.json();
      videos.value = data.data.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Get unique categories from videos
  const categories = computed(() => {
    const categoryMap = new Map();
    videos.value.forEach(video => {
      if (!categoryMap.has(video.category.id)) {
        categoryMap.set(video.category.id, video.category);
      }
    });
    return Array.from(categoryMap.values());
  });
  
  // Filter videos based on search and category
  const filteredVideos = computed(() => {
    let results = videos.value;
  
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      results = results.filter(video =>
        video.title.toLowerCase().includes(query) ||
        (video.description && video.description.toLowerCase().includes(query)) ||
        (video.tags && video.tags.toLowerCase().includes(query))
      );
    }
  
    // Category filter
    if (selectedCategory.value) {
      results = results.filter(video => video.category.id == selectedCategory.value);
    }
  
    return results;
  });
  
  // Pagination
  const paginatedVideos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredVideos.value.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredVideos.value.length / itemsPerPage);
  });
  
  // Pagination controls
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  
  const goToPage = (page) => {
    currentPage.value = page;
  };
  
  // Search with debounce
  const handleSearch = debounce(() => {
    currentPage.value = 1; // Reset to first page when searching
  }, 500);
  
  // Filter videos
  const filterVideos = () => {
    currentPage.value = 1;
  };
  
  // Reset all filters
  const resetFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = '';
    currentPage.value = 1;
  };
  
  // Fallback for broken thumbnails
  const setDefaultThumbnail = (event) => {
    event.target.src = 'https://via.placeholder.com/300x450?text=No+Thumbnail';
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Truncate long descriptions
  const truncateDescription = (description) => {
    if (!description) return 'No description available';
    return description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;
  };
  
  // Initialize component
  onMounted(() => {
    fetchVideos();
  });
  </script>
  
  <style scoped>
  .video-listing {
    background-color: #f8f9fa;
    min-height: 70vh;
  }
  
  .listing-controls {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .video-card {
    transition: all 0.3s ease;
  }
  
  .card {
    border: none;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .card-img-container {
    position: relative;
    overflow: hidden;
  }
  
  .card-img-top {
    height: 200px;
    width: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .card:hover .card-img-top {
    transform: scale(1.05);
  }
  
  .card-img-overlay {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.5rem;
  }
  
  .hover-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  .card:hover .hover-actions {
    opacity: 1;
    transform: translateY(0);
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }
  
  .empty-state {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .card-text {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .video-meta {
    margin-top: 0.75rem;
    font-size: 0.75rem;
  }
  
  .page-item.active .page-link {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }
  
  .page-link {
    color: #0d6efd;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .videos-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 576px) {
    .videos-grid {
      grid-template-columns: 1fr;
    }
  
    .listing-controls .row {
      flex-direction: column;
    }
  }
  </style>