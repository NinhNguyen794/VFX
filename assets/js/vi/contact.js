        // Load Header and Footer
        document.addEventListener('DOMContentLoaded', function() {
            // Load header component
        fetch('/vi/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
                // Add active class to news link
                    setTimeout(() => {
                        const newsLink = document.getElementById('Contact-link');
                        if (newsLink) {
                            newsLink.classList.add('active');
                        }
                    }, 100);
                });

            // Load Footer
            fetch('/vi/footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-container').innerHTML = data;
                });

            // Enhanced form interaction
            const formInputs = document.querySelectorAll('.form-control');
            
            formInputs.forEach(input => {
                // Focus effect for input fields
                input.addEventListener('focus', function() {
                    const icon = this.parentElement.querySelector('.icon');
                    if (icon) {
                        icon.style.color = '#f5b53f';
                    }
                });
                
                // Blur effect for input fields
                input.addEventListener('blur', function() {
                    const icon = this.parentElement.querySelector('.icon');
                    if (icon && this.value === '') {
                        icon.style.color = '#999';
                    }
                });
            });

            // Simple form submission handling
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Animation for button
                const button = this.querySelector('.submit-btn');
                button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Đang gửi...';
                button.disabled = true;
                
                // Simulate sending (would be replaced with actual AJAX in production)
                setTimeout(() => {
                    alert('Cảm ơn bạn đã gửi yêu cầu! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.');
                    this.reset();
                    button.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Gửi Yêu Cầu';
                    button.disabled = false;
                    
                    // Reset icons
                    document.querySelectorAll('.icon').forEach(icon => {
                        icon.style.color = '#999';
                    });
                }, 1500);
            });
        });

        // Add a custom script after iframe loads to ensure there's a visible marker
        document.addEventListener('DOMContentLoaded', function() {
                        // The standard Google Maps embed already has a pin marker by default
                        // This script is just to ensure users know about the importance of the location
                        const mapContainer = document.querySelector('.map-container');
                        const infoOverlay = document.createElement('div');
                        infoOverlay.innerHTML = '<div style="position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 10px; border-radius: 5px; border-left: 4px solid #f5b53f; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;"><strong>Trụ sở VFX:</strong> Tòa nhà VOV, số 7 Nguyễn Thị Minh Khai, Q.1, TP.HCM</div>';
                        mapContainer.style.position = 'relative';
                        mapContainer.appendChild(infoOverlay);
                    });
                    
function switchLanguage(lang) {
        const currentPath = window.location.pathname;

        // Tách path thành mảng
        const pathParts = currentPath.split('/').filter(p => p !== '');
        
        // Kiểm tra nếu đã có /vi hoặc /en
        if (pathParts[0] === 'vi' || pathParts[0] === 'en') {
            pathParts[0] = lang; // thay đổi ngôn ngữ
        } else {
            pathParts.unshift(lang); // thêm ngôn ngữ vào đầu
        }

        // Chuyển hướng sang URL mới
        const newPath = '/' + pathParts.join('/');
        window.location.href = newPath;
    }