document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Functionality ---
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });

  // --- Example Toggle Functionality ---
  const exampleToggles = document.querySelectorAll('.example-toggle');
  exampleToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const exampleCode = toggle.nextElementSibling;
      
      const isVisible = exampleCode.style.display === 'block';
      exampleCode.style.display = isVisible ? 'none' : 'block';
      
      if (!isVisible) {
          exampleCode.classList.add('show');
      } else {
          exampleCode.classList.remove('show');
      }
    });
  });

  // --- Sidebar Navigation Scroll Spy ---
  const sections = document.querySelectorAll('.category-section');
  const navLinks = document.querySelectorAll('.nav-links li a');

  const observerOptions = {
    root: null, // observes intersections in the viewport
    rootMargin: '0px',
    threshold: 0.4 // 40% of the section must be visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Get the ID of the intersecting section
        const id = entry.target.getAttribute('id');
        
        // Find the corresponding nav link and add active class
        const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // --- Smooth Scrolling for Nav Links ---
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if(targetSection) {
              targetSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
});
