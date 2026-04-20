 // Select elements
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Store gallery images in an array for navigation
  let images = Array.from(gallery.querySelectorAll('img'));
  let currentIndex = 0;

  // Show lightbox with clicked image
  function showLightbox(index) {
    currentIndex = index;
    lightboxImage.src = images[currentIndex].src.replace(/300\/200/, '900/600'); // bigger image
    lightbox.classList.add('active');
  }

  // Hide lightbox
  function hideLightbox() {
    lightbox.classList.remove('active');
  }

  // Show next image
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex].src.replace(/300\/200/, '900/600');
  }

  // Show previous image
  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex].src.replace(/300\/200/, '900/600');
  }

  // Add click event to gallery images
  images.forEach((img, index) => {
    img.addEventListener('click', () => showLightbox(index));
  });

  // Lightbox navigation event listeners
  closeBtn.addEventListener('click', hideLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Hide lightbox on outside click
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) hideLightbox();
  });

  // Filter gallery based on category
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to clicked button
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      images.forEach(img => {
        if (category === 'all' || img.getAttribute('data-category') === category) {
          img.style.display = '';
        } else {
          img.style.display = 'none';
        }
      });

      // Update images array to visible images for navigation
      images = Array.from(gallery.querySelectorAll('img')).filter(img => img.style.display !== 'none');
    });
  });