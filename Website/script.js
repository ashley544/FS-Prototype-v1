// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Like button functionality for feed page
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            
            if (this.classList.contains('liked')) {
                // Unlike
                this.classList.remove('liked');
                icon.classList.remove('fas');
                icon.classList.add('far');
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount - 1;
            } else {
                // Like
                this.classList.add('liked');
                icon.classList.remove('far');
                icon.classList.add('fas');
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount + 1;
            }
        });
    });

    // Post creation functionality
    const postForm = document.querySelector('.post-input textarea');
    const postButton = document.querySelector('.post-input .btn-primary');
    
    if (postForm && postButton) {
        postButton.addEventListener('click', function() {
            const postContent = postForm.value.trim();
            if (postContent) {
                createNewPost(postContent);
                postForm.value = '';
            }
        });

        // Allow posting with Enter key (Shift+Enter for new line)
        postForm.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const postContent = this.value.trim();
                if (postContent) {
                    createNewPost(postContent);
                    this.value = '';
                }
            }
        });
    }

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Initially hide answers
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (!isOpen) {
                    answer.style.display = 'block';
                    item.classList.add('active');
                }
            });
        }
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('like-btn') && !this.classList.contains('action-btn')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });

    // Search functionality for trending topics
    const trendingLinks = document.querySelectorAll('.trending-list a');
    trendingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const hashtag = this.textContent;
            alert(`Searching for: ${hashtag}`);
            // In a real application, this would filter the feed
        });
    });

    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Function to create new posts
function createNewPost(content) {
    const feedPosts = document.querySelector('.feed-posts');
    if (!feedPosts) return;

    const newPost = document.createElement('article');
    newPost.className = 'post';
    newPost.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="post-info">
                <h4>You</h4>
                <span class="post-time">Just now</span>
            </div>
        </div>
        <div class="post-content">
            <p>${content}</p>
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn">
                <i class="far fa-heart"></i>
                <span>0</span>
            </button>
            <button class="action-btn comment-btn">
                <i class="far fa-comment"></i>
                <span>0</span>
            </button>
            <button class="action-btn share-btn">
                <i class="far fa-share-square"></i>
                <span>Share</span>
            </button>
        </div>
    `;

    // Add like functionality to the new post
    const likeBtn = newPost.querySelector('.like-btn');
    likeBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const countSpan = this.querySelector('span');
        
        if (this.classList.contains('liked')) {
            this.classList.remove('liked');
            icon.classList.remove('fas');
            icon.classList.add('far');
            const currentCount = parseInt(countSpan.textContent);
            countSpan.textContent = currentCount - 1;
        } else {
            this.classList.add('liked');
            icon.classList.remove('far');
            icon.classList.add('fas');
            const currentCount = parseInt(countSpan.textContent);
            countSpan.textContent = currentCount + 1;
        }
    });

    // Insert the new post at the top of the feed
    feedPosts.insertBefore(newPost, feedPosts.firstChild);

    // Add a subtle animation
    newPost.style.opacity = '0';
    newPost.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        newPost.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        newPost.style.opacity = '1';
        newPost.style.transform = 'translateY(0)';
    }, 10);
}

// Add some CSS for the scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top:hover {
        background: #1d4ed8 !important;
        transform: scale(1.1) !important;
    }
    
    .faq-item.active {
        background: #eff6ff !important;
        border-left-color: #2563eb !important;
    }
    
    .faq-item h3 {
        cursor: pointer;
        position: relative;
    }
    
    .faq-item h3::after {
        content: '+';
        position: absolute;
        right: 0;
        top: 0;
        font-size: 1.5rem;
        color: #2563eb;
        transition: transform 0.3s ease;
    }
    
    .faq-item.active h3::after {
        transform: rotate(45deg);
    }
`;
document.head.appendChild(style); 