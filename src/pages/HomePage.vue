<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section text-white">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Stream Unlimited Movies & Shows</h1>
          <p class="hero-subtitle">Watch anywhere. Cancel anytime.</p>
          <div class="hero-actions">
            <router-link to="/videos" class="btn btn-primary btn-lg">
              <i class="bi bi-play-fill me-2"></i>Explore Now
            </router-link>
            
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Videos Carousel -->
    <!-- Categories Section -->
    <section class="categories-section py-5 bg-light">
      <div class="container">
        <h2 class="section-title mb-4">
          <i class="bi bi-collection text-primary me-2"></i>
          Featured Videos Browse Categories 
        </h2>
        <VideoListing />
      </div>
    </section>

    <!-- Recent Videos Section -->
  
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VideoListing from '../components/VideoListing.vue';
</script>

<style scoped>
.home-page {
  background-color: #f8f9fa;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(149, 164, 248, 0.7));
  min-height: 70vh;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Featured Videos */
.featured-section {
  background-color: #fff;
}

.section-title {
  font-weight: 700;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: var(--bs-primary);
}

.featured-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.featured-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-5px);
}

.featured-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.featured-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
}

/* Categories Section */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.category-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-icon {
  font-size: 2rem;
  color: var(--bs-primary);
  margin-bottom: 0.5rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .featured-carousel {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>