document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load recent publications
    const recentPublicationsList = document.getElementById("recent-publications");
    if (recentPublicationsList) {
        fetch("components/publications.html")
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const publications = doc.querySelectorAll("main ul li");
                const recentPublications = Array.from(publications).slice(0, 3); // Limit to 3 publications
                recentPublications.forEach(publication => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = publication.innerHTML;
                    recentPublicationsList.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error loading publications:", error));
    }
    
    // Dynamically load recent awards
    const recentAwardsList = document.getElementById("recent-awards");
    if (recentAwardsList) {
        fetch("components/awards.html")
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const awards = doc.querySelectorAll(".awards-list li");
                const recentAwards = Array.from(awards).slice(0, 5); // Limit to 5 awards
                recentAwards.forEach(award => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = award.innerHTML;
                    recentAwardsList.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error loading awards:", error));
    }

    // Highlight the active navigation link based on scroll position
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main .main-content section");

    const updateActiveLink = () => {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust offset for sticky nav bar
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLink);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return; // Skip if href is just "#"
            
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return; // Skip if element doesn't exist
            
            // Scroll to the element
            window.scrollTo({
                top: targetElement.offsetTop - 60, // Offset to account for sticky header
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
            
            // Update active class
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});