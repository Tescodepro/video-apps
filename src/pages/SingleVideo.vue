<template>
    <div class="single-video-page py-5">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading video...</p>
        </div>
  
        <!-- Video Not Found -->
        <div v-else-if="!video" class="not-found text-center py-5">
          <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
          <h4 class="mt-3">Video Not Found</h4>
          <p class="text-muted">The requested video could not be loaded</p>
          <router-link to="/" class="btn btn-primary mt-3">
            Back to Videos
          </router-link>
        </div>
  
        <!-- Video Player -->
        <div v-else class="video-player-container">
          <div class="row">
            <div class="col-lg-8">
              <div class="video-player card">
                <video 
                  ref="videoPlayer"
                  class="w-100"
                  :poster="video.thumbnail"
                  controls
                >
                  <source :src="video.video_path" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="card-body">
                  <h2 class="card-title">{{ video.title }}</h2>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="video-views">
                      <span class="text-muted">
                        <i class="bi bi-eye-fill"></i> {{ video.views || 0 }} views
                      </span>
                    </div>
                    <div class="video-upload-date">
                      <span class="text-muted">
                        <i class="bi bi-calendar"></i> {{ formatDate(video.created_at) }}
                      </span>
                    </div>
                  </div>
                  <div class="video-description">
                    <p>{{ video.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="video-meta card">
                <div class="card-body">
                  <h5 class="card-title">Details</h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <span>Category</span>
                      <span class="badge" :style="{ backgroundColor: video.category.color }">
                        <i :class="video.category.icon"></i> {{ video.category.name }}
                      </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <span>Duration</span>
                      <span>{{ video.duration }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <span>Resolution</span>
                      <span>{{ video.resolution }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <span>Uploaded by</span>
                      <span>{{ video.user.name }}</span>
                    </li>
                    <li class="list-group-item">
                      <span>Tags</span>
                      <div class="mt-2">
                        <span 
                          v-for="tag in video.tags.split(',')" 
                          :key="tag"
                          class="badge bg-secondary me-1"
                        >
                          {{ tag.trim() }}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const video = ref(null);
  const loading = ref(true);
  const videoPlayer = ref(null);
  
  // Fetch single video
  const fetchVideo = async () => {
    try {
      loading.value = true;
      const response = await fetch(`https://video-app.cortia.com.ng/api/v1/videos/${route.params.id}`);
      const data = await response.json();
      video.value = data.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      video.value = null;
    } finally {
      loading.value = false;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Initialize component
  onMounted(() => {
    fetchVideo();
  });
  </script>
  
  <style scoped>
  .single-video-page {
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }
  
  .not-found {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .video-player {
    border: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
  
  .video-player video {
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: #000;
    aspect-ratio: 16/9;
  }
  
  .video-meta {
    border: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
  
  .video-meta .list-group-item {
    padding: 1rem 0;
    border-color: rgba(0, 0, 0, 0.05);
  }
  
  .video-description {
    white-space: pre-line;
  }
  
  @media (max-width: 992px) {
    .video-player-container .row {
      flex-direction: column-reverse;
    }
    
    .video-player-container .col-lg-4 {
      margin-bottom: 2rem;
    }
  }
  </style>